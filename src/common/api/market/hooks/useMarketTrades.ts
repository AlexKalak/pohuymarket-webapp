import { KalshiTradeData } from "@/src/entities/market/kalshiTradesModel"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

type TradesResponse = {
  trades: KalshiTradeData[],
  cursor: string
}

export const useKalshiTradesForMarket = (marketTicker: string): {
  trades: KalshiTradeData[] | undefined,
  isLoading: boolean,
  error: string
} => {

  const { data, isLoading, error }: UseQueryResult<TradesResponse, Error> = useQuery({
    queryFn: () => queryKalshiUnloadedMarkets(marketTicker),
    queryKey: ["marketTrades", marketTicker],
    refetchInterval: 10000
  })

  // const markets = useMemo(() => {
  //   if (!data) return undefined
  //
  //   console.log(data)
  //   const markets: KalshiMarketModel[] = []
  //   for (const marketResponse of data.markets) {
  //     try {
  //       const marketModel = kalshiMarketResponseToModel(marketResponse)
  //       markets.push(marketModel)
  //     } catch (e) {
  //       console.log(e)
  //       continue
  //     }
  //   }
  //
  //   return markets
  // }, [data])


  return {
    trades: data?.trades,
    isLoading: isLoading,
    error: error?.message ?? ""
  }

}

async function queryKalshiUnloadedMarkets(ticker: string): Promise<TradesResponse> {
  const res = await fetch(`/kalshi-api/trade-api/v2/markets/trades?limit=1000&ticker=${ticker}`)
  if (!res.ok) {
    throw new Error("Unable to fetch kalshi trades for market" + ticker)
  }

  return res.json() as Promise<TradesResponse>
}


