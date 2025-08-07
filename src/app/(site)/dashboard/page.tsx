import LastTradings from "../../../components/global/LastTradings";
import BalanceTotal from "../../../components/global/BalanceTotal";
import ChartPieDashboard from "./ChartPieDashboard";
import ChartPiePortfolio from "@/components/global/ChartPiePortfolio";
import { ChartBarBalance } from "./ChartBarBalance";
import { ChartBarSales } from "./ChartBarSales";


export default function Dashboard() {

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="min-h-55 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <BalanceTotal />
      </div>
      <div className="col-span-2 min-h-55 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <ChartPieDashboard />
      </div>
      <div className="min-h-55 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">3</div>
      <div className="col-span-3 min-h-85 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <ChartPiePortfolio />
      </div>
      <div className=" min-h-55 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <LastTradings />
      </div>
      <div className="col-span-2 min-h-90 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <ChartBarBalance />
      </div>
      <div className="col-span-2 min-h-90 p-4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <ChartBarSales />
      </div>
    </div>
  )
}