import { IMarket } from "../market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "../market/polymarketMarket";
import { EventType, EventWhere, IEvent } from "./event.interface";

export class PolymarketEventWhere {
  id?: number;
  slug?: string;

  constructor(eventWhere: EventWhere) {
    if (!eventWhere) {
      return;
    }

    if (Number(eventWhere.identificator)) {
      this.id = Number(eventWhere.identificator);
    }
  }
}

export type PolymarketEventData = {
  id?: number;
  slug?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  image?: string;
  icon?: string;
  negRisk?: boolean;
  negRiskMarketID?: string;
  active?: boolean;
  closed?: boolean;
  enableOrderBook?: boolean;
  markets?: PolymarketMarketData[];

}

export class PolymarketEventModel implements IEvent {
  id: number;
  slug: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  image?: string;
  icon?: string;
  negRisk: boolean;
  negRiskMarketID?: string;
  active: boolean;
  closed: boolean;
  enableOrderBook: boolean;
  markets: PolymarketMarketModel[];

  constructor(data: PolymarketEventData) {
    if (data.id == null) {
      throw new Error("PolymarketEventModel requires: id");
    }
    if (!data.slug) {
      throw new Error("PolymarketEventModel requires: slug");
    }
    if (!data.title) {
      throw new Error("PolymarketEventModel requires: title");
    }
    if (!data.startDate) {
      throw new Error("PolymarketEventModel requires: startDate");
    }
    if (!data.endDate) {
      throw new Error("PolymarketEventModel requires: endDate");
    }

    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;

    // Date conversion
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);

    if (isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime())) {
      throw new Error("Invalid startDate or endDate in PolymarketEventModel");
    }

    this.image = data.image;
    this.icon = data.icon;

    this.negRisk = data.negRisk ?? false;
    this.negRiskMarketID = data.negRiskMarketID;

    this.active = data.active ?? true;
    this.closed = data.closed ?? false;

    this.enableOrderBook = data.enableOrderBook ?? true;

    // Nested markets
    this.markets = Array.isArray(data.markets)
      ? data.markets.map((m) => new PolymarketMarketModel(m))
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
    return this.id.toString();
  }
  GetEventType(): EventType {
    return EventType.Polymarket;
  }
}

