import Chart from "@/src/common/components/chart/Chart"
import { CandleModel } from "@/src/entities/candle/candle"
import { useMemo, useState } from "react"
import { useTradesQuery } from "@/src/common/api/market/hooks/getOrdersMatchesForMarketQuery"
import { tradesToCandles, tradesToCandlesStupid } from "@/src/common/components/market/core/candlesFromTrades"
import { MarketModel } from "@/src/entities/market/market"

type MarketChartProps = {
  market: MarketModel
}
const MarketChart = ({ market }: MarketChartProps) => {

  const { trades: yesTrades, isLoading: isLoadingYes, error: errorYes } = useTradesQuery({ assetID: market.yesAssetId })
  const { trades: noTrades, isLoading: isLoadingNo, error: errorNo } = useTradesQuery({ assetID: market.noAssetId })

  const [timeSpacing, setTimeSpacing] = useState<number>(2)

  const { candles: yesCandles, updatingCandle: yesUpdatingCandle } = useMemo<{ candles: CandleModel[], updatingCandle: CandleModel | null }>(
    () => {
      if (!yesTrades) return { candles: [], updatingCandle: null }
      const trades = yesTrades

      const tradesAscending = trades
      tradesAscending.reverse()
      console.log("Trades: ", trades)

      return tradesToCandles(trades, timeSpacing)

    }, [yesTrades, timeSpacing])

  const { candles: noCandles, updatingCandle: noUpdatingCandle } = useMemo<{ candles: CandleModel[], updatingCandle: CandleModel | null }>(
    () => {
      if (!noTrades) return { candles: [], updatingCandle: null }
      const trades = noTrades

      const tradesAscending = trades
      tradesAscending.reverse()
      console.log("Trades: ", trades)

      return tradesToCandles(trades, timeSpacing)

    }, [noTrades, timeSpacing])

  console.log("Candles YES: ", yesCandles)
  console.log("Candles NO: ", noCandles)

  return <div className="flex gap-10 mx-10 my-10 ">
    <div>{market.question}</div>
    <div className="w-full border border-white rounded-xl overflow-hidden">
      <Chart candlesArrays={[yesCandles, noCandles]} updatingCandle={yesUpdatingCandle} />
    </div>
    {/* <div className="w-full border border-white rounded-xl overflow-hidden"> */}
    {/*   <Chart candles={noCandles} updatingCandle={noUpdatingCandle} /> */}
    {/* </div> */}
  </div>

}

export default MarketChart

