import { AllPoolsProps, assetsWalletProps, savedMoneyProps, tradeProps } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface getAllAssetsProps {
  email: string
  setAssetsWallet: Dispatch<SetStateAction<assetsWalletProps[]>>
  toogleLoadingAssets: () => void
}

interface getAllPoolsProps {
  email: string
  setAllPools: Dispatch<SetStateAction<AllPoolsProps[]>>
  toogleLoadingPools: () => void
}

interface getAllActivatedPoolsProps {
  email: string
  setActivatedPools: Dispatch<SetStateAction<AllPoolsProps[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

interface getAllDisabledPoolsProps {
  email: string
  setDisabledPools: Dispatch<SetStateAction<AllPoolsProps[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

interface getAllTradersProps {
  email: string
  setTraders: Dispatch<SetStateAction<tradeProps[]>>
  toogleLoadingTraders: () => void
}

interface getSavedMoneyProps {
  email: string
  setSavedMoney: Dispatch<SetStateAction<savedMoneyProps>>
  toogleLoadingMoney: () => void
}

export async function getAllAssets({ email, setAssetsWallet, toogleLoadingAssets }: getAllAssetsProps) {

  const ref = collection(db, `${email}/assets/AllAssets`)

  onSnapshot(query(ref), (snapshot) => {
    const allAssets = snapshot.docs.map((doc) => ({ ...doc.data() as assetsWalletProps, id: doc.id }))
    setAssetsWallet(allAssets)
    toogleLoadingAssets()
  })
}

export async function getAllPools({ email, setAllPools, toogleLoadingPools }: getAllPoolsProps) {

  const ref = collection(db, `${email}/pools/AllPools`)

  onSnapshot(query(ref, orderBy('startDate')), (snapshot) => {
    const allPools = snapshot.docs.map((doc) => ({ ...doc.data() as AllPoolsProps, id: doc.id }))
    setAllPools(allPools)
    toogleLoadingPools()
  })
}

export async function getAllActivatedPools({ email, setActivatedPools, setLoading }: getAllActivatedPoolsProps) {

  const ref = collection(db, `${email}/pools/AllPools`)

  onSnapshot(query(ref, where("status", "==", "Active"), orderBy('startDate')), (snapshot) => {
    const allPools = snapshot.docs.map((doc) => ({ ...doc.data() as AllPoolsProps, id: doc.id }))
    setActivatedPools(allPools)
    setLoading(false)
  })
}

export async function getAllDisabledPools({ email, setDisabledPools, setLoading }: getAllDisabledPoolsProps) {

  const ref = collection(db, `${email}/pools/AllPools`)

  onSnapshot(query(ref, where("status", "==", "Disable"), orderBy('startDate')), (snapshot) => {
    const allPools = snapshot.docs.map((doc) => ({ ...doc.data() as AllPoolsProps, id: doc.id }))
    setDisabledPools(allPools)
    setLoading(false)
  })
}

export async function getAllTraders({ email, setTraders, toogleLoadingTraders }: getAllTradersProps) {

  const ref = collection(db, `${email}/trades/AllTrades`)

  onSnapshot(query(ref, orderBy('date')), (snapshot) => {
    const allTraders = snapshot.docs.map((doc) => ({ ...doc.data() as tradeProps, id: doc.id }))
    setTraders(allTraders)
    toogleLoadingTraders()
  })
}

export async function getSavedMoney({ email, setSavedMoney, toogleLoadingMoney }: getSavedMoneyProps) {

  const ref = doc(db, email, 'savedMoney')
  onSnapshot(ref, async (doc) => {
    if (doc.exists()) {
      const { usd, brl, borrow } = doc.data() as savedMoneyProps

      const res = await fetch('/api/cotacaoUsd');
      const data = await res.json();
      const brlUsd = data.rate ? (brl * data.rate) : 0

      const saved = {
        id: doc.id,
        usd: usd,
        brl: brl,
        brlUsd: brlUsd,
        borrow: borrow
      }

      setSavedMoney(saved)
      toogleLoadingMoney()

    } else {
      toogleLoadingMoney()
    }
  })
}