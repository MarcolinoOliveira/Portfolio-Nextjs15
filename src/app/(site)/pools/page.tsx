import ActivatedPools from "./ActivatedPools";
import DisabledPools from "./DisabledPools";
import HeaderPools from "./HeaderPools";

export default function Pools() {

  return (
    <div className="flex flex-col w-full gap-6">
      <HeaderPools />
      <ActivatedPools />
      <DisabledPools />
    </div>
  )
}