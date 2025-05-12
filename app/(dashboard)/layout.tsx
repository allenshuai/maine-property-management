import '../(frontend)/globals.css';
import Header from '../(frontend)/components/Header';
import { AuthProvider } from '../context/SupabaseProvider'; // ✅ add this

export const metadata = {
  title: 'Dashboard',
  description: 'User/Admin Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* ✅ wrap dashboard layout too */}
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
