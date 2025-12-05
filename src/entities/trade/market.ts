
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

