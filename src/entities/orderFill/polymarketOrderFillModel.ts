export type PolymarketOrderFillData = {
  action?: string
  asset_id?: string
  contractsAmount?: number
  createdAt?: string
  id?: string
  polymarketMarketIdentificator?: string
  polymarketOrderID?: string
  price?: number
  timestamp?: string
  updatedAt?: string
}

export class PolymarketOrderFillModel {
  action: string
  assetId: string
  contractsAmount: number
  createdAt: string
  id: string
  polymarketMarketIdentificator: string
  polymarketOrderID: string
  price: number
  timestamp: number
  updatedAt: string

  constructor(data: PolymarketOrderFillData) {
    if (!data.id) {
      throw new Error("PolymarketOrderFillModel requires field: id")
    }

    if (!data.action) {
      throw new Error("PolymarketOrderFillModel requires field: action")
    }

    if (!data.asset_id) {
      throw new Error("PolymarketOrderFillModel requires field: asset_id")
    }

    if (data.contractsAmount == null) {
      throw new Error("PolymarketOrderFillModel requires field: contractsAmount")
    }

    if (!data.createdAt) {
      throw new Error("PolymarketOrderFillModel requires field: createdAt")
    }

    if (!data.polymarketMarketIdentificator) {
      throw new Error("PolymarketOrderFillModel requires field: polymarketMarketIdentificator")
    }

    if (!data.polymarketOrderID) {
      throw new Error("PolymarketOrderFillModel requires field: polymarketOrderID")
    }

    if (data.price == null) {
      throw new Error("PolymarketOrderFillModel requires field: price")
    }

    if (!data.timestamp) {
      throw new Error("PolymarketOrderFillModel requires field: timestamp")
    }

    if (!data.updatedAt) {
      throw new Error("PolymarketOrderFillModel requires field: updatedAt")
    }

    this.id = data.id
    this.action = data.action
    this.assetId = data.asset_id
    this.contractsAmount = Number(data.contractsAmount)
    this.createdAt = data.createdAt
    this.polymarketMarketIdentificator = data.polymarketMarketIdentificator
    this.polymarketOrderID = data.polymarketOrderID
    this.price = Number(data.price)
    this.timestamp = Number(data.timestamp)
    this.updatedAt = data.updatedAt
  }
}
