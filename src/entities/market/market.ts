export type MarketData = {
  id: string
  question: string
  slug: string
  startDate: string
  active: boolean
  closed: boolean
  clobTokenIds: string
  negRisk: boolean
  negRiskRequestID: string
}

export class MarketModel {
  id: string
  question: string
  slug: string
  startDate: string
  active: boolean
  closed: boolean
  clobTokenIds: string[]
  yesAssetId: string
  noAssetId: string
  negRisk: boolean
  negRiskRequestID: string

  constructor(marketData: MarketData) {
    if (
      !marketData.id ||
      !marketData.question ||
      !marketData.slug ||
      !marketData.startDate ||
      !marketData.clobTokenIds ||
      (marketData.negRisk && !marketData.negRiskRequestID)
    ) {
      throw new Error("Unable to construct MarketModel from MarketData provided")
    }
    try {
      this.clobTokenIds = JSON.parse(marketData.clobTokenIds) as string[]
    } catch {
      throw new Error("Unable to construct MarketModel from MarketData - invalid clob tokens")
    }

    if (this.clobTokenIds.length < 2) {
      throw new Error("Unable to construct MarketModel from MarketData - not enough clob tokens")
    }

    this.yesAssetId = this.clobTokenIds[0]
    this.noAssetId = this.clobTokenIds[1]
    console.log("yes:", this.yesAssetId)
    console.log("no:", this.noAssetId)

    this.id = marketData.id
    this.question = marketData.question
    this.slug = marketData.slug
    this.startDate = marketData.startDate
    this.active = marketData.active
    this.closed = marketData.closed
    this.negRisk = marketData.negRisk
    this.negRiskRequestID = marketData.negRiskRequestID

  }
}
