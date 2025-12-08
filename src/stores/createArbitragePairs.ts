
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import { create } from "zustand"

type CreateArbitragePairState = {
  polymarketMarket: PolymarketMarketModel | null
  kalshiMarket: KalshiMarketModel | null

  setPolymarketMarket: (market: PolymarketMarketModel | null) => void
  setKalshiMarket: (market: KalshiMarketModel | null) => void
}

export const useCreateAritragePairState = create<CreateArbitragePairState>((set) => ({
  polymarketMarket: null,
  kalshiMarket: null,

  setPolymarketMarket: (market) => set(
    () => {
      return {
        polymarketMarket: market,
      }
    }
  ),

  setKalshiMarket: (market) => set(
    () => {
      return {
        kalshiMarket: market,
      }
    }
  ),
}))
