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
    if (
      !ordersMatchData.id ||
      !ordersMatchData.transactionHash ||
      !ordersMatchData.logIndex ||
      !ordersMatchData.blockNumber ||
      !ordersMatchData.timestamp ||
      !ordersMatchData.takerOrderMaker ||
      !ordersMatchData.makerAssetId ||
      !ordersMatchData.takerAssetId ||
      !ordersMatchData.takerOrderHash ||
      !ordersMatchData.makerAmountFilled ||
      !BigInt(ordersMatchData.makerAmountFilled) ||
      !ordersMatchData.takerAmountFilled ||
      !BigInt(ordersMatchData.takerAmountFilled) ||
      !ordersMatchData.sharePrice
    ) {
      throw new Error("Unable to construct TradeModel from OrdersMatchData provided")
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
