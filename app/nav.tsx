'use client';

import Navbar from './navbar';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUser } from '../redux/slices/user';

export default function Nav() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (user.error || user.user === null) {
    return <></>;
  }

  return user.loading ? <div></div> : <Navbar user={user.user!} />;
}
