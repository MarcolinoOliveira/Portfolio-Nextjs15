'use client'

import WalletContext from "@/context/WalletContext";
import { useContext } from "react";

const useWallet = () => useContext(WalletContext)

export default useWallet