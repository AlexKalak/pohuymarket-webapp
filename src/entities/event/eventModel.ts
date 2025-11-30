import { MarketData, MarketModel } from "../market/market"

export type EventData = {
  id: string
  ticker: string
  slug: string
  title: string
  active: boolean
  closed: false
  markets: MarketData[]
}

export class EventModel {
  id: string
  ticker: string
  slug: string
  title: string
  active: boolean
  closed: boolean
  markets: MarketModel[]

  constructor(eventData: EventData) {
    if (
      !eventData.id ||
      !eventData.ticker ||
      !eventData.slug ||
      !eventData.title ||
      !(eventData.markets?.length)
    ) {
      throw new Error("Unable to construct MarketModel from MarketData provided")
    }

    const marketModels: MarketModel[] = []

    for (const marketData of eventData.markets) {
      try {
        const marketModel = new MarketModel(marketData)
        marketModels.push(marketModel)
      } catch {
        throw new Error("Unable to construct EventModel - invalid marketData passed")
      }
    }

    this.id = eventData.id
    this.ticker = eventData.ticker
    this.slug = eventData.slug
    this.title = eventData.title
    this.active = eventData.active
    this.closed = eventData.closed
    this.markets = marketModels

  }
}

