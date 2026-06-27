import React from 'react'
import Image from 'next/image'

// Interface pour les propriétés du composant Logo
interface LogoProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

export default function Logo({ className = '', size = 32, style }: LogoProps) {
  // Détermination de la largeur et de la hauteur en conservant le ratio d'aspect original (~1.3958)
  const width = size
  const height = Math.round(size * 0.72)

  return (
    <div 
      className={`relative inline-block ${className}`} 
      style={{ ...style, width, height }}
    >
      <Image
        src="/logo-lime-v3.png"
        alt="PRIAM Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </div>
  )
}

