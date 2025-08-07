'use client'

import { assetsWalletProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface AssetsWalletContextProps {
  assetsWallet: assetsWalletProps[]
  setAssetsWallet: Dispatch<SetStateAction<assetsWalletProps[]>>
  loading: boolean
  toogleLoadingAssets: () => void
}

const AssetsWalletContext = createContext({} as AssetsWalletContextProps)

export const AssetsWalletProvider = ({ children }: { children: ReactNode }) => {

  const [assetsWallet, setAssetsWallet] = useState<assetsWalletProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingAssets = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <AssetsWalletContext.Provider value={{ assetsWallet, setAssetsWallet, loading, toogleLoadingAssets }}>
      {children}
    </AssetsWalletContext.Provider>
  )
}

export default AssetsWalletContext