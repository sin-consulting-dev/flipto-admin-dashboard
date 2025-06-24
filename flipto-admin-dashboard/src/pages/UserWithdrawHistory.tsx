import { useState, useMemo } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { useDashboardStore } from '@/store'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { Eye, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react'

const multiSelectStyles = (isDark: boolean) => ({
  control: (styles: any) => ({
    ...styles,
    backgroundColor: isDark ? '#374151' : 'white',
    borderColor: isDark ? '#4b5563' : '#d1d5db',
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: isDark ? '#374151' : 'white',
  }),
  option: (styles: any, { isFocused }: any) => ({
    ...styles,
    backgroundColor: isFocused ? (isDark ? '#4b5563' : '#e5e7eb') : 'transparent',
    color: isDark ? 'white' : 'black',
  }),
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: isDark ? '#4b5563' : '#e5e7eb',
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: isDark ? 'white' : 'black',
  }),
})

export default function UserWithdrawHistory() {
  const { withdrawHistory } = useDashboardStore()
  const [isDark] = useState(document.documentElement.classList.contains('dark'))

  const [usernameFilter, setUsernameFilter] = useState('')
  const [transactionIdFilter, setTransactionIdFilter] = useState('')
  const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null])
  const [statusFilter, setStatusFilter] = useState<any>([])
  const [methodFilter, setMethodFilter] = useState<any>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const methods = useMemo(
    () =>
      [...new Set(withdrawHistory.map((item) => item.method))].map((m) => ({
        value: m,
        label: m,
      })),
    [withdrawHistory],
  )
  
  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  const filteredHistory = useMemo(() => {
    setCurrentPage(1)
    return withdrawHistory.filter((item) => {
      const [startDate, endDate] = dateRange
      const itemDate = new Date(item.timestamp)

      const matchesTransactionId =
        transactionIdFilter === '' ||
        item.transactionId.toLowerCase().includes(transactionIdFilter.toLowerCase())
      const matchesUsername =
        usernameFilter === '' || item.username.toLowerCase().includes(usernameFilter.toLowerCase())
      const matchesDate =
        !startDate || !endDate || (itemDate >= startDate && itemDate <= endDate)
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.some((s: any) => s.value === item.status)
      const matchesMethod =
        methodFilter.length === 0 || methodFilter.some((m: any) => m.value === item.method)

      return (
        matchesTransactionId &&
        matchesUsername &&
        matchesDate &&
        matchesStatus &&
        matchesMethod
      )
    })
  }, [
    withdrawHistory,
    transactionIdFilter,
    usernameFilter,
    dateRange,
    statusFilter,
    methodFilter,
  ])

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const currentItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const getStatusPill = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1.5" />
            Rejected
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1.5" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Withdraw History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage all user withdrawal requests.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Transaction ID..."
              value={transactionIdFilter}
              onChange={(e) => setTransactionIdFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
            />
            <input
              type="text"
              placeholder="Username..."
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
            />
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Select date range"
              className="w-full"
              portalId="root"
            />
            <Select
              isMulti
              options={statuses}
              value={statusFilter}
              onChange={(options) => setStatusFilter(options || [])}
              placeholder="All Statuses"
              styles={multiSelectStyles(isDark)}
            />
            <Select
              isMulti
              options={methods}
              value={methodFilter}
              onChange={(options) => setMethodFilter(options || [])}
              placeholder="All Methods"
              styles={multiSelectStyles(isDark)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Requested At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Processed At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    @{item.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusPill(item.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatDateTime(new Date(item.timestamp))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.processedAt ? formatDateTime(new Date(item.processedAt)) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 