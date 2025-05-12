// app/@auth/signin/layout.tsx OR app/(auth)/signin/layout.tsx

import '@/app/(frontend)/globals.css';

export const metadata = {
  title: 'Sign In',
  description: 'Log in to the dashboard',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
