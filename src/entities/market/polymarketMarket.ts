import { IEvent } from "../event/event.interface";
import { PolymarketEventData, PolymarketEventModel } from "../event/polymarketEventModel";
import { IMarket, MarketType, marketTypeFromString, MarketWhere } from "./market.interface";

export class PolymarketMarketWhere {
  id?: number;

  constructor(marketWhere: MarketWhere) {
    if (!marketWhere) {
      return;
    }

    if (Number(marketWhere.identificator)) {
      this.id = Number(marketWhere.identificator);
    }
  }
}

export type PolymarketMarketData = {
  type?: MarketType | string;
  id?: number;
  conditionId?: string;
  event_id?: number;
  slug?: string;
  question?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  image?: string;
  icon?: string;
  yesAssetId?: string;
  noAssetId?: string;
  negRisk?: boolean;
  negRiskMarketID?: string;
  negRiskRequestID?: string;
  active?: boolean;
  closed?: boolean;
  event?: PolymarketEventData;
};

export class PolymarketMarketModel implements IMarket {
  type: MarketType;
  id: number;
  conditionId: string;
  event_id: number;
  slug: string;
  question: string;
  startDate: Date;
  endDate: Date;
  image?: string;
  icon?: string;
  yesAssetId: string;
  noAssetId: string;
  negRisk: boolean;
  negRiskMarketID?: string;
  negRiskRequestID?: string;
  active: boolean;
  closed: boolean;
  event_slug: string = "";
  event?: PolymarketEventModel;

  constructor(data: PolymarketMarketData) {
    const type = marketTypeFromString(data.type ?? "");

    if (!type) {
      throw new Error("PolymarketMarketModel requires field: type");
    }

    if (data.id == null) {
      throw new Error("PolymarketMarketModel requires field: id");
    }

    if (!data.conditionId) {
      throw new Error("PolymarketMarketModel requires field: conditionId");
    }

    if (data.event_id == null) {
      throw new Error("PolymarketMarketModel requires field: event_id");
    }

    if (!data.slug) {
      throw new Error("PolymarketMarketModel requires field: slug");
    }

    if (!data.question) {
      throw new Error("PolymarketMarketModel requires field: question");
    }

    if (!data.startDate) {
      throw new Error("PolymarketMarketModel requires field: startDate");
    }

    if (!data.endDate) {
      throw new Error("PolymarketMarketModel requires field: endDate");
    }

    if (!data.yesAssetId) {
      throw new Error("PolymarketMarketModel requires field: yesAssetId");
    }

    if (!data.noAssetId) {
      throw new Error("PolymarketMarketModel requires field: noAssetId");
    }

    this.type = type;
    this.id = data.id;
    this.conditionId = data.conditionId;
    this.event_id = data.event_id;
    this.slug = data.slug;
    this.question = data.question;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);

    if (isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime())) {
      throw new Error("Invalid startDate or endDate in PolymarketMarketModel");
    }

    this.image = data.image;
    this.icon = data.icon;

    this.yesAssetId = data.yesAssetId;
    this.noAssetId = data.noAssetId;

    this.negRisk = data.negRisk ?? false;
    this.negRiskMarketID = data.negRiskMarketID;
    this.negRiskRequestID = data.negRiskRequestID;

    this.active = data.active ?? true;
    this.closed = data.closed ?? false;

    if (data?.event?.slug) {
      this.event_slug = data.event.slug
    }

    try {
      this.event = data.event ? new PolymarketEventModel(data.event) : undefined;
    } catch { }
  }

  Downcast() {
    return this;
  }
  GetEvent(): IEvent | undefined {
    return this.event;
  }
  GetIsClosed(): boolean {
    return this.closed;
  }
  GetEnd(): Date {
    return this.endDate;
  }
  GetStart(): Date {
    return this.startDate;
  }
  GetQuestion(): string {
    return this.question;
  }
  GetTitle(): string {
    return this.slug;
  }
  GetIdentificator(): string {
    return this.conditionId;
  }
  GetMarketType(): MarketType {
    return this.type;
  }
  GetEventIdentificator(): string {
    return this.event_slug
  }
}




