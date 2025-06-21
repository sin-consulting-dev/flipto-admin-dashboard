import { NavLink } from 'react-router-dom'
import { 
  Home,
  Users, 
  Gamepad2, 
  History,
  TrendingUp,
  BarChart3,
  Monitor,
  UserCheck,
  CreditCard,
  ChevronLeft,
} from 'lucide-react'
import { useDashboardStore } from '@/store';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'User Betting History', href: '/user-betting-history', icon: History },
  { name: 'User Withdraw History', href: '/user-withdraw-history', icon: CreditCard },
  { name: 'Player Management', href: '/player-management', icon: UserCheck },
  { name: 'Game Management', href: '/games', icon: Gamepad2 },
  { name: 'Website Status Monitoring', href: '/website-status-monitoring', icon: Monitor },
  { name: 'User Management', href: '/users', icon: Users },
]

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}`}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center`}>
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && <span className="text-xl font-bold text-gray-900 dark:text-white">Flipto Admin</span>}
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                        } ${isSidebarCollapsed ? 'justify-center' : ''}`
                      }
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {!isSidebarCollapsed && <span>{item.name}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto -mx-6">
              <button onClick={toggleSidebar} className="flex items-center justify-center w-full py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <ChevronLeft className={`w-6 h-6 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
} 