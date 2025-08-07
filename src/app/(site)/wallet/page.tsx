import AddNewAsset from "./AddNewAsset";
import AssetsList from "./AssetsList";

export default function Wallet() {

  return (
    <div className="flex flex-col gap-6 z-1">
      <div className="flex justify-between w-full pt-1">
        <a className="text-2xl font-semibold">Your assets</a>
        <AddNewAsset />
      </div>
      <AssetsList />
    </div>
  )
}