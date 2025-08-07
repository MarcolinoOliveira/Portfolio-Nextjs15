import ChartPiePortfolio from "@/components/global/ChartPiePortfolio";
import BalanceTotal from "../../../components/global/BalanceTotal";
import CashHandUsd from "./CashHandUsd";
import CashHandBrl from "./CashHandBrl";
import Borrowed from "./Borrowed";
import CashWallet from './CashWallet';
import CashPools from "./CashPools";
import LastTradings from "../../../components/global/LastTradings";

export default function Portfolio() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row-dense">
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <BalanceTotal />
      </div>
      <div className="md:col-span-2 row-span-2 px-4 lg:pt-12 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <ChartPiePortfolio />
      </div>
      <div className="row-span-2 px-4 lg:pt-12 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <LastTradings />
      </div>
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <CashWallet />
      </div>
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <CashPools />
      </div>
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <CashHandUsd />
      </div>
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <CashHandBrl />
      </div>
      <div className="p-4 min-h-48 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <Borrowed />
      </div>
    </div>
  )
}