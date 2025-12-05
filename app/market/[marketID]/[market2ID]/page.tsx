'use client'

import MarketChart from "@/src/common/components/market/MarketChart"
import MarketChart2 from "@/src/common/components/market/MarketChart2"
import { useParams } from "next/navigation"

const Market2 = () => {
  const { marketID, market2ID } = useParams<{ marketID: string, market2ID: string }>()

  return (
    <div>
      {
        //FIX: chainId
      }
      <div>
        <MarketChart2 marketID={marketID} market2ID={market2ID} />
      </div>
    </div>
  )

}

export default Market2

