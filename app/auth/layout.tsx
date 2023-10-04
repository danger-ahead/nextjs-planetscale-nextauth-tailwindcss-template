import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Buzzli',
  description: ''
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex justify-center items-center">{children}</main>
  );
}
