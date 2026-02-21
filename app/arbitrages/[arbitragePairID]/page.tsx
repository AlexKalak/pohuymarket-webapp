'use client'

import MarketChart2 from "@/src/common/components/market/MarketChart2"
import ArbitrageInfo from "@/src/common/components/market/ArbitrageInfo"
import { useParams } from "next/navigation"
import { useArbitragePairQuery } from "@/src/common/api/arbitrage/hooks/useArbitragesQuery"
import { marketTypeFromString } from "@/src/entities/market/market.interface"

const ArbitragePage = () => {
  const { arbitragePairID } = useParams<{ arbitragePairID: string, }>()

  console.log(arbitragePairID)
  const { pair, error: arbitrageError, isLoading: arbitrageIsLoading } = useArbitragePairQuery({
    where: {
      id: +arbitragePairID
    }
  })

  if (!pair) {
    return <></>
  }

  const marketType1 = marketTypeFromString(pair.marketType1)
  const marketType2 = marketTypeFromString(pair.marketType2)

  if (!pair?.marketIdentificator1 || !pair.marketIdentificator2 || !marketType1 || !marketType2) {
    return <> </>
  }

  return (
    <div className="flex flex-col items-center gap-10 px-10 py-10">
      <div>
        <ArbitrageInfo pair={pair} />
      </div>
      <div className="w-full">
        <MarketChart2 marketType1={marketType1} marketType2={marketType2} marketIdentificator1={pair.marketIdentificator1} marketIdentificator2={pair.marketIdentificator2} />
      </div>
    </div>
  )

}

export default ArbitragePage

