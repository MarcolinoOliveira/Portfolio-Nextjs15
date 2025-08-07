export interface allCoinsProps {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

export interface assetsWalletProps {
  id: string
  name: string
  symbol: string
  image: string
}

export interface tradeProps {
  id: string
  name: string
  status: string
  priceCoin: string
  value: string
  date: string
  symbol: string
  image: string
}

export interface assetDataProps {
  id: string
  name: string
  symbol: string
  image: string
  contribution: number
  cryptos: number
  balance: number
  profit: number
  percent: number
  avaregePrice: number
  valueSell: number
  historicalApplied: number
}

export interface newPoolProps {
  imageFirst: string,
  symbolFirst: string,
  imageSecond: string,
  symbolSecond: string,
  startValue: string,
  startDate: string
}

export interface AllPoolsProps extends newPoolProps {
  id: string
  status: string
  fees: string
  endDate: string
  endValue: string
}

export interface endingPoolPros {
  endValue: string
  endDate: string
}

export interface savedMoneyProps {
  id: string
  usd: number
  brl: number
  brlUsd: number
  borrow: number
}

export interface BalanceTotalProps {
  balanceTotal: number
  totalBalanceAssets: number
  totalAllPools: number
  totalUsd: number
  totalBrl: number
  totalBrlUsd: number
  borrow: number
}

export interface changeValueProps {
  priceCoin: string
  value: string
  date: string
}

export interface tradersProfitProps {
  id: string
  name: string
  status: string
  priceCoin: string
  value: string
  date: string
  symbol: string
  image: string
  profit: number
  percent: string
  cryptos: number
}