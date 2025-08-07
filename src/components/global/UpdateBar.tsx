'use client'

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import usePools from "@/hooks/usePools";
import { getAllAssets, getAllPools, getAllTraders, getSavedMoney } from "@/app/firebase/getDocs";
import useAssetsWallet from "@/hooks/useAssetsWallet";
import useTraders from "@/hooks/useTraders";
import useSavedMoney from "@/hooks/useSavedMoney";
import UpdateWallet from "../updates/UpdateWallet";
import UpdateBalanceTotal from "../updates/UpdateBalanceTotal";

const UpdateBar = () => {

  const { setAssetsWallet, toogleLoadingAssets } = useAssetsWallet()
  const { setAllPools, toogleLoadingPools } = usePools()
  const { setTraders, toogleLoadingTraders } = useTraders()
  const { setSavedMoney, toogleLoadingMoney } = useSavedMoney()

  const [user] = useAuthState(auth)

  const email = user?.email

  useEffect(() => {
    if (!email) return
    getAllAssets({ email, setAssetsWallet, toogleLoadingAssets })
    getAllPools({ email, setAllPools, toogleLoadingPools })
    getAllTraders({ email, setTraders, toogleLoadingTraders })
    getSavedMoney({ email, setSavedMoney, toogleLoadingMoney })
  }, [email])

  return (
    <>
      <UpdateWallet />
      <UpdateBalanceTotal />
    </>
  );
}

export default UpdateBar;