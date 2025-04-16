import '../(frontend)/globals.css'

export const metadata = {
  title: 'Dashboard',
  description: 'User/Admin Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
