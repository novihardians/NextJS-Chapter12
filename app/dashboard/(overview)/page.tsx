// Adding materi 9 to remove Card // to add CardWrapper
// import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from '@/app/ui/dashboard/cards';

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

// Adding materi 9 to remove fetchRevenue, fetchLatestInvoices, fetchCardData // Adding materi 9 to add Suspense
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // Materi adding 7

import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons'; // Adding materi 9

export const dynamic = "force-dynamic"; // Materi adding 7.5 (Special) // for updating data works !!

export default async function Page() {
  
  // const revenue = await fetchRevenue(); // Adding materi 9 to remove fetchRevenue
  // const latestInvoices = await fetchLatestInvoices(); // Adding materi 9 to remove fetchRevenue
  // const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* // Adding materi 9 to remove Card tag/component to add Suspense //
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
        */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

        {/* Adding materi 9 to remove fetchRevenue */}
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* Add this code */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}