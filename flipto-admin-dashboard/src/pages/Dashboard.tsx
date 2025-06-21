import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { TopGames } from '@/components/dashboard/TopGames'
import { SecurityAlerts } from '@/components/dashboard/SecurityAlerts'
import RevenueChart from '@/components/dashboard/RevenueChart'
import { mockAnalyticsData } from '@/data/mockData'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your gambling platform admin dashboard</p>
      </div>

      <AnalyticsOverview data={mockAnalyticsData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TopGames />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <SecurityAlerts />
      </div>
    </div>
  )
} 