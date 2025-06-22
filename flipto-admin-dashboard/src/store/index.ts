import { create } from 'zustand'
import { User, Game, Transaction, SecurityAlert, BettingHistory, WithdrawHistory } from '@/types'
import { 
  mockUsers, 
  mockGames, 
  mockTransactions, 
  mockSecurityAlerts, 
  mockBettingHistory, 
  mockWithdrawHistory 
} from '@/data/mockData'

interface DashboardStore {
  users: User[]
  games: Game[]
  transactions: Transaction[]
  securityAlerts: SecurityAlert[]
  bettingHistory: BettingHistory[]
  withdrawHistory: WithdrawHistory[]
  isLoading: boolean
  isSidebarCollapsed: boolean
  setUsers: (users: User[]) => void
  setGames: (games: Game[]) => void
  setTransactions: (transactions: Transaction[]) => void
  setSecurityAlerts: (alerts: SecurityAlert[]) => void
  setBettingHistory: (history: BettingHistory[]) => void
  setWithdrawHistory: (history: WithdrawHistory[]) => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  addUser: (user: User) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  users: mockUsers,
  games: mockGames,
  transactions: mockTransactions,
  securityAlerts: mockSecurityAlerts,
  bettingHistory: mockBettingHistory,
  withdrawHistory: mockWithdrawHistory,
  isLoading: false,
  isSidebarCollapsed: false,
  setUsers: (users) => set({ users }),
  setGames: (games) => set({ games }),
  setTransactions: (transactions) => set({ transactions }),
  setSecurityAlerts: (alerts) => set({ securityAlerts: alerts }),
  setBettingHistory: (history) => set({ bettingHistory: history }),
  setWithdrawHistory: (history: WithdrawHistory[]) => set({ withdrawHistory: history }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
}))