'use client'
import { useCreateArbitragePairsMutation } from "@/src/common/api/arbitrage/hooks/useCreateArbitrageMutation"
import { useCreateAritragePairState } from "@/src/stores/createArbitragePairs"
import { useEffect, useState } from "react"

const ArbitragePairCreator = () => {
  const polymarketMarket = useCreateAritragePairState(s => s.polymarketMarket)
  const kalshiMarket = useCreateAritragePairState(s => s.kalshiMarket)

  const setPolymarketMarket = useCreateAritragePairState(s => s.setPolymarketMarket)
  const setKalshiMarket = useCreateAritragePairState(s => s.setKalshiMarket)
  const [revertPolymarket, setRevertPolymarket] = useState<boolean>(false)
  const [revertKalshi, setRevertKalshi] = useState<boolean>(false)

  const deletePolymarketMarket = () => setPolymarketMarket(null)
  const deleteKalshiMarket = () => setKalshiMarket(null)

  const [createArbitragePair, { pairs, isLoading, error }] = useCreateArbitragePairsMutation()
  console.log(pairs)

  useEffect(() => {
    if (error) {
      console.log("error: ", error)
    }
  }, [error, setKalshiMarket, setPolymarketMarket])

  useEffect(() => {
    if (pairs) {
      setPolymarketMarket(null)
      setKalshiMarket(null)
    }
  }, [pairs])

  const handleButtonClick = () => {
    if (!polymarketMarket || !kalshiMarket) {
      return
    }

    createArbitragePair(
      {
        variables: {
          pairs: [
            {
              revertPolymarket: revertPolymarket,
              polymarketMarketID: polymarketMarket.id,
              kalshiMarketTicker: kalshiMarket.ticker,
            }
          ]
        }
      }
    )
  }

  if (!polymarketMarket && !kalshiMarket) {
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
        {polymarketMarket &&
          <div className="flex flex-col border border-white rounded-xl px-2 py-1">
            <div>Polymarket</div>
            <div className="flex gap-1">
              <span>Revert</span>
              <input type="checkbox" onChange={() => setRevertPolymarket(prev => !prev)} checked={revertPolymarket} />
            </div>
            <div>{polymarketMarket.id}</div>
            <div>{polymarketMarket.GetQuestion()}</div>
            <button onClick={deletePolymarketMarket} className="cursor-pointer bg-red-600">-</button>
          </div>
        }
        {kalshiMarket &&
          <div className="flex flex-col border border-white rounded-xl px-2 py-1">
            <div>Kalshi</div>
            {/* <div className="flex gap-1"> */}
            {/* <span>Revert</span> */}
            {/* <input type="checkbox" onChange={() => setRevertKalshi(prev => !prev)} checked={revertKalshi} /> */}
            {/* </div> */}
            <div>{kalshiMarket.ticker}</div>
            <div>{kalshiMarket.GetQuestion()}</div>
            <button onClick={deleteKalshiMarket} className="cursor-pointer bg-red-600">-</button>
          </div>
        }
        {(polymarketMarket && kalshiMarket) &&
          <button
            onClick={handleButtonClick}
            className="bg-white text-black rounded-xl cursor-pointer px-4 py-2"
          >
            +Create new pair
          </button>
        }
      </div>
    </div>
  )

}

export default ArbitragePairCreator
