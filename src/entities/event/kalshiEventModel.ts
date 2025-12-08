import { KalshiMarketData, KalshiMarketModel } from "../market/kalshiMarket";
import { IMarket } from "../market/market.interface";
import { EventType, EventWhere, IEvent } from "./event.interface";

export class KalshiEventWhere {
  ticker?: string;

  constructor(eventWhere: EventWhere) {
    if (!eventWhere) {
      return;
    }

    this.ticker = eventWhere.identificator;
  }
}
export type KalshiEventData = {
  ticker: string;
  title: string;
  markets?: KalshiMarketData[];
}

export class KalshiEventModel implements IEvent {
  ticker: string;
  title: string;
  markets: KalshiMarketModel[];

  constructor(data: KalshiEventData) {
    if (!data.ticker) {
      throw new Error("KalshiEventModel requires: ticker");
    }
    if (!data.title) {
      throw new Error("KalshiEventModel requires: title");
    }

    this.ticker = data.ticker;
    this.title = data.title;

    // Parse markets if provided
    this.markets = Array.isArray(data.markets)
      ? data.markets.map((m) => new KalshiMarketModel(m))
      : [];
  }

  Downcast() {
    return this;
  }
  GetMarkets(): IMarket[] {
    return this.markets;
  }
  GetTitle(): string {
    return this.title;
  }
  GetIdentificator(): string {
    return this.ticker;
  }
  GetEventType(): EventType {
    return EventType.Kalshi;
  }
}

