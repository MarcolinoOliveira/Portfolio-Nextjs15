'use client'

import ApiContext from "@/context/ApiContext";
import { useContext } from "react";

const useCoreApi = () => useContext(ApiContext)

export default useCoreApi