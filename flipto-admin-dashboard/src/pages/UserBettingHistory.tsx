import { useState, useMemo } from 'react';
import { useDashboardStore } from '@/store';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

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
});

export default function UserBettingHistory() {
  const { bettingHistory } = useDashboardStore();
  
  const [isDark] = useState(document.documentElement.classList.contains('dark'));

  const [transactionIdFilter, setTransactionIdFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null]);
  const [gameTypeFilter, setGameTypeFilter] = useState<any>([]);
  const [gameProviderFilter, setGameProviderFilter] = useState<any>([]);
  const [betStatusFilter, setBetStatusFilter] = useState<any>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const gameTypes = useMemo(() => {
    return [...new Set(bettingHistory.map(item => item.gameType))].map((gt) => ({
      value: gt,
      label: gt,
    }));
  }, [bettingHistory]);
  const gameProviders = useMemo(() => {
    return [...new Set(bettingHistory.map(item => item.gameProvider))].map((gp) => ({
      value: gp,
      label: gp,
    }));
  }, [bettingHistory]);
  const betStatuses = [
    { value: 'win', label: 'Win' },
    { value: 'loss', label: 'Loss' },
    { value: 'tie', label: 'Tie' },
  ];

  const filteredHistory = useMemo(() => {
    setCurrentPage(1);
    return bettingHistory.filter(item => {
      const [startDate, endDate] = dateRange;
      const itemDate = new Date(item.timestamp);

      const matchesTransactionId = transactionIdFilter === '' || item.transactionId.toLowerCase().includes(transactionIdFilter.toLowerCase());
      const matchesUsername = usernameFilter === '' || item.username.toLowerCase().includes(usernameFilter.toLowerCase());
      const matchesDate = !startDate || !endDate || (itemDate >= startDate && itemDate <= endDate);
      const matchesGameType = gameTypeFilter.length === 0 || gameTypeFilter.some((gt: any) => gt.value === item.gameType);
      const matchesGameProvider = gameProviderFilter.length === 0 || gameProviderFilter.some((gp: any) => gp.value === item.gameProvider);
      const matchesBetStatus = betStatusFilter.length === 0 || betStatusFilter.some((bs: any) => bs.value === item.outcome);

      return matchesTransactionId && matchesUsername && matchesDate && matchesGameType && matchesGameProvider && matchesBetStatus;
    });
  }, [bettingHistory, transactionIdFilter, usernameFilter, dateRange, gameTypeFilter, gameProviderFilter, betStatusFilter]);
  
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const currentItems = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'win':
        return 'text-green-600 bg-green-100';
      case 'loss':
        return 'text-red-600 bg-red-100';
      case 'tie':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Betting History</h1>
          <p className="text-gray-600">Review detailed betting records for all users.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
              options={gameTypes}
              value={gameTypeFilter}
              onChange={(options) => setGameTypeFilter(options || [])}
              placeholder="All Game Types"
              styles={multiSelectStyles(isDark)}
            />
            <Select
              isMulti
              options={gameProviders}
              value={gameProviderFilter}
              onChange={(options) => setGameProviderFilter(options || [])}
              placeholder="All Providers"
              styles={multiSelectStyles(isDark)}
            />
            <Select
              isMulti
              options={betStatuses}
              value={betStatusFilter}
              onChange={(options) => setBetStatusFilter(options || [])}
              placeholder="All Statuses"
              styles={multiSelectStyles(isDark)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Game Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Game Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bet Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Balance Before</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payout</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Outcome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Balance After</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">@{item.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.gameName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.gameType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.gameProvider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(item.betAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(item.balanceBefore)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(item.payout)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOutcomeColor(item.outcome)}`}>
                      {item.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(item.balanceAfter)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDateTime(new Date(item.timestamp))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
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
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
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
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
  );
} 