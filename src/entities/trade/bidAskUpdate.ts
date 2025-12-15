import { marketTypeFromString } from "../market/market.interface";

export type OrderData = {
  price?: number;
  size?: number;
}

export type BidAskUpdateWhere = {
  timestamp_gt?: string;
  marketIdentificator?: string;
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

    if (!marketType) {
      throw new Error("BidAskUpdateModel requires field: marketType");
    }

    if (!data.marketIdentificator) {
      throw new Error("BidAskUpdateModel requires field: marketIdentificator");
    }

    if (data.timestamp == null) {
      throw new Error("BidAskUpdateModel requires field: timestamp");
    }

    if (Number.isNaN(Number(data.timestamp))) {
      throw new Error("BidAskUpdateModel: timestamp must be a valid number");
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

