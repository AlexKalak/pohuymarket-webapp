'use client'

import MarketChart2 from "@/src/common/components/market/MarketChart2"
import ArbitrageInfo from "@/src/common/components/market/ArbitrageInfo"
import { useParams } from "next/navigation"
import { useArbitragePairQuery } from "@/src/common/api/arbitrage/hooks/useArbitragesQuery"

const ArbitragePage = () => {
  const { arbitragePairID } = useParams<{ arbitragePairID: string, }>()

  console.log(arbitragePairID)
  const { pair, error: arbitrageError, isLoading: arbitrageIsLoading } = useArbitragePairQuery({
    where: {
      id: +arbitragePairID
    }
  })

  if (!pair?.polymarketMarket || !pair.kalshiMarket) {
    return <> </>
  }

  return (
    <div className="flex flex-col items-center gap-10 px-10 py-10">
      <div>
        <ArbitrageInfo pair={pair} />
      </div>
      <div className="w-full">
        <MarketChart2 revert1={pair.revertPolymarket} revert2={false} marketID={pair.polymarketMarket.conditionId} market2ID={pair.kalshiMarketTicker} />
      </div>
    </div>
  )

}

export default ArbitragePage

