import { ArbitragePairModel } from "@/src/entities/arbitrage/arbitragePairsModel"
import Link from "next/link"

type ArbitragePairProps = {
  pair: ArbitragePairModel
}
const ArbitragePair = ({ pair }: ArbitragePairProps) => {
  if (!pair.kalshiMarket || !pair.polymarketMarket) {
    return <div>Not enough data {pair.id} {pair.polymarketMarketID} {pair.kalshiMarketTicker}</div>

  }
  return (
    <div className="border border-white rounded-2xl px-2 py-2">
      <div className="flex items-center gap-2 w-full justify-center mb-3">
        <div>
          {pair.createdAt.toISOString()}
        </div>
        <div>
          <Link className="text-blue-300 underline" target="_blank" href={`/market/${pair.polymarketMarket.GetIdentificator()}/${pair.kalshiMarket.GetIdentificator()}`}>See graph</Link>
        </div>
      </div>
      <div className="flex gap-20 items-center">
        <div className="flex flex-col gap-3">
          <div>
            {pair.polymarketMarket.id}
          </div>
          <div>
            {pair.polymarketMarket.GetQuestion()}
          </div>
        </div>
        <div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            {pair.kalshiMarket.ticker}
          </div>
          <div>
            {pair.kalshiMarket.GetQuestion()}
          </div>
        </div>
      </div>
    </div>
  )

}

export default ArbitragePair
