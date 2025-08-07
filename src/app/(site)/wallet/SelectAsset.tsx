'use client'

import { addNewAsset } from "@/app/firebase/addDocs"
import ModalAllCoins from "@/components/global/ModalAllCoins"
import { Button } from "@/components/ui/button"
import useAssetsWallet from "@/hooks/useAssetsWallet"
import { allCoinsProps } from "@/interfaces/interfaces"
import { auth } from "@/lib/firebase"
import { ChevronDown } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "sonner"

interface SelectAssetProps {
  selectAsset: allCoinsProps
  setSelectAsset: Dispatch<SetStateAction<allCoinsProps>>
}

const SelectAsset = ({ selectAsset, setSelectAsset }: SelectAssetProps) => {

  const [open, setOpen] = useState(false)
  const { assetsWallet } = useAssetsWallet()

  const [user] = useAuthState(auth)
  const email = user?.email

  const selectToken = async (coin: allCoinsProps) => {
    if (!email) return

    let exist = false

    for (let i = 0; i < assetsWallet.length; i++) {
      if (assetsWallet[i].name === coin.name) {
        exist = true
        break
      }
    }

    if (exist) {
      toast.error('Asset already registeres', { richColors: true })
    } else {
      setSelectAsset(coin)
      setOpen(prev => !prev)
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(prev => !prev)} variant='outline' className="w-full cursor-pointer bg-accent-foreground">
        {!selectAsset.image &&
          <div className="flex justify-between p-1.5 w-full items-center">
            <a className="font-bold">Choose Token</a>
            <ChevronDown />
          </div>}
        {selectAsset.image &&
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-start p-1.5 flex-1 items-center gap-1.5">
              <img src={selectAsset.image} alt="symbol" className="w-5 h-5 mt-1" />
              <a className="font-bold ">{selectAsset.symbol.toUpperCase()}</a>
            </div>
            <div className="w-1/12 ">
              <ChevronDown size={25} />
            </div>
          </div>}
      </Button>
      <ModalAllCoins open={open} setOpen={setOpen} selectToken={selectToken} />
    </div>
  )
}

export default SelectAsset