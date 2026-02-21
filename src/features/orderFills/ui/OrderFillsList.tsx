'use client'

import { useMemo } from "react"
import { useArbitragePairQuery } from "@/src/common/api/arbitrage/hooks/useArbitragesQuery"
import { useMarketByIdentificatorQuery } from "@/src/common/api/market/hooks/useMarketsQuery"
import { useOrderFillsForArbitragePair } from "@/src/common/api/orders/hooks/useOrderFillsForArbitragePair"
import { PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import OrderFillItem from "./OrderFillItem"

type OrderFillsListProps = {
  arbitragePairId: number
  pollInterval?: number
}

const OrderFillsList = ({ arbitragePairId, pollInterval = 5000 }: OrderFillsListProps) => {
  const { pair, isLoading: pairIsLoading, error: pairError } = useArbitragePairQuery({
    where: { id: arbitragePairId }
  })

  const {
    kalshiOrderFills,
    polymarketOrderFills,
    isLoading: fillsIsLoading,
    error: fillsError
  } = useOrderFillsForArbitragePair({
    pair,
    pollInterval
  })

  console.log("Pair: ", pair)

  const polymarketYesAssetId = pair?.polymarketMarket?.yesAssetId ?? ""

  const stats = useMemo(() => {
    // Kalshi positions by side
    let kalshiYes = 0
    let kalshiNo = 0
    kalshiOrderFills.forEach(fill => {
      const amount = fill.action === "BUY" ? fill.contractsAmount : -fill.contractsAmount
      if (fill.side === "yes") {
        kalshiYes += amount
      } else {
        kalshiNo += amount
      }
    })

    // Polymarket positions by side (using assetId comparison)
    let polymarketYes = 0
    let polymarketNo = 0
    polymarketOrderFills.forEach(fill => {
      const amount = fill.action === "BUY" ? fill.contractsAmount : -fill.contractsAmount
      if (fill.assetId === polymarketYesAssetId) {
        polymarketYes += amount
      } else {
        polymarketNo += amount
      }
    })

    // Total contracts for arbitrage calculation
    const kalshiContracts = kalshiOrderFills.reduce((acc, fill) => acc + fill.contractsAmount, 0)
    const polymarketContracts = polymarketOrderFills.reduce((acc, fill) => acc + fill.contractsAmount, 0)

    const kalshiAvgPrice = kalshiContracts > 0
      ? kalshiOrderFills.reduce((acc, fill) => acc + fill.price * fill.contractsAmount, 0) / kalshiContracts
      : 0
    const polymarketAvgPrice = polymarketContracts > 0
      ? polymarketOrderFills.reduce((acc, fill) => acc + fill.price * fill.contractsAmount, 0) / polymarketContracts
      : 0

    const matchedContracts = Math.min(kalshiContracts, polymarketContracts)
    const arbitrageProfit = matchedContracts * (1 - kalshiAvgPrice - polymarketAvgPrice)
    const unmatchedContracts = Math.abs(kalshiContracts - polymarketContracts)
    const averagePercent = (kalshiAvgPrice + polymarketAvgPrice) * 100

    return {
      arbitrageProfit,
      kalshiContracts,
      polymarketContracts,
      unmatchedContracts,
      kalshiYes,
      kalshiNo,
      polymarketYes,
      polymarketNo,
      averagePercent
    }
  }, [kalshiOrderFills, polymarketOrderFills, polymarketYesAssetId])

  if (pairIsLoading) {
    return <div className="text-center py-10">Loading arbitrage pair...</div>
  }

  if (pairError) {
    return <div className="text-center py-10 text-red-400">Error: {pairError}</div>
  }

  if (!pair) {
    return <div className="text-center py-10">Arbitrage pair not found</div>
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Order Fills for Arbitrage Pair #{pair.id}</h1>
        <p className="text-gray-400">
          {pair.kalshiMarket?.GetQuestion() ?? pair.kalshiMarketTicker}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <span className="text-gray-400">Arbitrage Profit: </span>
            <span className={stats.arbitrageProfit >= 0 ? "text-green-400" : "text-red-400"}>
              ${stats.arbitrageProfit.toFixed(2)}
            </span>
          </div>
          <div className="text-center">
            <span className="text-gray-400">Avg (Kalshi+Poly): </span>
            <span className={stats.averagePercent < 100 ? "text-green-400" : "text-red-400"}>
              {stats.averagePercent.toFixed(1)}¢
            </span>
          </div>
          <div className="text-center">
            <span className="text-gray-400">Unmatched Contracts: </span>
            <span className={stats.unmatchedContracts === 0 ? "text-green-400" : "text-yellow-400"}>
              {stats.unmatchedContracts} ({stats.kalshiContracts > stats.polymarketContracts ? "Kalshi" : stats.kalshiContracts < stats.polymarketContracts ? "Polymarket" : "Balanced"})
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <span className="text-blue-400">Kalshi: </span>
            <span className="text-green-400">YES {stats.kalshiYes}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-red-400">NO {stats.kalshiNo}</span>
          </div>
          <div className="text-center">
            <span className="text-purple-400">Polymarket: </span>
            <span className="text-green-400">YES {stats.polymarketYes}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-red-400">NO {stats.polymarketNo}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-blue-400">
            Kalshi Order Fills ({kalshiOrderFills.length})
          </h2>
          {fillsIsLoading && kalshiOrderFills.length === 0 ? (
            <div className="text-gray-400">Loading...</div>
          ) : kalshiOrderFills.length === 0 ? (
            <div className="text-gray-400">No order fills</div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
              {kalshiOrderFills.map((fill) => (
                <OrderFillItem key={fill.id} orderFill={fill} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-purple-400">
            Polymarket Order Fills ({polymarketOrderFills.length})
          </h2>
          {fillsIsLoading && polymarketOrderFills.length === 0 ? (
            <div className="text-gray-400">Loading...</div>
          ) : polymarketOrderFills.length === 0 ? (
            <div className="text-gray-400">No order fills</div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
              {polymarketOrderFills.map((fill) => (
                <OrderFillItem key={fill.id} orderFill={fill} yesAssetId={polymarketYesAssetId} />
              ))}
            </div>
          )}
        </div>
      </div>

      {fillsError && (
        <div className="text-center text-red-400">
          Error loading order fills: {fillsError}
        </div>
      )}
    </div>
  )
}

export default OrderFillsList
