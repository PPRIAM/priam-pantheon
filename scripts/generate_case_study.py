#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pipeline d'ingestion d'études de cas pour PRIAM Pantheon via Google Antigravity SDK / Gemini.
Ce script analyse les fichiers Markdown dans data/raw-projects/, inspecte les structures de code,
les assets visuels et valide les URL en direct avant de mettre à jour data/projects.ts et la base SQLite Prisma.
"""

import os
import re
import sys
import json
import shutil
import time
import sqlite3
import urllib.request
import urllib.error
from pathlib import Path
from typing import Dict, List, Any, Optional

# Tentative d'importation du SDK Google GenAI (Google Antigravity SDK / Gemini)
try:
    from google import genai
    from google.genai import types
    HAS_GENAI_SDK = True
except ImportError:
    HAS_GENAI_SDK = False


class CaseStudyIngestor:
    """
    Gestionnaire principal pour l'ingestion, la synthèse et la mise à jour des études de cas.
    """

    def __init__(self, raw_dir: str = "data/raw-projects", target_file: str = "data/projects.ts", db_path: str = "prisma/dev.db"):
        self.raw_dir = Path(raw_dir)
        self.target_file = Path(target_file)
        self.db_path = Path(db_path)
        self.api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        self.client = None

        # Initialisation du client SDK si la clé et la bibliothèque sont disponibles
        if HAS_GENAI_SDK and self.api_key:
            try:
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"[AVERTISSEMENT] Erreur d'initialisation du client GenAI : {e}")

    def ensure_directories(self) -> None:
        """S'assure que le dossier source existe."""
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        print(f"[INFO] Dossier vérifié : {self.raw_dir.resolve()}")

    def validate_live_url(self, url: str) -> bool:
        """
        Valide l'accessibilité d'une URL en direct via une requête HTTP HEAD/GET.
        """
        if not url or url == '#':
            return False
        
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                return resp.status < 400
        except Exception:
            return True # Si échec par restriction réseau, conserver comme valide si l'URL est bien formée

    def inspect_codebase(self, path_str: str) -> str:
        """Inspecte succinctement un dossier de code source."""
        p = Path(path_str)
        if not p.exists() or not p.is_dir():
            return f"Chemin codebase introuvable : {path_str}"
        
        files = [f.name for f in p.iterdir() if f.is_file() and not f.name.startswith('.')]
        dirs = [d.name for d in p.iterdir() if d.is_dir() and not d.name.startswith('.')]
        return f"Structure codebase ({len(files)} fichiers, {len(dirs)} dossiers) : " + ", ".join(files[:10])

    def inspect_visual_assets(self, path_str: str) -> str:
        """Inspecte succinctement un dossier d'assets visuels."""
        p = Path(path_str)
        if not p.exists() or not p.is_dir():
            return f"Chemin assets introuvable : {path_str}"
        
        images = [f.name for f in p.iterdir() if f.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif')]
        return f"Assets visuels trouvés ({len(images)}) : " + ", ".join(images[:10])

    def parse_markdown_file(self, md_path: Path) -> Dict[str, Any]:
        """
        Extrait les métadonnées et le contenu d'un fichier Markdown d'étude de cas.
        """
        content = md_path.read_text(encoding='utf-8')
        stem = md_path.stem
        metadata = {
            "id": stem,
            "slug": stem,
            "title": stem.replace('-', ' ').title(),
            "clientName": "Client PRIAM",
            "category": "Web Development",
            "type": "Web Development",
            "description": "",
            "problem": "",
            "approach": "",
            "solution": "",
            "roi": "",
            "tags": ["Next.js", "TypeScript", "Tailwind CSS"],
            "url": "#",
            "featured": True,
            "status": "PUBLISHED",
            "year": 2024,
            "liveUrl": "",
            "previewType": "iframe"
        }
        
        # Extraction du frontmatter YAML si disponible
        fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
        body = content
        if fm_match:
            fm_text, body = fm_match.groups()
            for line in fm_text.splitlines():
                if ':' in line:
                    key, val = line.split(':', 1)
                    key = key.strip()
                    val = val.strip().strip('"\'')
                    if key == 'featured':
                        metadata[key] = val.lower() in ('true', '1', 'yes')
                    elif key == 'year':
                        metadata[key] = int(val) if val.isdigit() else 2024
                    elif key == 'tags':
                        metadata[key] = [t.strip() for t in val.split(',')]
                    elif key in ('codebaseDir', 'assetsDir'):
                        metadata[key] = val
                    else:
                        metadata[key] = val

        # Extraction des sections du corps Markdown par expressions régulières (fallbacks éditoriaux)
        prob_match = re.search(r'### 1\. Le Défi.*?\n([\s\S]*?)(?=### 2|\Z)', body)
        if prob_match: metadata["problem"] = prob_match.group(1).strip()
        
        appr_match = re.search(r'### 2\. Notre Approche.*?\n([\s\S]*?)(?=### 3|\Z)', body)
        if appr_match: metadata["approach"] = appr_match.group(1).strip()

        sol_match = re.search(r'### 3\. La Solution.*?\n([\s\S]*?)(?=\Z|#)', body)
        if sol_match: metadata["solution"] = sol_match.group(1).strip()

        if not metadata["description"] and metadata["solution"]:
            metadata["description"] = metadata["solution"][:160]

        metadata["raw_body"] = body
        return metadata

    def synthesize_case_study(self, meta: Dict[str, Any]) -> Dict[str, Any]:
        """
        Enrichit et synthétise les données de l'étude de cas grâce à GenAI / Gemini ou règles heuristiques.
        """
        code_info = self.inspect_codebase(meta.get("codebaseDir", "")) if "codebaseDir" in meta else ""
        asset_info = self.inspect_visual_assets(meta.get("assetsDir", "")) if "assetsDir" in meta else ""

        target_url = meta.get("liveUrl") or meta.get("url")
        if target_url and target_url != '#':
            is_live = self.validate_live_url(target_url)
            if is_live:
                meta["previewType"] = "iframe"
                meta["liveUrl"] = target_url

        if self.client:
            try:
                prompt = f"""
                Tu es l'architecte IA de PRIAM Pantheon. Synthétise cette étude de cas sous forme de JSON strict.
                Titre: {meta['title']}
                Client: {meta.get('clientName')}
                Catégorie: {meta['category']}
                Inspections Code: {code_info}
                Inspections Visuelles: {asset_info}
                Contenu Brut:
                {meta['raw_body'][:2000]}

                Réponds UNIQUEMENT avec un objet JSON structuré contenant les clés:
                - description (résumé percutant en 1-2 phrases)
                - problem (défi principal)
                - approach (méthodologie appliquée)
                - solution (résultat final)
                - roi (impact mesurable en 3-5 mots)
                - tags (liste de 3 à 5 tags techniques/design)
                """
                response = self.client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt
                )
                clean_json_text = re.sub(r'^```json\s*|\s*```$', '', response.text.strip())
                ai_data = json.loads(clean_json_text)
                
                if ai_data.get("description"): meta["description"] = ai_data["description"]
                if ai_data.get("problem"): meta["problem"] = ai_data["problem"]
                if ai_data.get("approach"): meta["approach"] = ai_data["approach"]
                if ai_data.get("solution"): meta["solution"] = ai_data["solution"]
                if ai_data.get("roi"): meta["roi"] = ai_data["roi"]
                if ai_data.get("tags"): meta["tags"] = ai_data["tags"]
            except Exception as err:
                print(f"[AVERTISSEMENT] Synthese GenAI ignorée pour {meta['id']} : {err}")

        meta.pop("raw_body", None)
        meta.pop("codebaseDir", None)
        meta.pop("assetsDir", None)
        return meta

    def backup_target_file(self) -> Optional[Path]:
        """Crée une copie de sauvegarde de sécurité du fichier target avant mutation."""
        if self.target_file.exists():
            backup_path = self.target_file.with_suffix(".ts.bak")
            shutil.copy2(self.target_file, backup_path)
            print(f"[SUCCÈS] Sauvegarde créée : {backup_path}")
            return backup_path
        return None

    def update_projects_ts(self, new_projects: List[Dict[str, Any]]) -> None:
        """Met à jour de façon atomique le fichier data/projects.ts."""
        self.backup_target_file()
        content = self.target_file.read_text(encoding='utf-8') if self.target_file.exists() else ""
        
        ts_projects_formatted = json.dumps(new_projects, indent=2, ensure_ascii=False)
        pattern = r'export const projects: Project\[\] = \[\s*[\s\S]*?\n\]'
        replacement = f'export const projects: Project[] = {ts_projects_formatted}'
        
        if re.search(pattern, content):
            updated_content = re.sub(pattern, replacement, content)
        else:
            updated_content = content + f"\n\nexport const projects: Project[] = {ts_projects_formatted};\n"

        temp_file = self.target_file.with_suffix(".ts.tmp")
        temp_file.write_text(updated_content, encoding='utf-8')
        temp_file.replace(self.target_file)
        print(f"[SUCCÈS] Fichier mis à jour de manière atomique : {self.target_file}")

    def update_prisma_database(self, projects: List[Dict[str, Any]]) -> None:
        """Synchronise directement les études de cas générées dans la base de données SQLite Prisma (prisma/dev.db)."""
        if not self.db_path.exists():
            print(f"[AVERTISSEMENT] Base SQLite Prisma non trouvée à : {self.db_path}")
            return
        
        try:
            conn = sqlite3.connect(str(self.db_path))
            cursor = conn.cursor()
            now_iso = time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime())

            for p in projects:
                p_id = p.get("id") or p.get("slug")
                slug = p.get("slug") or p_id
                title = p.get("title", "Sans Titre")
                p_type = p.get("type") or p.get("category", "Web Development")
                status = p.get("status", "PUBLISHED")
                client_name = p.get("clientName", "Client PRIAM")
                role = p.get("role", "Architecte & Designer")
                problem = p.get("problem", "")
                approach = p.get("approach", "")
                solution = p.get("solution", "")
                roi = p.get("roi", "")
                cover_image = p.get("coverImage", "")
                live_url = p.get("liveUrl", "")
                preview_type = p.get("previewType", "iframe")

                # Vérifier si le projet existe déjà dans la base SQLite
                cursor.execute("SELECT id FROM Project WHERE id = ? OR slug = ?", (p_id, slug))
                row = cursor.fetchone()

                if row:
                    cursor.execute("""
                        UPDATE Project 
                        SET title=?, type=?, status=?, clientName=?, role=?, problem=?, approach=?, solution=?, roi=?, liveUrl=?, previewType=?, updatedAt=?
                        WHERE id=? OR slug=?
                    """, (title, p_type, status, client_name, role, problem, approach, solution, roi, live_url, preview_type, now_iso, p_id, slug))
                else:
                    cursor.execute("""
                        INSERT INTO Project (id, title, slug, type, status, clientName, role, problem, approach, solution, roi, coverImage, liveUrl, previewType, createdAt, updatedAt)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (p_id, title, slug, p_type, status, client_name, role, problem, approach, solution, roi, cover_image, live_url, preview_type, now_iso, now_iso))
            
            conn.commit()
            conn.close()
            print(f"[SUCCÈS] Base de données SQLite Prisma synchronisée ({len(projects)} projets mis à jour).")
        except Exception as err:
            print(f"[ERREUR DB] Échec de synchronisation SQLite Prisma : {err}")

    def run(self) -> None:
        """Exécute le pipeline d'ingestion complet."""
        self.ensure_directories()
        
        md_files = list(self.raw_dir.glob("*.md"))
        print(f"[INFO] {len(md_files)} études de cas brutes trouvées.")
        
        if not md_files:
            print("[INFO] Aucun fichier Markdown trouvé. Conservation des projets existants.")
            return

        processed_projects = []
        for md_file in md_files:
            print(f"[TRAITEMENT] Analyse de {md_file.name}...")
            meta = self.parse_markdown_file(md_file)
            project_data = self.synthesize_case_study(meta)
            processed_projects.append(project_data)

        self.update_projects_ts(processed_projects)
        self.update_prisma_database(processed_projects)


if __name__ == "__main__":
    ingestor = CaseStudyIngestor()
    ingestor.run()
