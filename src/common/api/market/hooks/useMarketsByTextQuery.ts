import { KalshiMarketData, KalshiMarketModel } from "@/src/entities/market/kalshiMarket";
import { MarketType, MarketWhere } from "@/src/entities/market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "@/src/entities/market/polymarketMarket";
import GET_MARKETS_BY_TEXT from "../gql/MARKETS_BY_TEXT.gql"
import { useQuery } from "@apollo/client/react";


type MarketsByTextResponse = {
  marketsByText: {
    polymarket: PolymarketMarketData[],
    kalshi: KalshiMarketData[]
  }
}

type UseMarketsByTextProps = {
  first?: number,
  skip?: number,
  text: string,
  pollInterval?: number
}

export const useMarketsByTextQuery = ({ first = 1000, skip = 0, text, pollInterval }: UseMarketsByTextProps): {
  kalshiMarkets: KalshiMarketModel[],
  polymarketMarkets: PolymarketMarketModel[]
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<MarketsByTextResponse>(GET_MARKETS_BY_TEXT, {
    variables: {
      text: text,
      first,
      skip,
    },
    pollInterval,
    fetchPolicy: "cache-and-network",
  })

  const marketsByText = data?.marketsByText
  if (!marketsByText?.kalshi && !marketsByText?.polymarket) {
    return {
      polymarketMarkets: [],
      kalshiMarkets: [],
      isLoading: loading,
      error: error?.message ?? null,
    }
  }

  const polymarketMarkets: PolymarketMarketModel[] = []
  for (const marketData of marketsByText?.polymarket) {
    try {
      const marketModel = new PolymarketMarketModel(marketData)
      polymarketMarkets.push(marketModel)
    } catch {
      continue
    }
  }

  const kalshiMarkets: KalshiMarketModel[] = []
  for (const marketData of marketsByText?.kalshi) {
    try {
      const marketModel = new KalshiMarketModel(marketData)
      kalshiMarkets.push(marketModel)
    } catch {
      continue
    }
  }

  return {
    polymarketMarkets,
    kalshiMarkets,
    isLoading: loading,
    error: error?.message ?? null
  }
}
