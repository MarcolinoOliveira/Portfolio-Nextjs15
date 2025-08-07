import { allCoinsProps, assetDataProps, newPoolProps, savedMoneyProps, tradeProps } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface addNewAssetProps {
  selectedAsset: allCoinsProps
  trade: tradeProps
  email: string
  setLoading: Dispatch<SetStateAction<boolean>>
  setOpen: Dispatch<SetStateAction<boolean>>
  savedMoney: savedMoneyProps
}

interface addNewTradeProps {
  asset: assetDataProps
  trade: tradeProps
  email: string
  setLoading: Dispatch<SetStateAction<boolean>>
  setOpen: Dispatch<SetStateAction<boolean>>
  savedMoney: savedMoneyProps
}

interface addSavedMoneyProps {
  email: string
  status: string
  currency: string
  numberNewMoney: number
  savedMoney: savedMoneyProps
}

export async function addNewAsset({ selectedAsset, trade, email, setLoading, setOpen, savedMoney }: addNewAssetProps) {

  if (email) {
    try {
      const docRef = (collection(db, `${email}/assets/AllAssets`))
      const docRefTrade = (collection(db, `${email}/trades/AllTrades`))
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const payload = {
        id: selectedAsset.id,
        symbol: selectedAsset.symbol,
        name: selectedAsset.name,
        image: selectedAsset.image,
      }

      const payloadTrade = {
        id: selectedAsset.id,
        name: selectedAsset.name,
        status: 'buy',
        priceCoin: trade.priceCoin,
        value: trade.value,
        date: trade.date,
        symbol: selectedAsset.symbol,
        image: selectedAsset.image,
      }

      const newSavedMoney = savedMoney.usd - parseFloat(trade.value?.replace(/\$\s?|/g, '').replace(',', '.'))

      await addDoc(docRef, payload)
      await addDoc(docRefTrade, payloadTrade)

      if (savedMoney.id) {
        await updateDoc(docRefSavedMoney, { usd: newSavedMoney })
      } else {
        await setDoc(docRefSavedMoney, { usd: newSavedMoney, brl: 0, borrow: 0 })
      }

      setLoading(prev => !prev)
      setOpen(prev => !prev)

    } catch (e) {
      console.log(e)
    }
  }
}

export async function addNewTrade({ asset, trade, email, setLoading, setOpen, savedMoney }: addNewTradeProps) {

  if (email) {
    try {
      const docRefTrade = (collection(db, `${email}/trades/AllTrades`))
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const payloadTrade = {
        id: asset.id,
        name: asset.name,
        status: trade.status,
        priceCoin: trade.priceCoin,
        value: trade.value,
        date: trade.date,
        symbol: asset.symbol,
        image: asset.image,
      }

      await addDoc(docRefTrade, payloadTrade)

      if (trade.status === 'buy') {
        const newSavedMoney = savedMoney.usd - parseFloat(trade.value?.replace(/\$\s?|/g, '').replace(',', '.'))
        await updateDoc(docRefSavedMoney, { usd: newSavedMoney })
      } else {
        const newSavedMoney = savedMoney.usd + parseFloat(trade.value?.replace(/\$\s?|/g, '').replace(',', '.'))
        await updateDoc(docRefSavedMoney, { usd: newSavedMoney })
      }

      setLoading(prev => !prev)
      setOpen(prev => !prev)

    } catch (e) {
      console.log(e)
    }
  }
}

export async function addNewPool(newPool: newPoolProps, email: string, savedMoney: savedMoneyProps) {

  if (email) {
    try {
      const docRef = collection(db, `${email}/pools/AllPools`)
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const payload = {
        status: "Active",
        imageFirst: newPool.imageFirst,
        symbolFirst: newPool.symbolFirst,
        imageSecond: newPool.imageSecond,
        symbolSecond: newPool.symbolSecond,
        startValue: newPool.startValue,
        fees: "$0,0",
        startDate: newPool.startDate.split('/').reverse().join('-')
      }

      const newSavedMoney = savedMoney.usd - parseFloat(newPool.startValue?.replace(/\$\s?|/g, '').replace(',', '.'))

      await addDoc(docRef, payload)

      if (savedMoney.id) {
        await updateDoc(docRefSavedMoney, { usd: newSavedMoney })
      } else {
        await setDoc(docRefSavedMoney, { usd: newSavedMoney, brl: 0, borrow: 0 })
      }

    } catch (e) {
      console.log(e)
    }
  }
}

export async function addSavedMoney({ email, status, currency, numberNewMoney, savedMoney }: addSavedMoneyProps) {
  if (!email) return

  if (currency === 'usd' && !savedMoney.id) {
    const ref = doc(db, email, 'savedMoney')
    if (status === 'Deposit') await setDoc(ref, { usd: numberNewMoney, brl: 0, borrow: 0 })
    if (status === 'Borrow') await setDoc(ref, { usd: 0, brl: 0, borrow: numberNewMoney })
    return
  }

  if (currency === 'brl' && !savedMoney.id) {
    const ref = doc(db, email, 'savedMoney')
    await setDoc(ref, { usd: 0, brl: numberNewMoney, borrow: 0 })
    return
  }

  if (currency === 'usd' && savedMoney.id) {
    const ref = doc(db, email, 'savedMoney')
    let newUsdMoney = 0
    let newBorrow = 0

    if (status === 'Deposit') newUsdMoney += savedMoney.usd + numberNewMoney
    if (status === 'Withdraw') newUsdMoney += savedMoney.usd - numberNewMoney
    if (status === 'Borrow') newBorrow += savedMoney.borrow + numberNewMoney
    if (status === 'Repay') newBorrow += savedMoney.borrow - numberNewMoney

    if (status === 'Deposit' || status === 'Withdraw') await updateDoc(ref, { usd: newUsdMoney })
    if (status === 'Repay' || status === 'Borrow') await updateDoc(ref, { borrow: newBorrow })
    return
  }

  if (currency === 'brl' && savedMoney.id) {
    const ref = doc(db, email, 'savedMoney')
    let newBrlMoney = 0

    if (status === 'Deposit') newBrlMoney += savedMoney.brl + numberNewMoney
    if (status === 'Withdraw') newBrlMoney += savedMoney.brl - numberNewMoney

    await updateDoc(ref, { brl: newBrlMoney })
    return
  }
}