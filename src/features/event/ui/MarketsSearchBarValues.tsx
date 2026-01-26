import Market from "@/app/market/[marketID]/page"
import { PolymarketEventModel } from "@/src/entities/event/polymarketEventModel"
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { IMarket, MarketType } from "@/src/entities/market/market.interface"
import { PolymarketMarketData, PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import { useCreateAritragePairState } from "@/src/stores/createArbitragePairs"
import { useMemo } from "react"

type EventsSearchBarValuesProps = {
  values: IMarket[],
}

function formatDate(date: Date | undefined): string {
  if (typeof date === "undefined") {
    return ""
  }
  const year = date.getFullYear()

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12 // convert 0 → 12
  const hh = String(hours).padStart(2, '0')

  return `${year}-${month}-${day} ${hh} ${ampm}`
}


const MarketsSearchBarValues = ({ values }: EventsSearchBarValuesProps) => {
  const setCreatingArbitragePairPolymarket = useCreateAritragePairState(s => s.setPolymarketMarket)
  const setCreatingArbitragePairKalshi = useCreateAritragePairState(s => s.setKalshiMarket)

  const handleButtonClick = ({ market }: { market: IMarket }) => {
    const marketType = market.GetMarketType()
    switch (marketType) {
      case MarketType.Polymarket:
        setCreatingArbitragePairPolymarket(market.Downcast() as PolymarketMarketModel)
        break;
      case MarketType.Kalshi:
        setCreatingArbitragePairKalshi(market.Downcast() as KalshiMarketModel)
        break;
    }
  }

  return <div className="w-full flex flex-col items-left  gap-2 overflow-scroll " style={{ maxHeight: 300 }}>
    {values.map((value, idx) =>
      <div className="w-full flex items-center  border border-bottom border-white py-2 px-2" key={idx}>
        <div className="flex flex-col">
          <div>{value.GetIdentificator()}</div>
          <div>{value.GetQuestion()}</div>
          <div>{value.GetMarketType() === MarketType.Kalshi && (value.Downcast() as KalshiMarketModel)?.yesSubtitle}</div>
          <div>
            {value.GetMarketType() === MarketType.Polymarket &&
              formatDate((value.Downcast() as PolymarketMarketModel)?.startDate)
            }
          </div>
          <div>
            {value.GetMarketType() === MarketType.Kalshi &&
              formatDate((value.Downcast() as KalshiMarketModel)?.expirationValue)
            }
          </div>
        </div>
        <button
          className="bg-white text-black cursor-pointer px-2 py-1 rounded-md"
          onClick={() => handleButtonClick({ market: value })}
        >
          +
        </button>
      </div>
    )}
  </div >
}

export default MarketsSearchBarValues
