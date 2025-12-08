import { IMarket } from '../markets/market.interface';

export class EventWhere {
  identificator?: string;
}

export enum EventType {
  Polymarket = 'polymarket',
  Kalshi = 'kalshi',
}

export interface IEvent {
  GetEventType(): EventType;

  GetIdentificator(): string;
  GetTitle(): string;

  GetMarkets(): IMarket[];

  Downcast(): unknown;
}

