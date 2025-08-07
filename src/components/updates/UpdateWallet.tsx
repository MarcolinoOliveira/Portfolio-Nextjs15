'use client'

import useAssetsWallet from "@/hooks/useAssetsWallet"
import useCoreApi from "@/hooks/useCoreApi"
import useTraders from "@/hooks/useTraders"
import useWallet from "@/hooks/useWallet"
import { assetDataProps } from "@/interfaces/interfaces"
import { useEffect } from "react"

const UpdateWallet = () => {

  const { data } = useCoreApi()
  const { assetsWallet } = useAssetsWallet()
  const { traders } = useTraders()
  const { setAssetData, toogleLoadingWallet } = useWallet()

  useEffect(() => {
    if (!data && !assetsWallet && !traders) return

    let AllAssetData: Array<assetDataProps> = []

    for (let i = 0; i < assetsWallet.length; i++) {
      let priceCoin = 0
      let value = 0
      let cryptos = 0
      let balance = 0
      let count = 0
      let valueSell = 0

      for (let j = 0; j < traders.length; j++) {
        if (assetsWallet[i].name === traders[j].name) {
          if (traders[j].status === 'buy') {
            priceCoin += parseFloat(traders[j]?.priceCoin.replace(/\$\s?|/g, '').replace(',', '.'))
            value += parseFloat(traders[j]?.value.replace(/\$\s?|/g, '').replace(',', '.'))
            cryptos += (parseFloat(traders[j]?.value.replace(/\$\s?|/g, '').replace(',', '.')) / parseFloat(traders[j]?.priceCoin.replace(/\$\s?|/g, '').replace(',', '.')))
            count++
          } else {
            cryptos -= (parseFloat(traders[j]?.value.replace(/\$\s?|/g, '').replace(',', '.')) / parseFloat(traders[j]?.priceCoin.replace(/\$\s?|/g, '').replace(',', '.')))
            valueSell += parseFloat(traders[j]?.value.replace(/\$\s?|/g, '').replace(',', '.'))
          }
        }
      }

      if (!data) return

      for (let k = 0; k < data.length; k++) {
        if (assetsWallet[i].name === data[k].name) {
          balance += cryptos * data[k].current_price
          break
        }
      }

      let avaregePrice = count ? priceCoin / count : 0
      let profit = balance - (cryptos * avaregePrice)
      let percent = (((balance * 100) / (cryptos * avaregePrice)) - 100)
      let newValue = cryptos * avaregePrice

      AllAssetData.push(
        {
          id: assetsWallet[i]?.id,
          name: assetsWallet[i]?.name,
          symbol: assetsWallet[i]?.symbol,
          image: assetsWallet[i]?.image,
          contribution: newValue,
          cryptos: cryptos,
          balance: balance,
          profit: profit,
          percent: percent,
          avaregePrice: avaregePrice,
          valueSell: valueSell,
          historicalApplied: value
        }
      )
    }

    setAssetData(AllAssetData)
    toogleLoadingWallet()

  }, [assetsWallet, traders])

  return (<></>)
}

export default UpdateWallet;