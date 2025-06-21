import { TrendingUp, TrendingDown, Users, DollarSign, Gamepad2, CreditCard } from 'lucide-react'
import { AnalyticsData } from '@/types'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface AnalyticsOverviewProps {
  data: AnalyticsData
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  const metrics = [
    {
      name: 'Total Revenue',
      value: formatCurrency(data.totalRevenue),
      change: data.revenueChange,
      icon: DollarSign,
      comparison: 'vs. last month',
    },
    {
      name: 'Total Users',
      value: formatNumber(data.totalUsers),
      change: data.userChange,
      icon: Users,
      comparison: 'vs. last month',
    },
    {
      name: 'Active Users',
      value: formatNumber(data.activeUsers),
      change: 0,
      icon: Users,
      comparison: 'in the last 24 hours',
    },
    {
      name: 'Total Games',
      value: formatNumber(data.totalGames),
      change: data.gameChange,
      icon: Gamepad2,
      comparison: 'new this month',
    },
    {
      name: 'Total Transactions',
      value: formatNumber(data.totalTransactions),
      change: data.transactionChange,
      icon: CreditCard,
      comparison: 'vs. last month',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex items-center">
          <div className="flex-shrink-0">
            <metric.icon className="h-8 w-8 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
            <div className="mt-1">
              {metric.change !== 0 && (
                <div
                  className={`flex items-baseline text-sm font-semibold ${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.change > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="ml-1">{Math.abs(metric.change).toFixed(2)}%</span>
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {metric.comparison}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 