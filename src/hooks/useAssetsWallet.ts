'use client'

import AssetsWalletContext from "@/context/AssetsContext"
import { useContext } from "react"

const useAssetsWallet = () => useContext(AssetsWalletContext)

export default useAssetsWallet