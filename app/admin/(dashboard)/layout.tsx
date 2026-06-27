// Layout administrateur — wrapper avec la barre latérale
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SideNav from '@/components/admin/SideNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505' }}>
      <SideNav />
      <main style={{ flex: 1, marginLeft: '240px', padding: '2rem', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
