'use client'

import AssetChart from "@/src/common/components/market/AssetChart"
import { useParams } from "next/navigation"

const AssetPage = () => {
  const { assetID } = useParams<{ assetID: string }>()
  return (
    <div>
      {
        //FIX: chainId
      }
      <AssetChart assetID={assetID} />
    </div>
  )

}

export default AssetPage



