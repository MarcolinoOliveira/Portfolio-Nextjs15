'use client'

import TradersContext from "@/context/TradersContext";
import { useContext } from "react";

const useTraders = () => useContext(TradersContext)

export default useTraders