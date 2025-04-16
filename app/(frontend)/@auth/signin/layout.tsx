import '../../globals.css';

export const metadata = {
  title: 'Sign In',
  description: 'Log in to the dashboard',
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
