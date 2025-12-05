
import LineChart from "@/src/common/components/chart/LineSeriesChart"

import { useMemo, useState } from "react"
import { useBidAskUpdateSubscription } from "../../api/market/hooks/useBestBidAskUpdatesSubscription"
import { Point } from "../chart/LineSeriesChart"
import { PointsAndLastPoint, pointsFromBidAskUpdates } from "./core/candlesFromTrades"

type MarketChartProps = {
  marketID: string
  market2ID: string
}
const MarketChart2 = ({ marketID, market2ID }: MarketChartProps) => {

  const { bidAskUpdates, error, isLoading } = useBidAskUpdateSubscription(marketID)
  const { bidAskUpdates: bidAskUpdates2, error: error2, isLoading: isLoading2 } = useBidAskUpdateSubscription(market2ID)

  const { bid: bid1, ask: ask1 } = useMemo<{ bid: PointsAndLastPoint, ask: PointsAndLastPoint }>(
    () => {
      const bidAskPoints = pointsFromBidAskUpdates(bidAskUpdates)
      return bidAskPoints
    }, [bidAskUpdates])

  const { bid: bid2, ask: ask2 } = useMemo<{ bid: PointsAndLastPoint, ask: PointsAndLastPoint }>(
    () => {
      const bidAskPoints = pointsFromBidAskUpdates(bidAskUpdates2)
      return bidAskPoints
    }, [bidAskUpdates2])

  return <div className="flex gap-10 mx-10 my-10">
    <div>{marketID}</div>
    <div className="w-full border border-white rounded-xl overflow-hidden">
      <LineChart
        pointsOfLines={
          [
            {
              points: bid1.points,
              name: "bids1",
              color: "green",
            },
            {
              points: ask1.points,
              name: "asks1",
              color: "red",
            },
            {
              points: bid2.points,
              name: "bids2",
              color: "blue",
            },
            {
              points: ask2.points,
              name: "asks2",
              color: "orange",
            },
          ]
        }
        lastPointOfLines={
          [
            {
              point: bid1.lastPoint,
              name: "bids1",
            },
            {
              point: ask1.lastPoint,
              name: "asks1",
            },
            {
              point: bid2.lastPoint,
              name: "bids2",
            },
            {
              point: ask2.lastPoint,
              name: "asks2",
            },
          ]
        }
      />
    </div>
  </div>

}

export default MarketChart2
