import { Card, Text } from '@tremor/react';
import { createClientClient } from '../../lib/supabase-client';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const supabase = createClientClient();

  return (
    <Card className="max-w-xs mx-auto my-auto bg-blue-100 flex flex-col items-center justify-center gap-3">
      <Text className="text-center">Buzzli Admin Dashboard</Text>
      <Link href="/auth/google">
        <Image
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google"
          width={48}
          height={48}
        />
      </Link>
    </Card>
  );
}
