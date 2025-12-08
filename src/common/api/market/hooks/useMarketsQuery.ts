import { KalshiMarketData, KalshiMarketModel } from "@/src/entities/market/kalshiMarket";
import { MarketType, MarketWhere } from "@/src/entities/market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "@/src/entities/market/polymarketMarket";
import GET_MARKETS from "../gql/MARKETS_QUERY.gql"
import { useQuery } from "@apollo/client/react";


type MarketsResponse = {
  markets: (PolymarketMarketData | KalshiMarketData)[]
}

type UseMarketsProps = {
  first?: number,
  skip?: number,
  where?: MarketWhere,
  pollInterval?: number
}

export const useMarketsQuery = ({ first = 1000, skip = 0, where, pollInterval }: UseMarketsProps): {
  markets: (PolymarketMarketModel | KalshiMarketModel)[],
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<MarketsResponse>(GET_MARKETS, {
    variables: {
      where,
      first,
      skip,
    },
    pollInterval,
  })

  if (!data?.markets) {
    return {
      markets: [],
      isLoading: loading,
      error: error?.message ?? null,
    }
  }

  const markets: (PolymarketMarketModel | KalshiMarketModel)[] = []
  for (const marketData of data?.markets) {
    try {
      switch (marketData.type) {
        case (MarketType.Polymarket): {
          const marketModel = new PolymarketMarketModel(marketData)
          markets.push(marketModel)
          break;
        }
        case (MarketType.Kalshi): {
          const marketModel = new PolymarketMarketModel(marketData)
          markets.push(marketModel)
          break;
        }
        default:
          throw new Error("Unable to parse market type")
      }
    } catch {
      continue
    }
  }

  return {
    markets: markets,
    isLoading: loading,
    error: error?.message ?? null
  }
}
