import { Providers } from '../../redux/provider';

import Nav from '../nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'Admin | Buzzli',
  description: ''
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Suspense>
        <Providers>
          <Nav />
        </Providers>
      </Suspense>
      {children}
    </main>
  );
}
