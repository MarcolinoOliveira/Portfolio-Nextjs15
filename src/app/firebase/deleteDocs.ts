import { endingPoolPros, savedMoneyProps } from "@/interfaces/interfaces"
import { db } from "@/lib/firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"

interface deleteDocProps {
  email: string
  id: string
}

interface disablePoolProps {
  id: string
  email: string
  endingPool: endingPoolPros
  savedMoney: savedMoneyProps
}

interface dateleTradingProps {
  id: string
  email: string
  status: string
  savedMoney: savedMoneyProps
  value: string
}

export async function deleteCoinWallet({ email, id }: deleteDocProps) {

  if (email && id) {
    const docRef = doc(db, `${email}/assets/AllAssets`, id)

    await deleteDoc(docRef)
  }
}

export async function deleteCoinTrader({ email, id }: deleteDocProps) {

  if (email && id) {
    const docRef = doc(db, `${email}/trades/AllTrades`, id)

    await deleteDoc(docRef)
  }
}

export async function disablePool({ id, email, endingPool, savedMoney }: disablePoolProps) {

  if (id && email) {
    try {
      const ref = doc(db, `${email}/pools/AllPools`, id)
      const docRefSavedMoney = doc(db, email, 'savedMoney')

      const payload = {
        status: 'Disable',
        endValue: endingPool.endValue,
        endDate: endingPool.endDate
      }

      const newSavedMoney = savedMoney.usd + parseFloat(endingPool.endValue?.replace(/\$\s?|/g, '').replace(',', '.'))

      await updateDoc(ref, payload)
      await updateDoc(docRefSavedMoney, { usd: newSavedMoney })

    } catch (e) {
      console.log(e)
    }
  }
}

export async function deletePool({ email, id }: deleteDocProps) {

  if (id && email) {
    try {
      const ref = doc(db, `${email}/pools/AllPools`, id)

      await deleteDoc(ref)

    } catch (e) {
      console.log(e)
    }
  }
}

export async function deleteTrading({ id, email, status, savedMoney, value }: dateleTradingProps) {

  if (id && email) {
    const ref = doc(db, `${email}/trades/AllTrades`, id)
    const savedRef = doc(db, email, 'savedMoney')

    if (status === 'buy') {
      const newSavedMoney = savedMoney.usd + parseFloat(value?.replace(/\$\s?|/g, '').replace(',', '.'))
      await updateDoc(savedRef, { usd: newSavedMoney })
    }
    if (status === 'sell') {
      const newSavedMoney = savedMoney.usd - parseFloat(value?.replace(/\$\s?|/g, '').replace(',', '.'))
      await updateDoc(savedRef, { usd: newSavedMoney })
    }

    await deleteDoc(ref)
  }
}