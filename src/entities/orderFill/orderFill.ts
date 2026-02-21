import { KalshiOrderFillData, KalshiOrderFillModel } from "./kalshiOrderFillModel"
import { PolymarketOrderFillData, PolymarketOrderFillModel } from "./polymarketOrderFillModel"

export type OrderFillData = KalshiOrderFillData | PolymarketOrderFillData

export type OrderFillModel = KalshiOrderFillModel | PolymarketOrderFillModel

export function isKalshiOrderFillData(data: OrderFillData): data is KalshiOrderFillData {
  return 'kalshiMarketTicker' in data
}

export function isPolymarketOrderFillData(data: OrderFillData): data is PolymarketOrderFillData {
  return 'polymarketMarketIdentificator' in data
}

export function parseOrderFill(data: OrderFillData): OrderFillModel {
  if (isKalshiOrderFillData(data)) {
    return new KalshiOrderFillModel(data)
  }
  return new PolymarketOrderFillModel(data)
}
