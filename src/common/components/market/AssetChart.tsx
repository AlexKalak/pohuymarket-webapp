import Chart from "@/src/common/components/chart/Chart"
import { CandleModel } from "@/src/entities/candle/candle"
import { useMemo, useState } from "react"
import { useTradesQuery } from "@/src/common/api/market/hooks/getOrdersMatchesForMarketQuery"
import { tradesToCandles, tradesToCandlesStupid } from "@/src/common/components/market/core/candlesFromTrades"

type AssetChartProps = {
  assetID: string,
}
const AssetChart = ({ assetID }: AssetChartProps) => {

  const { trades, isLoading, error } = useTradesQuery({ assetID: assetID })

  const [timeSpacing, setTimeSpacing] = useState<number>(1)

  const { candles, updatingCandle } = useMemo<{ candles: CandleModel[], updatingCandle: CandleModel | null }>(
    () => {
      if (!trades) return { candles: [], updatingCandle: null }

      const tradesAscending = trades
      tradesAscending.reverse()

      return tradesToCandles(trades, timeSpacing)
    }, [trades, timeSpacing])


  return <div className="flex gap-10 mx-10 my-10 ">
    <div className="w-full border border-white rounded-xl overflow-hidden">
      <Chart candlesArrays={[candles]} updatingCandle={updatingCandle} />
    </div>
  </div>

}

export default AssetChart


