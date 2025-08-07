'use client'

import { savedMoneyProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface SavedMOneyContextProps {
  savedMoney: savedMoneyProps
  setSavedMoney: Dispatch<SetStateAction<savedMoneyProps>>
  loading: boolean
  toogleLoadingMoney: () => void
}

const SavedMoneyContext = createContext({} as SavedMOneyContextProps)

export const SavedMoneyProvider = ({ children }: { children: ReactNode }) => {

  const [savedMoney, setSavedMoney] = useState<savedMoneyProps>({
    id: '',
    usd: 0,
    brl: 0,
    brlUsd: 0,
    borrow: 0
  })

  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingMoney = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <SavedMoneyContext.Provider value={{ savedMoney, setSavedMoney, loading, toogleLoadingMoney }}>
      {children}
    </SavedMoneyContext.Provider>
  )
}

export default SavedMoneyContext