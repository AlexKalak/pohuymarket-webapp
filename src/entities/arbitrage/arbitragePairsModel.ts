import { KalshiMarketData, KalshiMarketModel } from "../market/kalshiMarket";
import { modelFromPolymorphicModelData, PolymorphicMarketData, PolymorphicMarketModel } from "../market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "../market/polymarketMarket";
import { PredictFunMarketData } from "../market/predictFunMarket";

export type ArbitragePairWhere = {
  id?: number;
  polymarketMarketID?: number;
  kalshiMarketTicker?: string;
}

export class ArbitragePairData {
  id?: number;
  createdAt?: Date; // auto-set on INSERT
  updatedAt?: Date; // auto-set on UPDATE
  allowTrading?: boolean
  marketIdentificator1?: string
  marketIdentificator2?: string
  marketType1?: string
  marketType2?: string
  market1?: PolymorphicMarketData
  market2?: PolymorphicMarketData
}

export class ArbitragePairModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  allowTrading: boolean
  marketIdentificator1: string
  marketIdentificator2: string
  marketType1: string
  marketType2: string
  market1?: PolymorphicMarketModel
  market2?: PolymorphicMarketModel

  constructor(data: ArbitragePairData) {
    if (data.id == null) {
      throw new Error("ArbitragePairModel: 'id' is required");
    }
    if (!data.createdAt) {
      throw new Error("ArbitragePairModel: 'createdAt' is required");
    }
    if (!data.updatedAt) {
      throw new Error("ArbitragePairModel: 'updatedAt' is required");
    }
    if (data.marketIdentificator1 == null) {
      throw new Error("ArbitragePairModel: 'marketIdentificator1' is required");
    }
    if (data.marketIdentificator2 == null) {
      throw new Error("ArbitragePairModel: 'marketIdentificator2' is required");
    }
    if (typeof data.allowTrading !== "boolean") {
      throw new Error("ArbitragePairModel: 'allowTrading' is required");
    }
    if (typeof data.marketType1 !== "string") {
      throw new Error("ArbitragePairModel: 'marketType1' is required");
    }
    if (typeof data.marketType2 !== "string") {
      throw new Error("ArbitragePairModel: 'marketType2' is required");
    }

    this.id = data.id;
    this.marketIdentificator1 = data.marketIdentificator1;
    this.marketIdentificator2 = data.marketIdentificator2;
    this.marketType1 = data.marketType1;
    this.marketType2 = data.marketType2;
    this.allowTrading = data.allowTrading

    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);

    if (isNaN(this.createdAt.getTime()) || isNaN(this.updatedAt.getTime())) {
      throw new Error("ArbitragePairModel: invalid createdAt or updatedAt");
    }

    if (data.market1) {
      this.market1 = modelFromPolymorphicModelData(data.market1, data.marketType1)
    }
    if (data.market2) {
      this.market2 = modelFromPolymorphicModelData(data.market2, data.marketType2)
    }
  }
}
