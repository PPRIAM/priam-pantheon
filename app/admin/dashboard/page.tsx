// Redirection de courtoisie pour /admin/dashboard vers /admin/projects
import { redirect } from 'next/navigation'

export default function AdminDashboardRedirect() {
  redirect('/admin/projects')
}
