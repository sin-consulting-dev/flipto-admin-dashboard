import { useDashboardStore } from '@/store'
import { formatDateTime } from '@/lib/utils'
import { AlertTriangle, Shield, Eye, AlertCircle } from 'lucide-react'

export function SecurityAlerts() {
  const { securityAlerts } = useDashboardStore()
  const recentAlerts = securityAlerts
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'high':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      case 'medium':
        return <Shield className="w-4 h-4 text-yellow-600" />
      case 'low':
        return <Eye className="w-4 h-4 text-blue-600" />
      default:
        return <Eye className="w-4 h-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-200 bg-red-50'
      case 'high':
        return 'border-orange-200 bg-orange-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Security Alerts</h3>
      <div className="space-y-4">
        {recentAlerts.map((alert) => (
          <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start space-x-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDateTime(alert.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 