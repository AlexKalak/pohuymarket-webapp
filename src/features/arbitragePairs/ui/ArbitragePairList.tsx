'use client'

import { useArbitragePairsQuery } from "@/src/common/api/arbitrage/hooks/useArbitragesQuery"
import ArbitragePair from "./ArbitragePair"

const ArbitragePairList = () => {
  const { pairs, isLoading, error } = useArbitragePairsQuery({})
  console.log("PAIRS: ", pairs)

  return (
    <div className="flex flex-col items-center gap-6 pb-10 ">
      <div className="text-center text-2xl">Existing arb pairs</div>
      {pairs &&
        pairs.map(pair => <ArbitragePair key={pair.id} pair={pair} />)}
    </div>
  )
}

export default ArbitragePairList
