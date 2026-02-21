import { IEvent } from "../event/event.interface";
import { KalshiMarketData, KalshiMarketModel } from "./kalshiMarket";
import { PolymarketMarketData, PolymarketMarketModel } from "./polymarketMarket";
import { PredictFunMarketData, PredictFunMarketModel } from "./predictFunMarket";

export type PolymorphicMarketData = PolymarketMarketData | KalshiMarketData | PredictFunMarketData
export type PolymorphicMarketModel = PolymarketMarketModel | KalshiMarketModel | PredictFunMarketModel

export function modelFromPolymorphicModelData(polymorphicData: PolymorphicMarketData, marketType: MarketType): PolymorphicMarketModel | undefined {
  const data = { ...polymorphicData }
  switch (marketType) {
    case MarketType.Polymarket:
      return new PolymarketMarketModel(data as PolymarketMarketData)
    case MarketType.Kalshi:
      return new KalshiMarketModel(data as KalshiMarketData)
    case MarketType.PredictFun:
      return new PredictFunMarketModel(data as PredictFunMarketData)
  }
}

export enum MarketType {
  Polymarket = 'polymarket',
  Kalshi = 'kalshi',
  PredictFun = 'predictFun',
}

export function marketTypeFromString(marketType: string): MarketType | undefined {
  switch (marketType) {
    case MarketType.Polymarket.toString():
      return MarketType.Polymarket;
    case MarketType.Kalshi.toString():
      return MarketType.Kalshi;
    case MarketType.PredictFun.toString():
      return MarketType.PredictFun;
  }

  return undefined
}


export class MarketWhere {
  identificator?: string;
  textSearch?: string
}

export interface IMarket {
  GetMarketType(): MarketType;

  GetEventIdentificator(): string;

  GetIdentificator(): string;
  GetTitle(): string;
  GetQuestion(): string;
  GetStart(): Date;
  GetEnd(): Date;

  GetIsClosed(): boolean;

  GetEvent(): IEvent | undefined;

  Downcast(): unknown;
}

