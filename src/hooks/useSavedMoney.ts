'use client'

import SavedMoneyContext from "@/context/SavedMoneyContext"
import { useContext } from "react"

const useSavedMoney = () => useContext(SavedMoneyContext)

export default useSavedMoney