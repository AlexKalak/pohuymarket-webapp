'use client'

import { useArbitragePairsQuery } from "@/src/common/api/arbitrage/hooks/useArbitragesQuery"
import ArbitragePair from "./ArbitragePair"

const ArbitragePairList = () => {
  const { pairs, isLoading, error } = useArbitragePairsQuery({})
  console.log("PAIRS: ", pairs)

  return (
    <div>
      <div className="text-center text-2xl mb-3">Existing arb pairs</div>
      {pairs &&
        pairs.map(pair => <ArbitragePair key={pair.id} pair={pair} />)}
    </div>
  )
}

export default ArbitragePairList
