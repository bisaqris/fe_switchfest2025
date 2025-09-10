import Head from 'next/head';
import DemographicCard from '@/components/ecommerce/DemographicCard';
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics';
import MonthlySalesChart from '@/components/ecommerce/MonthlySalesChart';
import MonthlyTarget from '@/components/ecommerce/MonthlyTarget';
import RecentOrders from '@/components/ecommerce/RecentOrders';
import StatisticsChart from '@/components/ecommerce/StatisticsChart';

export default function AdminDashboardPage() {
  return (
    <>
      <Head>
        <title>
          Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template
        </title>
        <meta
          name="description"
          content="This is Next.js Home for TailAdmin Dashboard Template"
        />
      </Head>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
        <div className="col-span-12">
          <StatisticsChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}