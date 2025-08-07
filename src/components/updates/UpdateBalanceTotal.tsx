'use client'

import useBalanceTotal from "@/hooks/useBalanceTotal"
import usePools from "@/hooks/usePools"
import useSavedMoney from "@/hooks/useSavedMoney"
import useWallet from "@/hooks/useWallet"
import { useEffect } from "react"

const UpdateBalanceTotal = () => {

  const { assetData } = useWallet()
  const { savedMoney } = useSavedMoney()
  const { allPools } = usePools()
  const { setBalanceTotalData, toogleLoadingBalance } = useBalanceTotal()

  useEffect(() => {
    const totalBalanceAssets = assetData?.reduce((acc, curr) => acc + curr.balance, 0)
    const totalAllPools = allPools?.reduce((acc, curr) => {
      if (curr.status === 'Active') {
        return acc + parseFloat(curr.startValue?.replace(/\$\s?|/g, '').replace(',', '.'))
      }
      return acc
    }, 0)

    const balanceTotal = (totalBalanceAssets + totalAllPools + savedMoney.usd + savedMoney.brlUsd) - savedMoney.borrow

    const res = {
      balanceTotal: balanceTotal,
      totalBalanceAssets: totalBalanceAssets,
      totalAllPools: totalAllPools,
      totalUsd: savedMoney.usd,
      totalBrl: savedMoney.brl,
      totalBrlUsd: savedMoney.brlUsd,
      borrow: savedMoney.borrow,
    }

    setBalanceTotalData(res)
    toogleLoadingBalance()

  }, [assetData, allPools, savedMoney])

  return (<></>);
}

export default UpdateBalanceTotal;