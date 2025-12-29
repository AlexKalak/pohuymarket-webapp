
import LineChart from "@/src/common/components/chart/LineSeriesChart"

import { useMemo, useState } from "react"
import { useBidAskUpdateSubscription } from "../../api/market/hooks/useBestBidAskUpdatesSubscription"
import { Point } from "../chart/LineSeriesChart"
import { PointsAndLastPoint, pointsFromBidAskUpdates } from "./core/candlesFromTrades"
import { useMarketByIdentificatorQuery, useMarketsQuery } from "../../api/market/hooks/useMarketsQuery"

type MarketChartProps = {
  revert1: boolean
  revert2: boolean
  marketID: string
  market2ID: string
}
const MarketChart2 = ({ revert1, revert2, marketID, market2ID }: MarketChartProps) => {

  const { bidAskUpdates, error, isLoading } = useBidAskUpdateSubscription(marketID, 30000)
  const { bidAskUpdates: bidAskUpdates2, error: error2, isLoading: isLoading2 } = useBidAskUpdateSubscription(market2ID, 30000)

  const [showBid1, setShowBid1] = useState<boolean>(true)
  const [showAsk1, setShowAsk1] = useState<boolean>(true)
  const [showBid2, setShowBid2] = useState<boolean>(true)
  const [showAsk2, setShowAsk2] = useState<boolean>(true)

  const { bid: bid1, ask: ask1, lastBidSize: lastBidSize1, lastAskSize: lastAskSize1 } =
    useMemo<{ bid: PointsAndLastPoint, ask: PointsAndLastPoint, lastBidSize: number, lastAskSize: number }>(
      () => {
        const bidAskPoints = pointsFromBidAskUpdates(bidAskUpdates, revert1)
        return bidAskPoints
      }, [bidAskUpdates, revert1])

  const { bid: bid2, ask: ask2, lastBidSize: lastBidSize2, lastAskSize: lastAskSize2 } =
    useMemo<{ bid: PointsAndLastPoint, ask: PointsAndLastPoint, lastBidSize: number, lastAskSize: number }>(
      () => {
        const bidAskPoints = pointsFromBidAskUpdates(bidAskUpdates2, revert2)
        return bidAskPoints
      }, [bidAskUpdates2, revert2])

  return <div className="flex flex-col items-center gap-10">
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span>bid1</span>
        {lastBidSize1}
      </div>
      <div className="flex flex-col items-center">
        <span>ask1</span>
        {lastAskSize1}
      </div>
      <div className="flex flex-col items-center">
        <span>bid2</span>
        {lastBidSize2}
      </div>
      <div className="flex flex-col items-center">
        <span>ask2</span>
        {lastAskSize2}
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex flex-col">
        <input
          type="checkbox"
          checked={showBid1}
          onChange={() => setShowBid1(prev => !prev)}
        ></input>
        <div>bid1</div>
      </div>
      <div className="flex flex-col">
        <input
          type="checkbox"
          checked={showAsk1}
          onChange={() => setShowAsk1(prev => !prev)}
        ></input>
        <div>ask1</div>
      </div>
      <div className="flex flex-col">
        <input
          type="checkbox"
          checked={showBid2}
          onChange={() => setShowBid2(prev => !prev)}
        ></input>
        <div>bid2</div>
      </div>
      <div className="flex flex-col">
        <input
          type="checkbox"
          checked={showAsk2}
          onChange={() => setShowAsk2(prev => !prev)}
        ></input>
        <div>ask2</div>
      </div>
    </div>
    <div className="px-2 py-2 w-full border border-white rounded-xl overflow-hidden">
      <LineChart
        pointsOfLines={
          [
            {
              points: bid1.points,
              name: "bids1",
              color: "green",
              show: showBid1,
            },
            {
              points: ask1.points,
              name: "asks1",
              color: "red",
              show: showAsk1
            },
            {
              points: bid2.points,
              name: "bids2",
              color: "blue",
              show: showBid2
            },
            {
              points: ask2.points,
              name: "asks2",
              color: "orange",
              show: showAsk2
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
