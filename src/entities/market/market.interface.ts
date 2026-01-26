import { IEvent } from "../event/event.interface";

export enum MarketType {
  Polymarket = 'polymarket',
  Kalshi = 'kalshi',
}

export function marketTypeFromString(marketType: string): MarketType | undefined {
  switch (marketType) {
    case MarketType.Polymarket.toString():
      return MarketType.Polymarket;
    case MarketType.Kalshi.toString():
      return MarketType.Kalshi;
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

