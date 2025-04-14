import '../(frontend)/globals.css'; // ✅ Correct relative path

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin area for managing content',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
