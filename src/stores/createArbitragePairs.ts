
import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"
import { PolymarketMarketModel } from "@/src/entities/market/polymarketMarket"
import { create } from "zustand"
import { PredictFunMarketModel } from "../entities/market/predictFunMarket"

type CreateArbitragePairState = {
  market1: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null
  market2: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null

  setMarket1: (market: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null) => void
  setMarket2: (market: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null) => void
}

export const useCreateAritragePairState = create<CreateArbitragePairState>((set) => ({
  market1: null,
  market2: null,
  setMarket1: (market: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null) => set(() => ({
    market1: market,
  })),
  setMarket2: (market: KalshiMarketModel | PredictFunMarketModel | PolymarketMarketModel | null) => set(() => ({
    market2: market,
  })),
}))
