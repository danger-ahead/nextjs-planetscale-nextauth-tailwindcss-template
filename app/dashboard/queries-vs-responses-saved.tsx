'use client';

import { AreaChart } from '@tremor/react';
import { createClientClient } from '../../lib/supabase-client';
import { useEffect, useState } from 'react';

export default function QueriesVsResponsesSaved() {
  const [data, setData] = useState<
    | {
        Month: string;
        Queries: number;
        'Responses Saved': number;
      }[]
    | null
  >(null);
  const supabase = createClientClient();

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_response_and_query_counts');

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      // Process the data to the desired format
      const processedData = [
        {
          Month: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 2
          ).toLocaleString('default', { month: 'long' }),
          Queries: data.month_before_previous_month.query_count,
          'Responses Saved': data.month_before_previous_month.response_count
        },
        {
          Month: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1
          ).toLocaleString('default', { month: 'long' }),
          Queries: data.previous_month.query_count,
          'Responses Saved': data.previous_month.response_count
        },
        {
          Month: new Date().toLocaleString('default', { month: 'long' }),
          Queries: data.current_month.query_count,
          'Responses Saved': data.current_month.response_count
        }
      ];
      setData(processedData);
    }
    if (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return null;
  }

  return (
    <AreaChart
      className="mt-4 h-80"
      data={data as any[]}
      categories={['Queries', 'Responses Saved']}
      index="Month"
      colors={['indigo', 'fuchsia']}
      yAxisWidth={60}
    />
  );
}
