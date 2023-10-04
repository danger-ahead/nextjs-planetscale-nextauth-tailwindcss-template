import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const { data, error } = await supabase.rpc('is_superadmin', {
    user_id_param: session.user.id
  });

  if (error) {
    return NextResponse.redirect(new URL('/auth', req.url));
  } else if (!data) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard']
};
