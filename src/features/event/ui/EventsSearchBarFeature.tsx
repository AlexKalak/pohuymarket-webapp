'use client'
import MarketsSearchBar from "@/src/common/components/events/MarketsSearchBar"
import { useState } from "react"
import MarketsSearchBarValues from "./MarketsSearchBarValues"
import { useEventsByTextQuery } from "@/src/common/api/events/hooks/useEventsByTextQuery"
import EventsSearchBarValues from "./EventsSearchBarValues"
import { MarketType } from "@/src/entities/market/market.interface"

const MarketsSearchBarFeature = () => {
  const [searchingValue, setSearchingValue] = useState<string>("")

  const { polymarketEvents, kalshiEvents, predictFunEvents, isLoading, error } = useEventsByTextQuery({ first: 100, skip: 0, text: searchingValue })
  console.log("Predict fun events: ", predictFunEvents)

  const [firstColMarketType, setFirstColMarketType] = useState<MarketType>(MarketType.Polymarket)
  const [secondColMarketType, setSecondColMarketType] = useState<MarketType>(MarketType.Kalshi)

  let firstColumnEvents
  switch (firstColMarketType) {
    case MarketType.Polymarket:
      firstColumnEvents = polymarketEvents
      break;
    case MarketType.Kalshi:
      firstColumnEvents = kalshiEvents
      break;
    case MarketType.PredictFun:
      firstColumnEvents = predictFunEvents
      break;
  }

  let secondColumnEvents
  switch (secondColMarketType) {
    case MarketType.Polymarket:
      secondColumnEvents = polymarketEvents
      break;
    case MarketType.Kalshi:
      secondColumnEvents = kalshiEvents
      break;
    case MarketType.PredictFun:
      secondColumnEvents = predictFunEvents
      break;
  }
  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-hidden border border-solid rounded-xl border-white " >
      <MarketsSearchBar setValue={setSearchingValue} />
      <div className="w-full flex gap-10 ">
        <div className="w-full flex flex-col gap-5 items-center">
          <div className="w-full text-center">Polymarket</div>
          {firstColumnEvents &&
            <EventsSearchBarValues values={firstColumnEvents} />
          }
        </div>
        <div className="w-full flex flex-col gap-5 items-center">
          <div className="w-full text-center">Kalshi</div>
          {secondColumnEvents &&
            <EventsSearchBarValues values={secondColumnEvents} />
          }
        </div>
      </div>
    </div>
  )
}

export default MarketsSearchBarFeature
