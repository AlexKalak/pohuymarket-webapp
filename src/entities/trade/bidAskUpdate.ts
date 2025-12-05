import { MarketType, marketTypeFromString } from "./market";

export type OrderData = {
  price?: number;
  size?: number;
}

export type BidAskUpdateData = {
  marketType?: string;
  marketIdentificator?: string;
  bestBidUpdate?: OrderData | null;
  bestAskUpdate?: OrderData | null;
  timestamp?: string;
}

export class BidAskUpdateModel {
  marketType: string;
  marketIdentificator: string;
  bestBidUpdate: OrderData | null;
  bestAskUpdate: OrderData | null;
  timestamp: number;

  constructor(data: BidAskUpdateData) {
    const marketType = marketTypeFromString(data.marketType ?? "")
    if (
      !marketType ||
      !data.marketIdentificator ||
      !Number(data.timestamp)
    ) {
      throw new Error("Unable to construct BidAskUpdateModel from data provided")
    }

    const bestBidUpdate = data.bestBidUpdate ?? null
    const bestAskUpdate = data.bestAskUpdate ?? null

    this.marketType = marketType
    this.marketIdentificator = data.marketIdentificator
    this.bestBidUpdate = bestBidUpdate
    this.bestAskUpdate = bestAskUpdate
    this.timestamp = Number(data.timestamp)
  }

}

