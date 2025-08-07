'use client'

import PoolsContext from "@/context/PoolsContext";
import { useContext } from "react";

const usePools = () => useContext(PoolsContext)

export default usePools