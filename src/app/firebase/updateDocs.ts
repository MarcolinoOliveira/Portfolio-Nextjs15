import { changeValueProps, newPoolProps, savedMoneyProps } from "@/interfaces/interfaces"
import { db } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore"

interface updateFeesProps {
  email: string
  id: string
  fees: string
  newFees: string
  savedMoney: savedMoneyProps
}

interface changePoolProps {
  newPool: newPoolProps,
  email: string,
  id: string
}

interface addLiquidityProps {
  newLiquidity: string,
  startValue: string
  email: string,
  savedMoney: savedMoneyProps
  id: string
}

interface updateDeleteAssetProps {
  email: string
  newSavedMoney: number
  savedMoney: savedMoneyProps
}

interface updateOnlyTradeProps {
  id: string
  email: string
  changeValue: changeValueProps
  oldValue: string
  status: string
  savedMoney: savedMoneyProps
}

export async function updateFees({ email, id, fees, newFees, savedMoney }: updateFeesProps) {

  if (id && email) {
    try {
      const ref = doc(db, `${email}/pools/AllPools`, id)
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const totalFees = parseFloat(fees?.replace(/\$\s?|/g, '').replace(',', '.')) + parseFloat(newFees?.replace(/\$\s?|/g, '').replace(',', '.'))
      const total = '$' + totalFees.toFixed(2).replace('.', ',')

      const newSavedMoney = savedMoney.usd + parseFloat(newFees?.replace(/\$\s?|/g, '').replace(',', '.'))

      await updateDoc(ref, { fees: total })
      await updateDoc(docRefSavedMoney, { usd: newSavedMoney })

    } catch (e) {
      console.log(e)
    }
  }
}

export async function changePool({ newPool, id, email }: changePoolProps) {

  if (id && email) {
    try {
      const docRef = doc(db, `${email}/pools/AllPools`, id)

      const payload = {
        status: "Active",
        imageFirst: newPool.imageFirst,
        symbolFirst: newPool.symbolFirst,
        imageSecond: newPool.imageSecond,
        symbolSecond: newPool.symbolSecond,
        value: newPool.startValue,
        date: newPool.startDate.split('/').reverse().join('-')
      }

      await updateDoc(docRef, payload)

    } catch (e) {
      console.log(e)
    }
  }
}

export async function addLiquidity({ newLiquidity, startValue, email, id, savedMoney }: addLiquidityProps) {

  if (id && email) {
    try {
      const docRef = doc(db, `${email}/pools/AllPools`, id)
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const totalLiquidity = parseFloat(startValue?.replace(/\$\s?|/g, '').replace(',', '.')) + parseFloat(newLiquidity?.replace(/\$\s?|/g, '').replace(',', '.'))
      const total = '$' + totalLiquidity.toFixed(2).replace('.', ',')

      const newSavedMoney = savedMoney.usd - parseFloat(newLiquidity?.replace(/\$\s?|/g, '').replace(',', '.'))

      await updateDoc(docRef, { startValue: total })
      await updateDoc(docRefSavedMoney, { usd: newSavedMoney })

    } catch (e) {
      console.log(e)
    }
  }
}

export async function changePair({ newPool, id, email }: changePoolProps) {

  if (id && email) {
    try {
      const docRef = doc(db, `${email}/pools/AllPools`, id)

      const payload = {
        imageFirst: newPool.imageFirst,
        symbolFirst: newPool.symbolFirst,
        imageSecond: newPool.imageSecond,
        symbolSecond: newPool.symbolSecond,
      }

      await updateDoc(docRef, payload)

    } catch (e) {
      console.log(e)
    }
  }
}

export async function updateDeleteAsset({ email, newSavedMoney, savedMoney }: updateDeleteAssetProps) {
  if (email) {
    const docRefSavedMoney = doc(db, email, 'savedMoney')

    const newValue = savedMoney.usd + newSavedMoney

    await updateDoc(docRefSavedMoney, { usd: newValue })
  }
}

export async function updateOnlyTrade({ id, email, changeValue, oldValue, status, savedMoney }: updateOnlyTradeProps) {
  if (email) {
    const ref = doc(db, `${email}/trades/AllTrades`, id)
    const savedRef = doc(db, email, 'savedMoney')

    const payload = {
      priceCoin: changeValue.priceCoin,
      value: changeValue.value,
      date: changeValue.date
    }

    const newValue = parseFloat(oldValue?.replace(/\$\s?|/g, '').replace(',', '.')) - parseFloat(changeValue.value?.replace(/\$\s?|/g, '').replace(',', '.'))

    if (status === 'buy') {
      const newSavedMoney = savedMoney.usd + (newValue)
      await updateDoc(savedRef, { usd: newSavedMoney })
    }

    if (status === 'sell') {
      const newSavedMoney = savedMoney.usd - (newValue)
      await updateDoc(savedRef, { usd: newSavedMoney })
    }

    await updateDoc(ref, payload)
  }
}