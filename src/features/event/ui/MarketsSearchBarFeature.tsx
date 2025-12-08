'use client'
import { useMarketsByTextQuery } from "@/src/common/api/market/hooks/useMarketsByTextQuery"
import { useMarketsQuery } from "@/src/common/api/market/hooks/useMarketsQuery"
import MarketsSearchBar from "@/src/common/components/events/MarketsSearchBar"
import { useState } from "react"
import MarketsSearchBarValues from "./MarketsSearchBarValues"

const MarketsSearchBarFeature = () => {
  const [searchingValue, setSearchingValue] = useState<string>("")

  const { polymarketMarkets, kalshiMarkets, isLoading, error } = useMarketsByTextQuery({ first: 100, skip: 0, text: searchingValue })

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-hidden border border-solid rounded-xl border-white " >
      <MarketsSearchBar setValue={setSearchingValue} />
      {
        (polymarketMarkets || kalshiMarkets) &&
        <div className="w-full flex gap-10 ">
          <div className="w-full flex flex-col gap-5 items-center">
            <div className="w-full text-center">Polymarket</div>
            {polymarketMarkets &&
              <MarketsSearchBarValues values={polymarketMarkets} />
            }
          </div>

          <div className="w-full flex flex-col gap-5 items-center">
            <div className="text-center w-full">Kalshi</div>
            {kalshiMarkets &&
              <MarketsSearchBarValues values={kalshiMarkets} />
            }
          </div>

        </div>
      }
    </div>
  )
}

export default MarketsSearchBarFeature
