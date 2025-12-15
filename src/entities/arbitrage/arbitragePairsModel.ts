import { KalshiMarketData, KalshiMarketModel } from "../market/kalshiMarket";
import { PolymarketMarketData, PolymarketMarketModel } from "../market/polymarketMarket";

export type ArbitragePairWhere = {
  id?: number;
  polymarketMarketID?: number;
  kalshiMarketTicker?: string;
}

export class ArbitragePairData {
  id?: number;
  polymarketMarketID?: number;
  revertPolymarket?: boolean;
  createdAt?: Date; // auto-set on INSERT
  updatedAt?: Date; // auto-set on UPDATE
  polymarketMarket?: PolymarketMarketData;
  kalshiMarketTicker?: string;
  kalshiMarket?: KalshiMarketData;
  allowTrading?: boolean
}

export class ArbitragePairModel {
  id: number;
  polymarketMarketID: number;
  createdAt: Date;
  updatedAt: Date;
  polymarketMarket?: PolymarketMarketModel;
  revertPolymarket: boolean;
  kalshiMarketTicker: string;
  kalshiMarket?: KalshiMarketModel;
  allowTrading: boolean

  constructor(data: ArbitragePairData) {
    if (data.id == null) {
      throw new Error("ArbitragePairModel: 'id' is required");
    }
    if (data.polymarketMarketID == null) {
      throw new Error("ArbitragePairModel: 'polymarketMarketID' is required");
    }
    if (!data.kalshiMarketTicker) {
      throw new Error("ArbitragePairModel: 'kalshiMarketTicker' is required");
    }
    if (!data.createdAt) {
      throw new Error("ArbitragePairModel: 'createdAt' is required");
    }
    if (!data.updatedAt) {
      throw new Error("ArbitragePairModel: 'updatedAt' is required");
    }
    if (typeof data.revertPolymarket !== "boolean") {
      throw new Error("ArbitragePairModel: 'revertPolymarket' is required");
    }
    if (typeof data.allowTrading !== "boolean") {
      throw new Error("ArbitragePairModel: 'allowTrading' is required");
    }

    this.id = data.id;
    this.polymarketMarketID = data.polymarketMarketID;
    this.revertPolymarket = data.revertPolymarket
    this.allowTrading = data.allowTrading

    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);

    if (isNaN(this.createdAt.getTime()) || isNaN(this.updatedAt.getTime())) {
      throw new Error("ArbitragePairModel: invalid createdAt or updatedAt");
    }

    // Optional nested models
    this.polymarketMarket = data.polymarketMarket
      ? new PolymarketMarketModel(data.polymarketMarket)
      : undefined;

    this.kalshiMarketTicker = data.kalshiMarketTicker;

    this.kalshiMarket = data.kalshiMarket
      ? new KalshiMarketModel(data.kalshiMarket)
      : undefined;
  }
}
