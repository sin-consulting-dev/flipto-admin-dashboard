import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Header } from './Header'
import { useDashboardStore } from '@/store'
import {
  mockUsers,
  mockGames,
  mockTransactions,
  mockSecurityAlerts,
  mockBettingHistory,
  mockWithdrawHistory,
} from '@/data/mockData'

export default function DashboardLayout() {
  const {
    setUsers,
    setGames,
    setTransactions,
    setSecurityAlerts,
    setBettingHistory,
    setWithdrawHistory,
    isSidebarCollapsed,
  } = useDashboardStore()

  useEffect(() => {
    setUsers(mockUsers)
    setGames(mockGames)
    setTransactions(mockTransactions)
    setSecurityAlerts(mockSecurityAlerts)
    setBettingHistory(mockBettingHistory)
    setWithdrawHistory(mockWithdrawHistory)
  }, [setUsers, setGames, setTransactions, setSecurityAlerts, setBettingHistory, setWithdrawHistory])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 