import { useState, useMemo } from 'react'
import { useDashboardStore } from '@/store'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Activity, Crown, AlertTriangle } from 'lucide-react'

interface PlayerStats {
  id: string
  username: string
  fullName: string
  email: string
  status: 'active' | 'suspended' | 'blocked' | 'pending'
  vipLevel: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum'
  totalBets: number
  totalWins: number
  totalLosses: number
  winRate: number
  averageBet: number
  lastActivity: Date
  registrationDate: Date
  totalDeposits: number
  totalWithdrawals: number
  currentBalance: number
  riskLevel: 'low' | 'medium' | 'high'
}

const mockPlayerStats: PlayerStats[] = [
  {
    id: '1',
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    status: 'active',
    vipLevel: 'gold',
    totalBets: 1250,
    totalWins: 680,
    totalLosses: 570,
    winRate: 54.4,
    averageBet: 45.20,
    lastActivity: new Date('2024-01-20T15:30:00'),
    registrationDate: new Date('2023-01-15'),
    totalDeposits: 5000,
    totalWithdrawals: 2750,
    currentBalance: 1250.50,
    riskLevel: 'low',
  },
  {
    id: '2',
    username: 'sarah_jones',
    fullName: 'Sarah Jones',
    email: 'sarah.jones@email.com',
    status: 'active',
    vipLevel: 'platinum',
    totalBets: 2340,
    totalWins: 1420,
    totalLosses: 920,
    winRate: 60.7,
    averageBet: 78.50,
    lastActivity: new Date('2024-01-20T16:20:00'),
    registrationDate: new Date('2023-02-08'),
    totalDeposits: 8000,
    totalWithdrawals: 5200,
    currentBalance: 2100.75,
    riskLevel: 'medium',
  },
  {
    id: '3',
    username: 'mike_wilson',
    fullName: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    status: 'suspended',
    vipLevel: 'none',
    totalBets: 450,
    totalWins: 180,
    totalLosses: 270,
    winRate: 40.0,
    averageBet: 120.30,
    lastActivity: new Date('2024-01-18T09:45:00'),
    registrationDate: new Date('2023-06-10'),
    totalDeposits: 1500,
    totalWithdrawals: 1200,
    currentBalance: 0,
    riskLevel: 'high',
  },
  {
    id: '4',
    username: 'anna_kim',
    fullName: 'Anna Kim',
    email: 'anna.kim@email.com',
    status: 'active',
    vipLevel: 'platinum',
    totalBets: 1890,
    totalWins: 1150,
    totalLosses: 740,
    winRate: 60.8,
    averageBet: 95.20,
    lastActivity: new Date('2024-01-20T17:15:00'),
    registrationDate: new Date('2023-01-05'),
    totalDeposits: 12000,
    totalWithdrawals: 7800,
    currentBalance: 3200.80,
    riskLevel: 'low',
  },
  {
    id: '5',
    username: 'alex_garcia',
    fullName: 'Alex Garcia',
    email: 'alex.garcia@email.com',
    status: 'active',
    vipLevel: 'silver',
    totalBets: 890,
    totalWins: 420,
    totalLosses: 470,
    winRate: 47.2,
    averageBet: 35.80,
    lastActivity: new Date('2024-01-20T12:45:00'),
    registrationDate: new Date('2023-07-25'),
    totalDeposits: 4200,
    totalWithdrawals: 3200,
    currentBalance: 675.30,
    riskLevel: 'medium',
  },
]

export default function PlayerManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [vipFilter, setVipFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  const filteredPlayers = useMemo(() => {
    return mockPlayerStats.filter(player => {
      const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || player.status === statusFilter
      const matchesVip = vipFilter === 'all' || player.vipLevel === vipFilter
      const matchesRisk = riskFilter === 'all' || player.riskLevel === riskFilter
      return matchesSearch && matchesStatus && matchesVip && matchesRisk
    })
  }, [searchTerm, statusFilter, vipFilter, riskFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'suspended':
        return 'text-yellow-600 bg-yellow-100'
      case 'blocked':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getVipColor = (vipLevel: string) => {
    switch (vipLevel) {
      case 'platinum':
        return 'text-purple-600 bg-purple-100'
      case 'gold':
        return 'text-yellow-600 bg-yellow-100'
      case 'silver':
        return 'text-gray-600 bg-gray-100'
      case 'bronze':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-400 bg-gray-50'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'high':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Player Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor player activity, manage accounts, and track performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Player
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="blocked">Blocked</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={vipFilter}
                onChange={(e) => setVipFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
              >
                <option value="all">All VIP Levels</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
                <option value="none">None</option>
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  VIP Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">
                          {player.fullName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{player.fullName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{player.email}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">@{player.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVipColor(player.vipLevel)}`}>
                      {player.vipLevel !== 'none' && <Crown className="w-3 h-3 mr-1" />}
                      {player.vipLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-1 text-green-600" />
                        {player.winRate.toFixed(1)}% win rate
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {player.totalBets} bets • ${player.averageBet.toFixed(2)} avg
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {formatCurrency(player.currentBalance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(player.riskLevel)}`}>
                      {player.riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {player.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDateTime(player.lastActivity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 