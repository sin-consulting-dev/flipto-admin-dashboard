import { useState } from 'react'
import { formatDateTime } from '@/lib/utils'
import { CheckCircle, XCircle, AlertTriangle, Clock, Activity, Server, Globe, Database, Shield } from 'lucide-react'

interface SystemStatus {
  id: string
  name: string
  type: 'website' | 'api' | 'database' | 'payment' | 'game_server'
  status: 'operational' | 'degraded' | 'down' | 'maintenance'
  uptime: number
  responseTime: number
  lastCheck: Date
  description: string
}

interface Incident {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  description: string
  startTime: Date
  endTime?: Date
  affectedServices: string[]
}

const mockSystemStatus: SystemStatus[] = [
  {
    id: '1',
    name: 'Main Website',
    type: 'website',
    status: 'operational',
    uptime: 99.98,
    responseTime: 245,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Primary gambling platform website',
  },
  {
    id: '2',
    name: 'API Gateway',
    type: 'api',
    status: 'operational',
    uptime: 99.95,
    responseTime: 180,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'REST API endpoints for mobile and web clients',
  },
  {
    id: '3',
    name: 'User Database',
    type: 'database',
    status: 'operational',
    uptime: 99.99,
    responseTime: 45,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Primary user data and account management',
  },
  {
    id: '4',
    name: 'Payment Processing',
    type: 'payment',
    status: 'degraded',
    uptime: 98.5,
    responseTime: 1200,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Credit card and crypto payment processing',
  },
  {
    id: '5',
    name: 'Game Server 1',
    type: 'game_server',
    status: 'operational',
    uptime: 99.92,
    responseTime: 320,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Slot games and table games server',
  },
  {
    id: '6',
    name: 'Game Server 2',
    type: 'game_server',
    status: 'maintenance',
    uptime: 99.85,
    responseTime: 0,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Live casino and sports betting server',
  },
  {
    id: '7',
    name: 'CDN Network',
    type: 'website',
    status: 'operational',
    uptime: 99.97,
    responseTime: 85,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Content delivery network for static assets',
  },
  {
    id: '8',
    name: 'Security Services',
    type: 'api',
    status: 'operational',
    uptime: 99.99,
    responseTime: 95,
    lastCheck: new Date('2024-01-20T17:30:00'),
    description: 'Authentication and fraud detection services',
  },
]

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Payment Processing Delays',
    severity: 'medium',
    status: 'investigating',
    description: 'Users experiencing delays in payment processing. Response times increased by 300%.',
    startTime: new Date('2024-01-20T15:30:00'),
    affectedServices: ['Payment Processing'],
  },
  {
    id: '2',
    title: 'Game Server 2 Maintenance',
    severity: 'low',
    status: 'monitoring',
    description: 'Scheduled maintenance for Game Server 2. Live casino games temporarily unavailable.',
    startTime: new Date('2024-01-20T14:00:00'),
    endTime: new Date('2024-01-20T18:00:00'),
    affectedServices: ['Game Server 2'],
  },
  {
    id: '3',
    title: 'API Gateway Performance Issues',
    severity: 'high',
    status: 'resolved',
    description: 'API Gateway experiencing intermittent timeouts. Issue resolved after 45 minutes.',
    startTime: new Date('2024-01-19T10:15:00'),
    endTime: new Date('2024-01-19T11:00:00'),
    affectedServices: ['API Gateway', 'Main Website'],
  },
]

export default function WebsiteStatusMonitoring() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'down':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'maintenance':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      case 'down':
        return 'text-red-600 bg-red-100'
      case 'maintenance':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="w-4 h-4" />
      case 'api':
        return <Activity className="w-4 h-4" />
      case 'database':
        return <Database className="w-4 h-4" />
      case 'payment':
        return <Shield className="w-4 h-4" />
      case 'game_server':
        return <Server className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const overallStatus = mockSystemStatus.every(s => s.status === 'operational') 
    ? 'operational' 
    : mockSystemStatus.some(s => s.status === 'down') 
    ? 'down' 
    : 'degraded'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Website Status Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor system health, uptime, and performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Refresh Status
          </button>
        </div>
      </div>

      {/* Overall Status */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getStatusIcon(overallStatus)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                All Systems {overallStatus === 'operational' ? 'Operational' : overallStatus === 'down' ? 'Down' : 'Degraded'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Last updated: {formatDateTime(new Date())}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mockSystemStatus.filter(s => s.status === 'operational').length}/{mockSystemStatus.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Systems Operational</div>
          </div>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSystemStatus.map((system) => (
          <div key={system.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {getTypeIcon(system.type)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{system.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{system.description}</p>
                </div>
              </div>
              {getStatusIcon(system.status)}
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                  {system.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Uptime:</span>
                <span className="text-gray-900 dark:text-gray-100">{system.uptime}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Response Time:</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {system.responseTime > 0 ? `${system.responseTime}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Check:</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {formatDateTime(system.lastCheck)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Incidents */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Incidents</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockIncidents.map((incident) => (
            <div key={incident.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{incident.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>Started: {formatDateTime(incident.startTime)}</span>
                    {incident.endTime && (
                      <span>Resolved: {formatDateTime(incident.endTime)}</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Affected Services: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {incident.affectedServices.map((service) => (
                        <span key={service} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Response Time</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {Math.round(mockSystemStatus.reduce((acc, s) => acc + s.responseTime, 0) / mockSystemStatus.filter(s => s.responseTime > 0).length)}ms
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Uptime</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {Math.round(mockSystemStatus.reduce((acc, s) => acc + s.uptime, 0) / mockSystemStatus.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Incidents</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {mockIncidents.filter(i => i.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 