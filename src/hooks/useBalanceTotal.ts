'use client'

import BalanceTotalContext from "@/context/BalanceTotalContext"
import { useContext } from "react"

const useBalanceTotal = () => useContext(BalanceTotalContext)

export default useBalanceTotal