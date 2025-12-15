import { KalshiMarketData, KalshiMarketModel } from "@/src/entities/market/kalshiMarket";
import { IMarket, MarketType, MarketWhere } from "@/src/entities/market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "@/src/entities/market/polymarketMarket";
import GET_MARKETS from "../gql/MARKETS_QUERY.gql"
import GET_MARKET_BY_ID_QUERY from "../gql/MARKET_BY_ID_QUERY.gql"
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";


type MarketsResponse = {
  markets: (PolymarketMarketData | KalshiMarketData)[]
}
type MarketsByIdentificatorResponse = {
  marketByIdentificator: (PolymarketMarketData | KalshiMarketData)
}

type UseMarketsProps = {
  first?: number,
  skip?: number,
  where?: MarketWhere,
  pollInterval?: number
}

type UseMarketByIdentificatorProps = {
  identificator: string,
  pollInterval?: number
}

export const useMarketByIdentificatorQuery = ({ identificator, pollInterval }: UseMarketByIdentificatorProps): {
  market: IMarket | undefined,
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<MarketsByIdentificatorResponse>(GET_MARKET_BY_ID_QUERY, {
    variables: {
      identificator
    },
    pollInterval,
    skip: !identificator
  })

  const market = useMemo(() => {
    if (!data?.marketByIdentificator) {
      return undefined
    }

    switch (data?.marketByIdentificator.type) {
      case (MarketType.Polymarket): {
        return new PolymarketMarketModel(data?.marketByIdentificator as PolymarketMarketData)
      }
      case (MarketType.Kalshi): {
        return new KalshiMarketModel(data?.marketByIdentificator as KalshiMarketData)
      }
      default:
        throw new Error("Unable to parse market type")
    }
  }, [data])

  return {
    market: market,
    isLoading: loading,
    error: error?.message ?? null
  }
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
          const marketModel = new PolymarketMarketModel(marketData as PolymarketMarketData)
          markets.push(marketModel)
          break;
        }
        case (MarketType.Kalshi): {
          const marketModel = new KalshiMarketModel(marketData as KalshiMarketData)
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
