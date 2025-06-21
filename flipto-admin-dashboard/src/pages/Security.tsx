import { useState } from 'react'
import { useDashboardStore } from '@/store'
import { formatDateTime } from '@/lib/utils'
import { AlertTriangle, Shield, Eye, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function Security() {
  const { securityAlerts } = useDashboardStore()
  const [severityFilter, setSeverityFilter] = useState('all')

  const filteredAlerts = securityAlerts.filter(alert => 
    severityFilter === 'all' || alert.severity === severityFilter
  )

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case 'medium':
        return <Shield className="w-5 h-5 text-yellow-600" />
      case 'low':
        return <Eye className="w-5 h-5 text-blue-600" />
      default:
        return <Eye className="w-5 h-5 text-gray-600" />
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'investigating':
        return <Eye className="w-4 h-4 text-blue-600" />
      case 'false_positive':
        return <XCircle className="w-4 h-4 text-gray-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="text-gray-600">Monitor security alerts and compliance issues</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Critical Alerts</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {securityAlerts.filter(a => a.severity === 'critical').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">High Priority</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {securityAlerts.filter(a => a.severity === 'high').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Medium Priority</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {securityAlerts.filter(a => a.severity === 'medium').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Resolved</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {securityAlerts.filter(a => a.status === 'resolved').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-6 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start space-x-4">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {alert.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                        {alert.severity}
                      </span>
                      {getStatusIcon(alert.status)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500">
                      User ID: {alert.userId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(alert.timestamp)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Investigate
                    </button>
                    <button className="text-sm text-green-600 hover:text-green-800">
                      Resolve
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 