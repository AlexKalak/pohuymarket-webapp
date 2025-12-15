import { KalshiMarketModel } from "@/src/entities/market/kalshiMarket"

export type KalshiEventResponse = {
  available_on_brokers: boolean
  category: string
  collateral_return_type: string
  event_ticker: string
  mutually_exclusive: boolean
  series_ticker: string
  strike_period: string
  sub_title: string
  title: string
  markets: []
}

export type KalshiMarketResponse = {
  can_close_early: boolean;
  category: string;
  close_time: string;
  created_time: string;
  early_close_condition: string;
  event_ticker: string;
  expected_expiration_time: string;
  expiration_time: string;
  expiration_value: string;
  last_price: number;
  last_price_dollars: string;
  latest_expiration_time: string;
  liquidity: number;
  liquidity_dollars: string;
  market_type: string;
  no_ask: number;
  no_ask_dollars: string;
  no_bid: number;
  no_bid_dollars: string;
  no_sub_title: string;
  notional_value: number;
  notional_value_dollars: string;
  open_interest: number;
  open_time: string;
  previous_price: number;
  previous_price_dollars: string;
  previous_yes_ask: number;
  previous_yes_ask_dollars: string;
  previous_yes_bid: number;
  previous_yes_bid_dollars: string;
  price_level_structure: string;

  price_ranges: {
    start: string;
    end: string;
    step: string;
  }[];

  custom_strike?: {
    Word?: string
  }

  response_price_units: string;
  result: string;
  risk_limit_cents: number;
  rules_primary: string;
  rules_secondary: string;
  settlement_timer_seconds: number;
  status: string;
  subtitle: string;
  tick_size: number;
  ticker: string;
  title: string;
  volume: number;
  volume_24h: number;
  yes_ask: number;
  yes_ask_dollars: string;
  yes_bid: number;
  yes_bid_dollars: string;
  yes_sub_title: string;
}

export function kalshiMarketResponseToModel(response: KalshiMarketResponse): KalshiMarketModel {
  const marketModel = new KalshiMarketModel()
  marketModel.status = response.status
  marketModel.yes_sub_title = response.yes_sub_title
  marketModel.no_sub_title = response.no_sub_title
  marketModel.custom = response.custom_strike?.Word
  marketModel.expirationValue = response.expiration_value

  if (!response.event_ticker) {
    throw new Error(`Invalid event_ticker: ${response.event_ticker}`)
  }
  marketModel.event_ticker = response.event_ticker

  if (!response.ticker) {
    throw new Error(`Invalid ticker: ${response.ticker}`)
  }
  marketModel.ticker = response.ticker

  if (!response.market_type) {
    throw new Error(`Invalid market_type: ${response.market_type}`)
  }
  marketModel.marketType = response.market_type

  if (!response.title) {
    throw new Error(`Invalid title: ${response.title}`)
  }
  marketModel.title = response.title

  marketModel.subtitle = response.subtitle ?? ""

  if (!response.created_time || !new Date(response.created_time).getTime()) {
    throw new Error(`Invalid created_time: ${response.created_time}`)
  }
  marketModel.createdTime = new Date(response.created_time)


  if (!response.close_time) {
    throw new Error(`Invalid close_time: ${response.close_time}`)
  }
  console.log("Close time: ", response.close_time)
  marketModel.closeTime = new Date(response.close_time)

  marketModel.closed = marketModel.closeTime.getTime() < new Date().getTime()
  console.log("Closed: ", marketModel.closed)


  return marketModel
}

