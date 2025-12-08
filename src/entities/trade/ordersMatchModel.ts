export class OrdersMatchWhere {
  id?: number;
  transactionHash?: string;
  blockNumber?: number;
  pairAddress?: string;
  timestamp?: number;
  takerAssetId?: string;
  makerAssetId?: string;
  takerOrMakerAssetId?: string;
}

export type OrdersMatchData = {
  id?: number
  transactionHash?: string
  logIndex?: number
  blockNumber?: number
  timestamp?: number
  takerOrderMaker?: string
  makerAssetId?: string
  takerAssetId?: string
  takerOrderHash?: string
  makerAmountFilled?: string
  takerAmountFilled?: string
  sharePrice?: number //scaled by 1000
}


export class TradeModel {
  transactionHash: string
  logIndex: number
  blockNumber: number
  timestamp: number
  creator: string
  action: string
  takerOrderHash: string
  amountIn: bigint
  amountOut: bigint
  price: number //scaled by 1000 (700 = 0.70$)


  constructor(ordersMatchData: OrdersMatchData) {
    if (ordersMatchData.id == null) {
      throw new Error("TradeModel requires field: id");
    }

    if (!ordersMatchData.transactionHash) {
      throw new Error("TradeModel requires field: transactionHash");
    }

    if (ordersMatchData.logIndex == null) {
      throw new Error("TradeModel requires field: logIndex");
    }

    if (ordersMatchData.blockNumber == null) {
      throw new Error("TradeModel requires field: blockNumber");
    }

    if (!ordersMatchData.timestamp) {
      throw new Error("TradeModel requires field: timestamp");
    }

    if (!ordersMatchData.takerOrderMaker) {
      throw new Error("TradeModel requires field: takerOrderMaker");
    }

    if (!ordersMatchData.makerAssetId) {
      throw new Error("TradeModel requires field: makerAssetId");
    }

    if (!ordersMatchData.takerAssetId) {
      throw new Error("TradeModel requires field: takerAssetId");
    }

    if (!ordersMatchData.takerOrderHash) {
      throw new Error("TradeModel requires field: takerOrderHash");
    }

    if (ordersMatchData.makerAmountFilled == null) {
      throw new Error("TradeModel requires field: makerAmountFilled");
    }
    try {
      BigInt(ordersMatchData.makerAmountFilled);
    } catch {
      throw new Error("TradeModel: makerAmountFilled must be a valid bigint");
    }

    if (ordersMatchData.takerAmountFilled == null) {
      throw new Error("TradeModel requires field: takerAmountFilled");
    }
    try {
      BigInt(ordersMatchData.takerAmountFilled);
    } catch {
      throw new Error("TradeModel: takerAmountFilled must be a valid bigint");
    }

    if (ordersMatchData.sharePrice == null) {
      throw new Error("TradeModel requires field: sharePrice");
    }

    this.transactionHash = ordersMatchData.transactionHash
    this.logIndex = Number(ordersMatchData.logIndex)
    this.blockNumber = Number(ordersMatchData.blockNumber)
    this.timestamp = Number(ordersMatchData.timestamp)
    this.creator = ordersMatchData.takerOrderMaker

    this.action = "BUY"
    if (ordersMatchData.takerAssetId === "0") {
      this.action = "SELL"
    }

    this.takerOrderHash = ordersMatchData.takerOrderHash
    this.amountIn = BigInt(ordersMatchData.makerAmountFilled)
    this.amountOut = BigInt(ordersMatchData.takerAmountFilled)
    this.price = ordersMatchData.sharePrice
  }
}
