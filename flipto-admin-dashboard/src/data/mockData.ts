import { User, Game, Transaction, SecurityAlert, AnalyticsData, BettingHistory, TopGame, WithdrawHistory } from '@/types'
import { faker } from '@faker-js/faker'

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'player001',
    email: 'john.doe@email.com',
    fullName: 'John Doe',
    status: 'active',
    kycStatus: 'verified',
    balance: 1250.50,
    totalDeposits: 5000.00,
    totalWithdrawals: 3750.00,
    registrationDate: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-20T10:30:00'),
    country: 'United States',
    isVip: true,
  },
  {
    id: '2',
    username: 'lucky_gambler',
    email: 'sarah.smith@email.com',
    fullName: 'Sarah Smith',
    status: 'active',
    kycStatus: 'verified',
    balance: 850.25,
    totalDeposits: 3000.00,
    totalWithdrawals: 2150.00,
    registrationDate: new Date('2023-03-22'),
    lastLogin: new Date('2024-01-20T14:15:00'),
    country: 'Canada',
    isVip: false,
  },
  {
    id: '3',
    username: 'high_roller',
    email: 'mike.wilson@email.com',
    fullName: 'Mike Wilson',
    status: 'suspended',
    kycStatus: 'pending',
    balance: 0.00,
    totalDeposits: 15000.00,
    totalWithdrawals: 12000.00,
    registrationDate: new Date('2022-11-08'),
    lastLogin: new Date('2024-01-19T16:45:00'),
    country: 'United Kingdom',
    isVip: true,
  },
  {
    id: '4',
    username: 'casual_player',
    email: 'emma.brown@email.com',
    fullName: 'Emma Brown',
    status: 'active',
    kycStatus: 'not_submitted',
    balance: 125.75,
    totalDeposits: 500.00,
    totalWithdrawals: 375.00,
    registrationDate: new Date('2024-01-10'),
    lastLogin: new Date('2024-01-20T09:20:00'),
    country: 'Australia',
    isVip: false,
  },
  {
    id: '5',
    username: 'weekend_warrior',
    email: 'david.lee@email.com',
    fullName: 'David Lee',
    status: 'blocked',
    kycStatus: 'rejected',
    balance: 0.00,
    totalDeposits: 2000.00,
    totalWithdrawals: 1800.00,
    registrationDate: new Date('2023-07-14'),
    lastLogin: new Date('2024-01-18T20:10:00'),
    country: 'Germany',
    isVip: false,
  },
]

export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Mega Fortune Slots',
    category: 'slots',
    provider: 'NetEnt',
    status: 'active',
    rtp: 96.8,
    volatility: 'high',
    minBet: 0.25,
    maxBet: 500.00,
    totalPlays: 15420,
    totalRevenue: 125000.50,
    lastUpdated: new Date('2024-01-20T12:00:00'),
  },
  {
    id: '2',
    name: 'Blackjack Pro',
    category: 'table',
    provider: 'Evolution Gaming',
    status: 'active',
    rtp: 99.5,
    volatility: 'low',
    minBet: 1.00,
    maxBet: 1000.00,
    totalPlays: 8920,
    totalRevenue: 89000.25,
    lastUpdated: new Date('2024-01-20T12:00:00'),
  },
  {
    id: '3',
    name: 'Live Roulette',
    category: 'live',
    provider: 'Pragmatic Play',
    status: 'active',
    rtp: 97.3,
    volatility: 'medium',
    minBet: 0.50,
    maxBet: 2500.00,
    totalPlays: 12350,
    totalRevenue: 156000.75,
    lastUpdated: new Date('2024-01-20T12:00:00'),
  },
  {
    id: '4',
    name: 'Football Betting',
    category: 'sports',
    provider: 'Bet365',
    status: 'active',
    rtp: 95.0,
    volatility: 'high',
    minBet: 1.00,
    maxBet: 5000.00,
    totalPlays: 5670,
    totalRevenue: 89000.00,
    lastUpdated: new Date('2024-01-20T12:00:00'),
  },
  {
    id: '5',
    name: 'Powerball Lottery',
    category: 'lottery',
    provider: 'Lottery Corp',
    status: 'maintenance',
    rtp: 50.0,
    volatility: 'high',
    minBet: 2.00,
    maxBet: 100.00,
    totalPlays: 2340,
    totalRevenue: 45000.00,
    lastUpdated: new Date('2024-01-20T12:00:00'),
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'deposit',
    amount: 500.00,
    status: 'completed',
    method: 'Credit Card',
    timestamp: new Date('2024-01-20T10:30:00'),
    description: 'Deposit via Visa ending in 1234',
  },
  {
    id: '2',
    userId: '2',
    type: 'withdrawal',
    amount: 250.00,
    status: 'pending',
    method: 'Bank Transfer',
    timestamp: new Date('2024-01-20T11:15:00'),
    description: 'Withdrawal to Bank of Canada',
  },
  {
    id: '3',
    userId: '1',
    type: 'bet',
    amount: 50.00,
    status: 'completed',
    method: 'Account Balance',
    timestamp: new Date('2024-01-20T12:00:00'),
    description: 'Bet on Mega Fortune Slots',
  },
  {
    id: '4',
    userId: '1',
    type: 'win',
    amount: 1250.00,
    status: 'completed',
    method: 'Account Balance',
    timestamp: new Date('2024-01-20T12:05:00'),
    description: 'Win from Mega Fortune Slots',
  },
  {
    id: '5',
    userId: '3',
    type: 'deposit',
    amount: 1000.00,
    status: 'failed',
    method: 'Crypto',
    timestamp: new Date('2024-01-20T13:20:00'),
    description: 'Failed Bitcoin deposit',
  },
]

export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: '1',
    type: 'suspicious_activity',
    severity: 'high',
    userId: '3',
    description: 'Multiple failed login attempts detected',
    timestamp: new Date('2024-01-20T14:30:00'),
    status: 'investigating',
  },
  {
    id: '2',
    type: 'fraud',
    severity: 'critical',
    userId: '5',
    description: 'Suspicious betting patterns detected',
    timestamp: new Date('2024-01-20T15:00:00'),
    status: 'open',
  },
  {
    id: '3',
    type: 'multiple_accounts',
    severity: 'medium',
    userId: '1',
    description: 'Possible duplicate account registration',
    timestamp: new Date('2024-01-20T16:15:00'),
    status: 'investigating',
  },
  {
    id: '4',
    type: 'chargeback',
    severity: 'high',
    userId: '2',
    description: 'Chargeback request received',
    timestamp: new Date('2024-01-20T17:00:00'),
    status: 'open',
  },
]

function generateMockBettingHistory(): BettingHistory[] {
  const history: BettingHistory[] = faker.helpers.multiple(
    () => {
      const betAmount = parseFloat(faker.finance.amount({ min: 1, max: 1000, dec: 2 }))
      const outcome = faker.helpers.arrayElement(['win', 'loss', 'tie'] as const)
      let payout = 0
      if (outcome === 'win') {
        payout = betAmount * faker.number.int({ min: 2, max: 10 }) // Win between 2x and 10x
      } else if (outcome === 'tie') {
        payout = betAmount
      }

      const balanceBefore = parseFloat(
        faker.finance.amount({ min: betAmount, max: 10000, dec: 2 }),
      )
      const balanceAfter = balanceBefore - betAmount + payout

      return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        gameName: faker.commerce.productName(),
        gameType: faker.helpers.arrayElement(['Slots', 'Table', 'Live'] as const),
        gameProvider: faker.company.name(),
        betAmount,
        payout,
        outcome,
        timestamp: faker.date.recent({ days: 30 }).toISOString(),
        balanceBefore,
        balanceAfter,
      }
    },
    {
      count: 100,
    },
  )
  return history
}

export const mockBettingHistory: BettingHistory[] = generateMockBettingHistory()

export const mockWithdrawHistory: WithdrawHistory[] = Array.from({ length: 75 }, () => {
  const status = faker.helpers.arrayElement(['pending', 'approved', 'rejected'] as const)
  const timestamp = faker.date.recent({ days: 30 }).toISOString()

  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    amount: parseFloat(faker.finance.amount({ min: 50, max: 5000, dec: 2 })),
    method: faker.helpers.arrayElement(['Bank Transfer', 'PayPal', 'Bitcoin', 'Ethereum'] as const),
    status: status,
    timestamp: timestamp,
    transactionId: faker.string.alphanumeric(12).toUpperCase(),
    processedAt: status !== 'pending' ? faker.date.between({ from: timestamp, to: new Date() }).toISOString() : undefined,
  }
})

export const mockAnalyticsData: AnalyticsData = {
  totalRevenue: 515000.5,
  totalUsers: 15420,
  activeUsers: 8920,
  totalGames: 156,
  totalTransactions: 45670,
  revenueChange: 12.5,
  userChange: 8.3,
  gameChange: 2.1,
  transactionChange: 15.7,
} 