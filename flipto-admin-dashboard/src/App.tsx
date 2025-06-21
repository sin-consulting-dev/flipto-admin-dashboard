import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Loader } from '@/components/ui/Loader'

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Users = lazy(() => import('@/pages/Users'));
const Games = lazy(() => import('@/pages/Games'));
const Financial = lazy(() => import('@/pages/Financial'));
const Security = lazy(() => import('@/pages/Security'));
const Settings = lazy(() => import('@/pages/Settings'));
const UserBettingHistory = lazy(() => import('@/pages/UserBettingHistory'));
const UserWithdrawHistory = lazy(() => import('@/pages/UserWithdrawHistory'));
const PlayerManagement = lazy(() => import('@/pages/PlayerManagement'));
const WebsiteStatusMonitoring = lazy(() => import('@/pages/WebsiteStatusMonitoring'));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="user-betting-history" element={<UserBettingHistory />} />
          <Route path="user-withdraw-history" element={<UserWithdrawHistory />} />
          <Route path="player-management" element={<PlayerManagement />} />
          <Route path="games" element={<Games />} />
          <Route path="website-status-monitoring" element={<WebsiteStatusMonitoring />} />
          <Route path="financial" element={<Financial />} />
          <Route path="security" element={<Security />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App 