import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import UsersTable from './table';
import { UserAnalytics } from '../../types/user-analytics.type';
import QueriesVsResponsesSaved from './queries-vs-responses-saved';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  const users = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/analytics/fetch-user-analytics`
  );

  const usersJson: UserAnalytics[] = await users.json();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>List of users</Text>
      <Search />
      <Card className="my-6">
        <UsersTable users={usersJson} />
      </Card>
      <hr className="bg-gray-200 mb-4" />
      <Title>Last 3 months statistics</Title>
      <Text>Comparison between Queries And Responses Saved</Text>
      <Card className="my-6">
        <QueriesVsResponsesSaved />
      </Card>
    </main>
  );
}
