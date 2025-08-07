'use client'

import { AllPoolsProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface PoolsContextProps {
  allPools: AllPoolsProps[]
  setAllPools: Dispatch<SetStateAction<AllPoolsProps[]>>
  loading: boolean
  toogleLoadingPools: () => void
}

const PoolsContext = createContext({} as PoolsContextProps)

export const PoolsProvider = ({ children }: { children: ReactNode }) => {

  const [allPools, setAllPools] = useState<AllPoolsProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingPools = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <PoolsContext.Provider value={{ allPools, setAllPools, loading, toogleLoadingPools }}>
      {children}
    </PoolsContext.Provider>
  )
}

export default PoolsContext