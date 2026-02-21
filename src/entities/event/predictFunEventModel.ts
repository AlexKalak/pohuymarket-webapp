import { IMarket } from "../market/market.interface";
import { PolymarketMarketData, PolymarketMarketModel } from "../market/polymarketMarket";
import { PredictFunMarketData, PredictFunMarketModel } from "../market/predictFunMarket";
import { EventType, EventWhere, IEvent } from "./event.interface";

export class PredictFunEventWhere {
  id?: number;

  constructor(eventWhere: EventWhere) {
    if (!eventWhere) {
      return;
    }

    if (Number(eventWhere.identificator)) {
      this.id = Number(eventWhere.identificator);
    }
  }
}

export type PredictFunEventData = {
  id?: number
  title?: string
  question?: string
  description?: string
  imageUrl?: string
  status?: string
  isNegRisk?: boolean
  conditionId?: string
  categorySlug?: string
  createdAt?: string
  markets?: PredictFunMarketData[];
}

export class PredictFunEventModel implements IEvent {
  id: number
  title: string
  question: string
  description: string
  imageUrl: string
  status: string
  isNegRisk: boolean
  conditionId: string
  categorySlug: string
  createdAt: Date
  markets: PredictFunMarketModel[];

  constructor(data: PredictFunEventData) {
    if (data.id == null) {
      throw new Error("PredictFunEventModel requires: id");
    }
    if (!data.title) {
      throw new Error("PredictFunEventModel requires: slug");
    }
    if (typeof data.question !== "string") {
      throw new Error("PredictFunEventModel requires: question");
    }
    if (typeof data.question !== "string") {
      throw new Error("PredictFunEventModel requires: status");
    }
    if (typeof data.isNegRisk !== "boolean") {
      throw new Error("PredictFunEventModel requires: status");
    }
    if (!data.conditionId || typeof data.conditionId !== "string") {
      throw new Error("PredictFunEventModel requires: status");
    }
    if (!data.createdAt || !new Date(data.createdAt) || typeof data.createdAt !== "string") {
      throw new Error("PredictFunEventModel requires: status");
    }

    this.conditionId = data.conditionId;
    this.id = data.id;
    this.question = data.question;
    this.title = data.title;
    this.imageUrl = data.imageUrl ?? "";
    this.description = data.description ?? "";
    this.status = data.status ?? "";
    this.isNegRisk = data.isNegRisk;
    this.categorySlug = data.categorySlug ?? "";
    this.createdAt = new Date(data.createdAt);

    // Date conversion

    if (isNaN(this.createdAt.getTime())) {
      throw new Error("Invalid startDate or endDate in PolymarketEventModel");
    }

    // Nested markets
    this.markets = Array.isArray(data.markets)
      ? data.markets.map((m) => new PredictFunMarketModel(m))
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

