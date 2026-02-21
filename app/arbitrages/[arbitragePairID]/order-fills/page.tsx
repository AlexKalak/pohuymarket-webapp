'use client'

import Header from "@/src/features/header/ui/Header"
import OrderFillsList from "@/src/features/orderFills/ui/OrderFillsList"
import { useParams } from "next/navigation"

const OrderFillsPage = () => {
  const { arbitragePairID } = useParams<{ arbitragePairID: string }>()

  const pairId = Number(arbitragePairID)

  if (isNaN(pairId)) {
    return (
      <>
        <Header />
        <main className="px-10 py-10">
          <div className="text-center text-red-400">Invalid arbitrage pair ID</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="px-10 py-10">
        <OrderFillsList arbitragePairId={pairId} />
      </main>
    </>
  )
}

export default OrderFillsPage
