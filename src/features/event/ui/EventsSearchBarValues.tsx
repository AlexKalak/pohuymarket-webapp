import { IEvent } from "@/src/entities/event/event.interface"
import MarketsSearchBarValues from "./MarketsSearchBarValues"
import { useState } from "react"

type EventsSearchBarValuesProps = {
  values: IEvent[],
}

const EventsSearchBarValues = ({ values }: EventsSearchBarValuesProps) => {
  // const setCreatingArbitragePairPolymarket = useCreateAritragePairState(s => s.setPolymarketMarket)
  // const setCreatingArbitragePairKalshi = useCreateAritragePairState(s => s.setKalshiMarket)

  // const handleButtonClick = ({ market }: { market: IMarket }) => {
  //   const marketType = market.GetMarketType()
  //   switch (marketType) {
  //     case MarketType.Polymarket:
  //       setCreatingArbitragePairPolymarket(market.Downcast() as PolymarketMarketModel)
  //       break;
  //     case MarketType.Kalshi:
  //       setCreatingArbitragePairKalshi(market.Downcast() as KalshiMarketModel)
  //       break;
  //   }
  // }
  //

  return <div className="w-full flex flex-col items-left  gap-2 px-2 overflow-scroll " style={{ maxHeight: 700 }}>
    {values.map((value, idx) =>
      <EventsSearchBarValue value={value} key={value.GetIdentificator()} />
    )}
  </div>
}

const EventsSearchBarValue = ({ value }: { value: IEvent }) => {
  const [opened, setOpened] = useState<boolean>(false)

  return (
    <div className="w-full flex items-center border border-bottom border-white py-2 px-2" >
      <div
        className=" w-full flex flex-col gap-1 cursor-pointer"
      >
        <div
          onClick={() => setOpened(prev => !prev)}
          className="border border-white flex flex-col gap-1"
        >
          <div>{value.GetIdentificator()}</div>
          <div>{value.GetTitle()}</div>
        </div>
        <div
          className="px-5 overflow-hidden"
          style={{ display: opened ? "block" : "none", maxHeight: "300px" }}
        >
          <MarketsSearchBarValues values={value.GetMarkets()} />
        </div>
      </div>
    </div>
  )

}

export default EventsSearchBarValues

