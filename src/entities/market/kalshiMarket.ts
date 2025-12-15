import { IEvent } from "../event/event.interface";
import { KalshiEventData, KalshiEventModel } from "../event/kalshiEventModel";
import { IMarket, MarketType, marketTypeFromString, MarketWhere } from "./market.interface";


export class KalshiMarketWhere {
  ticker?: string;

  constructor(marketWhere: MarketWhere) {
    if (!marketWhere) {
      return;
    }

    if (marketWhere.identificator) {
      this.ticker = marketWhere.identificator;
    }
  }
}

export type KalshiMarketData = {
  type?: string;
  ticker?: string;
  event_ticker?: string;
  title?: string;
  subtitle?: string;
  createdTime?: string;
  closeTime?: string;
  marketType?: string;
  closed?: boolean;
  event?: KalshiEventData;
}

export class KalshiMarketModel implements IMarket {
  type!: MarketType;
  ticker!: string;
  event_ticker!: string;
  title!: string;
  subtitle!: string;
  createdTime!: Date;
  closeTime!: Date;
  marketType!: string;
  closed!: boolean;
  yes_sub_title?: string;
  no_sub_title?: string;
  custom?: string;
  expirationValue?: string;
  status?: string;
  event?: KalshiEventModel;

  constructor(data?: KalshiMarketData) {
    if (!data) {
      return
    }

    const type = marketTypeFromString(data?.type ?? "");

    if (!type) {
      throw new Error("KalshiMarketModel requires field: type");
    }
    if (!data.ticker) {
      throw new Error("KalshiMarketModel requires field: ticker");
    }
    if (!data.event_ticker) {
      throw new Error("KalshiMarketModel requires field: event_ticker");
    }
    if (!data.title) {
      throw new Error("KalshiMarketModel requires field: title");
    }
    if (!data.createdTime) {
      throw new Error("KalshiMarketModel requires field: createdTime");
    }
    if (!data.closeTime) {
      throw new Error("KalshiMarketModel requires field: closeTime");
    }
    if (!data.marketType) {
      throw new Error("KalshiMarketModel requires field: marketType");
    }

    this.type = type
    this.ticker = data.ticker
    this.event_ticker = data.event_ticker
    this.title = data.title
    this.subtitle = data.subtitle ?? ""
    this.createdTime = new Date(data.createdTime)
    this.closeTime = new Date(data.closeTime)
    this.marketType = data.marketType
    this.closed = data.closed ?? false

    this.event = data?.event ? new KalshiEventModel(data.event) : undefined
  }


  Downcast(): unknown {
    return this;
  }
  GetEvent(): IEvent | undefined {
    return this.event;
  }
  GetIsClosed(): boolean {
    return this.closed;
  }
  GetEnd(): Date {
    return this.closeTime;
  }
  GetStart(): Date {
    return this.createdTime;
  }
  GetQuestion(): string {
    return this.title;
  }
  GetSub(): string {
    if (this.yes_sub_title || this.no_sub_title) {
      return `${this.yes_sub_title} | ${this.no_sub_title}`;
    }
    return ""
  }
  GetTitle(): string {
    return this.title;
  }
  GetIdentificator(): string {
    return this.ticker;
  }
  GetMarketType(): MarketType {
    return this.type;
  }
}

