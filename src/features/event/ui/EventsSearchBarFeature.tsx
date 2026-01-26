'use client'
import MarketsSearchBar from "@/src/common/components/events/MarketsSearchBar"
import { useState } from "react"
import MarketsSearchBarValues from "./MarketsSearchBarValues"
import { useEventsByTextQuery } from "@/src/common/api/events/hooks/useEventsByTextQuery"
import EventsSearchBarValues from "./EventsSearchBarValues"

const MarketsSearchBarFeature = () => {
  const [searchingValue, setSearchingValue] = useState<string>("")

  const { polymarketEvents, kalshiEvents, isLoading, error } = useEventsByTextQuery({ first: 100, skip: 0, text: searchingValue })

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-hidden border border-solid rounded-xl border-white " >
      <MarketsSearchBar setValue={setSearchingValue} />
      {
        (polymarketEvents || kalshiEvents) &&
        <div className="w-full flex gap-10 ">
          <div className="w-full flex flex-col gap-5 items-center">
            <div className="w-full text-center">Polymarket</div>
            {polymarketEvents &&
              <EventsSearchBarValues values={polymarketEvents} />
            }
          </div>

          <div className="w-full flex flex-col gap-5 items-center">
            <div className="text-center w-full">Kalshi</div>
            {kalshiEvents &&
              <EventsSearchBarValues values={kalshiEvents} />
            }
          </div>

        </div>
      }
    </div>
  )
}

export default MarketsSearchBarFeature
