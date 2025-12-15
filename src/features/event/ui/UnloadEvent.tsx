import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { useState } from "react"

const UnloadEvent = ({ unloadEvent }: { unloadEvent: { event_ticker: string, markets: KalshiMarketModel[] } }) => {
  const [unfolded, setUnfolded] = useState<boolean>(true)

  return (

    <div key={unloadEvent.event_ticker}>
      <div className="px-2 py-2 text-2xl border border-white cursor-pointer" onClick={() => setUnfolded(prev => !prev)}>
        {unloadEvent.event_ticker}
      </div>

      {unfolded &&
        unloadEvent.markets.map((market) => <div className="px-4 py-1 border border-gray-500 flex gap-2" key={market.ticker}>

          <div className="flex text-center flex-col items-center gap-2" style={{ maxWidth: "70%" }} >
            <div className="text-sm">{market.GetQuestion()}</div>
            <div className="text-sm">{market.GetSub()}</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm">{market.event_ticker}</div>
            <div className="text-sm">{market.closeTime.toISOString()}</div>
          </div>
        </div>)

      }
    </div>
  )
}

export default UnloadEvent
