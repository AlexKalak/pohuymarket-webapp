
import LineChart from "@/src/common/components/chart/LineSeriesChart"

import { useMemo, useState } from "react"
import { useBidAskUpdateSubscription } from "../../api/market/hooks/useBestBidAskUpdatesSubscription"
import { Point } from "../chart/LineSeriesChart"
import { PointsAndLastPoint, pointsFromBidAskUpdates } from "./core/candlesFromTrades"

type MarketChartProps = {
  marketID: string
}
const MarketChart = ({ marketID }: MarketChartProps) => {

  const { bidAskUpdates, error, isLoading } = useBidAskUpdateSubscription(marketID)

  const { bid, ask } = useMemo<{ bid: PointsAndLastPoint, ask: PointsAndLastPoint }>(
    () => {
      const bidAskPoints = pointsFromBidAskUpdates(bidAskUpdates)
      return bidAskPoints
    }, [bidAskUpdates])

  return <div className="flex gap-10 mx-10 my-10">
    <div>{marketID}</div>
    <div className="w-full border border-white rounded-xl overflow-hidden">
      <LineChart
        pointsOfLines={
          [
            {
              points: bid.points,
              name: "bids",
              color: "green",
            },
            {
              points: ask.points,
              name: "asks",
              color: "red",
            }
          ]
        }
        lastPointOfLines={
          [
            {
              point: bid.lastPoint,
              name: "bids"
            },
            {
              point: ask.lastPoint,
              name: "asks"
            }
          ]
        }
      />
    </div>
  </div>

}

export default MarketChart
