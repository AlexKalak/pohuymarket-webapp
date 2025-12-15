import { KalshiEventModel } from "@/src/entities/event/kalshiEventModel"
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo, useState } from "react"
import { KalshiEventResponse, KalshiMarketResponse, kalshiMarketResponseToModel } from "./kalshiEventResponses";
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket";

export const useKalshiUnloadedMarkets = (maxCloseTimeSeconds: number): {
  markets: KalshiMarketModel[] | undefined,
  isLoading: boolean,
  error: string
} => {

  const { data, isLoading, error }: UseQueryResult<{ markets: KalshiMarketResponse[] }, Error> = useQuery({
    queryFn: () => queryKalshiUnloadedMarkets(maxCloseTimeSeconds),
    queryKey: ["unloaded_events", maxCloseTimeSeconds]
  })

  const markets = useMemo(() => {
    if (!data) return undefined

    console.log(data)
    const markets: KalshiMarketModel[] = []
    for (const marketResponse of data.markets) {
      try {
        const marketModel = kalshiMarketResponseToModel(marketResponse)
        markets.push(marketModel)
      } catch (e) {
        console.log(e)
        continue
      }
    }

    return markets
  }, [data])


  return {
    markets: markets,
    isLoading: isLoading,
    error: error?.message ?? ""
  }

}

async function queryKalshiUnloadedMarkets(maxCloseTimeSeconds: number): Promise<{ markets: KalshiMarketResponse[] }> {
  const res = await fetch(`/kalshi-api/trade-api/v2/markets?limit=100&min_created_ts=${maxCloseTimeSeconds}`)
  if (!res.ok) {
    throw new Error("Unable to fetch kalshi markets")
  }

  return res.json() as Promise<{ markets: KalshiMarketResponse[] }>
}
