import { KalshiEventModel } from "@/src/entities/event/kalshiEventModel"
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { useMemo } from "react"
import UnloadEvent from "./UnloadEvent"

const UnloadEventsList = ({ markets }: { markets: KalshiMarketModel[] }) => {

  const categorizedMarkets = useMemo(() => {
    if (!markets) {
      return []
    }

    let sortedMarkets = [...markets]
    sortedMarkets.sort((market1, market2) => market1.event_ticker.charCodeAt(0) - market2.event_ticker.charCodeAt(1))
    sortedMarkets = sortedMarkets.filter(market => market.status === "active")

    const marketsMap = new Map<string, KalshiMarketModel[]>
    for (const market of sortedMarkets) {
      const existingArr = marketsMap.get(market.event_ticker)
      if (!existingArr) {
        marketsMap.set(market.event_ticker, [market])
      } else {
        existingArr.push(market)
      }
    }
    const categorizedMarkets: {
      event_ticker: string
      markets: KalshiMarketModel[]
    }[] = []

    for (const [key, value] of marketsMap) {
      categorizedMarkets.push({
        event_ticker: key,
        markets: value
      })
    }
    return categorizedMarkets
  }, [markets])

  return <div>
    {categorizedMarkets && <div className="flex flex-col gap-2">
      {categorizedMarkets?.map(category =>
        <UnloadEvent key={category.event_ticker} unloadEvent={category} />
      )}
    </div>}
  </div>
}

export default UnloadEventsList
