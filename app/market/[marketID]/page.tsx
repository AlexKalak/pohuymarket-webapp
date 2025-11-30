'use client'

import MarketChart from "@/src/features/market/ui/MarketChart"
import { useParams } from "next/navigation"

const Market = () => {
  const { marketID } = useParams<{ marketID: string }>()
  return (
    <div>
      {
        //FIX: chainId
      }
      <MarketChart marketID={marketID} />
    </div>
  )

}

export default Market

