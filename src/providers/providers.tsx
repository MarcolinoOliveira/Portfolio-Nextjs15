'use client'

import { PoolsProvider } from "@/context/PoolsContext"
import { ApiContextProvider } from "@/context/ApiContext"
import { AssetsWalletProvider } from "@/context/AssetsContext"
import { TradersProvider } from "@/context/TradersContext"
import { WalletProvider } from "@/context/WalletContext"
import { SavedMoneyProvider } from "@/context/SavedMoneyContext"
import { BalanceTotalProvider } from "@/context/BalanceTotalContext"

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <ApiContextProvider>
      <AssetsWalletProvider>
        <WalletProvider>
          <TradersProvider>
            <PoolsProvider>
              <SavedMoneyProvider>
                <BalanceTotalProvider>
                  {children}
                </BalanceTotalProvider>
              </SavedMoneyProvider>
            </PoolsProvider>
          </TradersProvider>
        </WalletProvider>
      </AssetsWalletProvider>
    </ApiContextProvider>
  )
}

export default Providers