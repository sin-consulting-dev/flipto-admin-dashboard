import { useDashboardStore } from '@/store'
import { formatCurrency, formatNumber } from '@/lib/utils'

export function TopGames() {
  const { games } = useDashboardStore()
  const topGames = games
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Games</h3>
      <div className="space-y-4">
        {topGames.map((game) => (
          <div key={game.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {game.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{game.name}</p>
                <p className="text-xs text-gray-500">{game.provider}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(game.totalRevenue)}
              </p>
              <p className="text-xs text-gray-500">
                {formatNumber(game.totalPlays)} plays
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 