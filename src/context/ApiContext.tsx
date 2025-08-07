'use client'

import useSWR from "swr"
import axios from "axios"
import { createContext } from "react"
import { allCoinsProps } from "@/interfaces/interfaces"


type allCoinsContextProps = {
  data?: allCoinsProps[]
}

const ApiContext = createContext({} as allCoinsContextProps)

export const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {

  const fetcher = async (url: string) => {
    const { data } = await axios.get(url)
    return data.data
  }

  const { data, isLoading } = useSWR<allCoinsProps[]>('/api/coreApi', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
    refreshWhenHidden: true
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-#060610">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ApiContext.Provider value={{ data }}>
      {children}
    </ApiContext.Provider>
  )
}

export default ApiContext