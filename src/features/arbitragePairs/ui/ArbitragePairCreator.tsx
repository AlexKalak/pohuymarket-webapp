'use client'
import { useCreateArbitragePairsMutation } from "@/src/common/api/arbitrage/hooks/useCreateArbitrageMutation"
import { useLoadEventsMutation } from "@/src/common/api/events/hooks/useLoadEventsMutation"
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { MarketType } from "@/src/entities/market/market.interface"
import { PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import { PredictFunMarketData, PredictFunMarketModel } from "@/src/entities/market/predictFunMarket"
import { useCreateAritragePairState } from "@/src/stores/createArbitragePairs"
import { useEffect, useState } from "react"

const getEventIdentificatorFromMarket = (market: PolymarketMarketModel | KalshiMarketModel | PredictFunMarketModel): {} => {
  switch (market.GetMarketType()) {
    case MarketType.Polymarket:
      return {
        slug: (market as PolymarketMarketModel).event_slug
      }
    case MarketType.Kalshi:
      return {
        ticker: (market as KalshiMarketModel).event_ticker
      }
    case MarketType.PredictFun:
      return {
        id: (market as PredictFunMarketModel).event_id
      }
  }

}

const ArbitragePairCreator = () => {
  const market1 = useCreateAritragePairState(s => s.market1)
  const market2 = useCreateAritragePairState(s => s.market2)

  const setMarket1 = useCreateAritragePairState(s => s.setMarket1)
  const setMarket2 = useCreateAritragePairState(s => s.setMarket2)

  const [revertPolymarket, setRevertPolymarket] = useState<boolean>(false)
  const [revertKalshi, setRevertKalshi] = useState<boolean>(false)

  const deletePolymarketMarket = () => setMarket1(null)
  const deleteKalshiMarket = () => setMarket2(null)
  const [loadEvents, setLoadEvents] = useState<boolean>(false)

  const [createArbitragePair, { pairs, isLoading, error }] = useCreateArbitragePairsMutation()
  const [loadEventsMutation, { ok, isLoading: loadEventsIsLoading, error: loadEventsError }] = useLoadEventsMutation()
  console.log(pairs)

  useEffect(() => {
    if (error) {
      console.log("error: ", error)
    }
  }, [error])

  useEffect(() => {
    if (pairs) {
      setMarket1(null)
      setMarket2(null)
    }
  }, [pairs])

  const handleLoadEventsButtonClick = () => {
    if (!market1 || !market2) {
      return
    }

    console.log("market1: ", market1)
    console.log("market2: ", market2)

    loadEventsMutation({
      variables: {
        events: [
          {
            type: market1.GetMarketType(),
            ...getEventIdentificatorFromMarket(market1)
          },
          {
            type: market2.GetMarketType(),
            ...getEventIdentificatorFromMarket(market2)
          }
        ]
      }
    })
  }

  const handleButtonClick = () => {
    if (!market1 || !market2) {
      return
    }

    createArbitragePair(
      {
        variables: {
          pairs: [
            {
              marketIdentificator1: market1.GetIdentificator(),
              marketIdentificator2: market2.GetIdentificator(),
              marketType1: market1.GetMarketType(),
              marketType2: market2.GetMarketType(),
            }
          ]
        }
      }
    )
  }

  if (!market1 && !market2) {
    return <></>
  }

  return (
    <div className="fixed bg-black border border-white h-fit rounded-xl py-5 px-10 mx-auto mb-2"
      style={{
        width: "90%",
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div className="w-full flex gap-5">
        {market1 &&
          <div className="flex flex-col border border-white rounded-xl px-2 py-1">
            <div>Market1</div>
            <div className="flex gap-1">
              <span>Revert</span>
              <input type="checkbox" onChange={() => setRevertPolymarket(prev => !prev)} checked={revertPolymarket} />
            </div>
            <div>{market1.GetIdentificator()}</div>
            <div>{market1.GetQuestion()}</div>
            <button onClick={deletePolymarketMarket} className="cursor-pointer bg-red-600">-</button>
          </div>
        }
        {market2 &&
          <div className="flex flex-col border border-white rounded-xl px-2 py-1">
            <div>Market2</div>
            {/* <div className="flex gap-1"> */}
            {/* <span>Revert</span> */}
            {/* <input type="checkbox" onChange={() => setRevertKalshi(prev => !prev)} checked={revertKalshi} /> */}
            {/* </div> */}
            <div>{market2.GetIdentificator()}</div>
            <div>{market2.GetQuestion()}</div>
            <button onClick={deleteKalshiMarket} className="cursor-pointer bg-red-600">-</button>
          </div>
        }
        {(market1 && market2) &&
          <button
            onClick={handleButtonClick}
            className="bg-white text-black rounded-xl cursor-pointer px-4 py-2"
          >
            +Create new pair
          </button>
        }
        {(market1 && market2) &&
          <button
            onClick={handleLoadEventsButtonClick}
            className="bg-white text-black rounded-xl cursor-pointer px-4 py-2"
          >
            LoadEvents
          </button>
        }
        {
          (error || loadEventsError) && <div className="flex flex-col">
            <div>Error: {error}</div>
            <div>Load Events Error: {loadEventsError}</div>
          </div>
        }
      </div>
    </div>
  )

}

export default ArbitragePairCreator
