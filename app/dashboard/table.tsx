'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { UserAnalytics } from '../../types/user-analytics.type';
import CustomDialog from '../../components/ui/dialog';
import { useState } from 'react';
import { createClientClient } from '../../lib/supabase-client';

export default function UsersTable({ users }: { users: UserAnalytics[] }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const supabase = createClientClient();

  function openDetailsModal() {
    setIsDetailsModalOpen(true);
  }

  function closeDetailsModal() {
    setIsDetailsModalOpen(false);
  }

  function fetchUserDetails() {}

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Last active</TableHeaderCell>
            <TableHeaderCell>Device</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email} onClick={openDetailsModal} role="button">
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Text>{user.location}</Text>
              </TableCell>
              <TableCell>
                <Text>{new Date(user.last_used_at).toDateString()}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.last_used_user_agent}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomDialog
        title={`User Details`}
        isOpen={isDetailsModalOpen}
        closeDialog={closeDetailsModal}
      ></CustomDialog>
    </>
  );
}
