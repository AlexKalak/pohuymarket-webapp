import { PolymarketEventModel } from "@/src/entities/event/polymarketEventModel"
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { IMarket, MarketType } from "@/src/entities/market/market.interface"
import { PolymarketMarketData, PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import { useCreateAritragePairState } from "@/src/stores/createArbitragePairs"

type EventsSearchBarValuesProps = {
  values: IMarket[]
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

  return <div className="w-full flex flex-col items-left  gap-2 overflow-scroll " style={{ maxHeight: 700 }}>
    {values.map((value, idx) =>
      <div className="w-full flex items-center  border border-bottom border-white py-2 px-2" key={idx}>
        <div className="flex flex-col">
          <div>{value.GetIdentificator()}</div>
          <div>{value.GetQuestion()}</div>
        </div>
        <button
          className="bg-white text-black cursor-pointer px-2 py-1 rounded-md"
          onClick={() => handleButtonClick({ market: value })}
        >
          +
        </button>
      </div>
    )}
  </div>
}

export default MarketsSearchBarValues
