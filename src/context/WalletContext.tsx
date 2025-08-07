'use client'

import { assetDataProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface WalletContextProps {
  assetData: assetDataProps[]
  setAssetData: Dispatch<SetStateAction<assetDataProps[]>>
  loading: boolean
  toogleLoadingWallet: () => void
}

const WalletContext = createContext({} as WalletContextProps)

export const WalletProvider = ({ children }: { children: ReactNode }) => {

  const [assetData, setAssetData] = useState<assetDataProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingWallet = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <WalletContext.Provider value={{ assetData, setAssetData, loading, toogleLoadingWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContext