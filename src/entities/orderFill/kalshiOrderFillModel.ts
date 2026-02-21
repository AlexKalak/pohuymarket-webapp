export type KalshiOrderFillData = {
  action?: string
  contractsAmount?: number
  createdAt?: string
  id?: string
  kalshiMarketTicker?: string
  kalshiOrderID?: string
  price?: number
  side?: string
  timestamp?: string
  updatedAt?: string
}

export class KalshiOrderFillModel {
  action: string
  contractsAmount: number
  createdAt: string
  id: string
  kalshiMarketTicker: string
  kalshiOrderID: string
  price: number
  side: string
  timestamp: number
  updatedAt: string

  constructor(data: KalshiOrderFillData) {
    if (!data.id) {
      throw new Error("KalshiOrderFillModel requires field: id")
    }

    if (!data.action) {
      throw new Error("KalshiOrderFillModel requires field: action")
    }

    if (data.contractsAmount == null) {
      throw new Error("KalshiOrderFillModel requires field: contractsAmount")
    }

    if (!data.createdAt) {
      throw new Error("KalshiOrderFillModel requires field: createdAt")
    }

    if (!data.kalshiMarketTicker) {
      throw new Error("KalshiOrderFillModel requires field: kalshiMarketTicker")
    }

    if (!data.kalshiOrderID) {
      throw new Error("KalshiOrderFillModel requires field: kalshiOrderID")
    }

    if (data.price == null) {
      throw new Error("KalshiOrderFillModel requires field: price")
    }

    if (!data.side) {
      throw new Error("KalshiOrderFillModel requires field: side")
    }

    if (!data.timestamp) {
      throw new Error("KalshiOrderFillModel requires field: timestamp")
    }

    if (!data.updatedAt) {
      throw new Error("KalshiOrderFillModel requires field: updatedAt")
    }

    this.id = data.id
    this.action = data.action
    this.contractsAmount = Number(data.contractsAmount)
    this.createdAt = data.createdAt
    this.kalshiMarketTicker = data.kalshiMarketTicker
    this.kalshiOrderID = data.kalshiOrderID
    this.price = Number(data.price)
    this.side = data.side
    this.timestamp = Number(data.timestamp)
    this.updatedAt = data.updatedAt
  }
}
