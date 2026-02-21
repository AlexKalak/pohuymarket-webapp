import { ArbitragePairModel } from "@/src/entities/arbitrage/arbitragePairsModel"
import { KalshiOrderFillModel } from "@/src/entities/orderFill/kalshiOrderFillModel"
import { PolymarketOrderFillModel } from "@/src/entities/orderFill/polymarketOrderFillModel"
import { useOrderFillsForMarket } from "./useMarketsQuery"

type UseOrderFillsForArbitragePairProps = {
  pair: ArbitragePairModel | undefined
  pollInterval?: number
}

type UseOrderFillsForArbitragePairResult = {
  kalshiOrderFills: KalshiOrderFillModel[]
  polymarketOrderFills: PolymarketOrderFillModel[]
  isLoading: boolean
  error: string | null
}

export const useOrderFillsForArbitragePair = ({ pair, pollInterval }: UseOrderFillsForArbitragePairProps): UseOrderFillsForArbitragePairResult => {
  const kalshiMarketIdentificator = pair?.kalshiMarketTicker ?? ""
  const polymarketMarketIdentificator = pair?.polymarketMarket?.conditionId ?? ""

  const {
    orderFills: kalshiOrderFills,
    isLoading: kalshiIsLoading,
    error: kalshiError
  } = useOrderFillsForMarket({
    marketIdentificator: kalshiMarketIdentificator,
    pollInterval
  })

  const {
    orderFills: polymarketOrderFills,
    isLoading: polymarketIsLoading,
    error: polymarketError
  } = useOrderFillsForMarket({
    marketIdentificator: polymarketMarketIdentificator,
    pollInterval
  })

  return {
    kalshiOrderFills: kalshiOrderFills as KalshiOrderFillModel[],
    polymarketOrderFills: polymarketOrderFills as PolymarketOrderFillModel[],
    isLoading: kalshiIsLoading || polymarketIsLoading,
    error: kalshiError || polymarketError
  }
}
