import { IEvent } from "../event/event.interface";
import { PolymarketEventData, PolymarketEventModel } from "../event/polymarketEventModel";
import { IMarket, MarketType, marketTypeFromString, MarketWhere } from "./market.interface";

export class PredictFunMarketWhere {
  id?: string;

  constructor(marketWhere: MarketWhere) {
    if (!marketWhere) {
      return;
    }

    if (marketWhere.identificator) {
      this.id = marketWhere.identificator;
    }
  }
}

export type PredictFunOutcomeData = {
  name?: string
  indexSet?: number
  onChainId?: string
  status?: string
}


export type PredictFunMarketData = {
  type: MarketType.PredictFun
  id?: string
  event_id?: string
  title?: string
  question?: string
  description?: string
  imageUrl?: string
  status?: string
  isNegRisk?: boolean
  isYieldBearing?: boolean
  conditionId?: string
  oracleQuestionId?: string
  resolverAddress?: string
  feeRateBps?: string
  spreadThreshold?: string
  shareThreshold?: string
  decimalPrecision?: number
  isBoosted?: boolean
  boostStartsAt?: Date | null
  boostEndsAt?: Date | null
  marketVariant?: string
  categorySlug?: string
  createdAt?: Date
  outcomes?: PredictFunOutcomeData[]
  polymarketConditionIds?: string
  kalshiMarketTicker?: string
};

export class PredictFunMarketModel implements IMarket {
  id: string;
  event_id: string;
  title: string;
  question: string;
  description: string;
  imageUrl?: string;
  status: string;

  isNegRisk: boolean;
  isYieldBearing: boolean;

  conditionId: string;
  oracleQuestionId: string;
  resolverAddress: string;

  feeRateBps: string;
  spreadThreshold: string;
  shareThreshold: string;

  decimalPrecision: number;

  isBoosted: boolean;
  boostStartsAt: Date | null;
  boostEndsAt: Date | null;

  marketVariant: string;
  categorySlug: string;

  createdAt: Date;

  outcomes: PredictFunOutcomeData[];

  polymarketConditionIds?: string;
  kalshiMarketTicker?: string;

  event_slug: string = "";

  constructor(data: PredictFunMarketData) {
    this.type = MarketType.PredictFun

    if (!data.id) {
      throw new Error("PredictFunMarketModel requires field: id");
    }

    if (!data.event_id) {
      throw new Error("PredictFunMarketModel requires field: event_id");
    }

    if (!data.title) {
      throw new Error("PredictFunMarketModel requires field: title");
    }

    if (!data.question) {
      throw new Error("PredictFunMarketModel requires field: question");
    }

    if (!data.description) {
      throw new Error("PredictFunMarketModel requires field: description");
    }

    if (!data.status) {
      throw new Error("PredictFunMarketModel requires field: status");
    }

    if (!data.conditionId) {
      throw new Error("PredictFunMarketModel requires field: conditionId");
    }

    if (!data.oracleQuestionId) {
      throw new Error("PredictFunMarketModel requires field: oracleQuestionId");
    }

    if (!data.resolverAddress) {
      throw new Error("PredictFunMarketModel requires field: resolverAddress");
    }

    if (!data.createdAt) {
      throw new Error("PredictFunMarketModel requires field: createdAt");
    }

    this.type = MarketType.PredictFun;

    this.id = data.id;
    this.event_id = data.event_id;
    this.title = data.title;
    this.question = data.question;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.status = data.status;

    this.isNegRisk = data.isNegRisk ?? false;
    this.isYieldBearing = data.isYieldBearing ?? false;

    this.conditionId = data.conditionId;
    this.oracleQuestionId = data.oracleQuestionId;
    this.resolverAddress = data.resolverAddress;

    this.feeRateBps = data.feeRateBps ?? "0";
    this.spreadThreshold = data.spreadThreshold ?? "0";
    this.shareThreshold = data.shareThreshold ?? "0";

    this.decimalPrecision = data.decimalPrecision ?? 6;

    this.isBoosted = data.isBoosted ?? false;

    this.boostStartsAt = data.boostStartsAt
      ? new Date(data.boostStartsAt)
      : null;

    this.boostEndsAt = data.boostEndsAt
      ? new Date(data.boostEndsAt)
      : null;

    if (
      (this.boostStartsAt && isNaN(this.boostStartsAt.getTime())) ||
      (this.boostEndsAt && isNaN(this.boostEndsAt.getTime()))
    ) {
      throw new Error("Invalid boost dates in PredictFunMarketModel");
    }

    this.marketVariant = data.marketVariant ?? "";
    this.categorySlug = data.categorySlug ?? "";

    this.createdAt = new Date(data.createdAt);
    if (isNaN(this.createdAt.getTime())) {
      throw new Error("Invalid createdAt in PredictFunMarketModel");
    }

    this.outcomes = data.outcomes ?? [];

    this.polymarketConditionIds = data.polymarketConditionIds;
    this.kalshiMarketTicker = data.kalshiMarketTicker;
  }

  Downcast() {
    return this;
  }

  GetEvent(): IEvent | undefined {
    return undefined;
  }

  GetIsClosed(): boolean {
    return this.status.toLowerCase() === "RESOLVED";
  }

  GetEnd(): Date {
    return this.boostEndsAt ?? this.createdAt;
  }

  GetStart(): Date {
    return this.boostStartsAt ?? this.createdAt;
  }

  GetQuestion(): string {
    return this.question;
  }

  GetTitle(): string {
    return this.title;
  }

  GetIdentificator(): string {
    return this.id;
  }

  GetMarketType(): MarketType {
    return MarketType.PredictFun;
  }

  GetEventIdentificator(): string {
    return this.event_id;
  }
}



