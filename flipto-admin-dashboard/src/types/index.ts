export interface User {
  id: string
  username: string
  email: string
  fullName: string
  status: 'active' | 'suspended' | 'pending' | 'blocked'
  kycStatus: 'verified' | 'pending' | 'rejected' | 'not_submitted'
  balance: number
  totalDeposits: number
  totalWithdrawals: number
  registrationDate: Date
  lastLogin: Date
  country: string
  isVip: boolean
}

export interface Game {
  id: string
  name: string
  category: 'slots' | 'table' | 'live' | 'sports' | 'lottery'
  provider: string
  status: 'active' | 'inactive' | 'maintenance'
  rtp: number
  volatility: 'low' | 'medium' | 'high'
  minBet: number
  maxBet: number
  totalPlays: number
  totalRevenue: number
  lastUpdated: Date
}

export interface Transaction {
  id: string
  userId: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus'
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  method: string
  timestamp: Date
  description: string
}

export interface AnalyticsData {
  totalRevenue: number
  totalUsers: number
  activeUsers: number
  totalGames: number
  totalTransactions: number
  revenueChange: number
  userChange: number
  gameChange: number
  transactionChange: number
}

export interface SecurityAlert {
  id: string
  type: 'fraud' | 'suspicious_activity' | 'multiple_accounts' | 'chargeback'
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId: string
  description: string
  timestamp: Date
  status: 'open' | 'investigating' | 'resolved' | 'false_positive'
}

export interface BettingHistory {
  id: string
  username: string
  gameName: string
  gameType: 'Slots' | 'Table' | 'Live'
  gameProvider: string
  betAmount: number
  payout: number
  outcome: 'win' | 'loss' | 'tie'
  timestamp: string
  balanceBefore: number
  balanceAfter: number
}

export interface RevenueChartData {
  name: string
  revenue: number
}

export interface RecentActivity {
  id: string
  user: string
  action: string
  details: string
  timestamp: string
}

export interface TopGame {
  name: string
  revenue: number
  players: number
}

export interface WithdrawHistory {
  id: string
  username:string
  amount: number
  method: 'Bank Transfer' | 'PayPal' | 'Bitcoin' | 'Ethereum'
  status: 'pending' | 'approved' | 'rejected'
  timestamp: string
  transactionId: string
  processedAt?: string
}

export type DashboardState = {
  analytics: AnalyticsData
  bettingHistory: BettingHistory[]
  withdrawHistory: WithdrawHistory[]
  isSidebarCollapsed: boolean
}

export type DashboardActions = {
  setAnalytics: (data: AnalyticsData) => void
  setRevenueChartData: (data: RevenueChartData) => void
  setRecentActivity: (activity: RecentActivity[]) => void
  setSecurityAlerts: (alerts: SecurityAlert[]) => void
  setTopGames: (games: TopGame[]) => void
  setBettingHistory: (history: BettingHistory[]) => void
  setWithdrawHistory: (history: WithdrawHistory[]) => void
  toggleSidebar: () => void
}

export type DashboardStore = DashboardState & DashboardActions 