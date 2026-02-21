import GET_ORDER_FILLS_FOR_MARKET from "../gql/GET_ORDER_FILLS.gql"
import { useQuery } from "@apollo/client/react";
import { KalshiOrderFillData, KalshiOrderFillModel } from "../../../../entities/orderFill/kalshiOrderFillModel"
import { PolymarketOrderFillData, PolymarketOrderFillModel } from "../../../../entities/orderFill/polymarketOrderFillModel"
import { OrderFillData, OrderFillModel, parseOrderFill } from "../../../../entities/orderFill/orderFill"

export type { KalshiOrderFillData, KalshiOrderFillModel, PolymarketOrderFillData, PolymarketOrderFillModel, OrderFillData, OrderFillModel }

type OrderFillsForMarketResponse = {
  orderFills: OrderFillData[]
}

type UseOrderFillsForMarketProps = {
  marketIdentificator: string,
  pollInterval?: number
}

export const useOrderFillsForMarket = ({ marketIdentificator, pollInterval }: UseOrderFillsForMarketProps): {
  orderFills: OrderFillModel[],
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<OrderFillsForMarketResponse>(GET_ORDER_FILLS_FOR_MARKET, {
    variables: {
      marketIdentificator
    },
    pollInterval,
    skip: !marketIdentificator
  })

  const orderFills = data?.orderFills?.map(parseOrderFill) ?? []

  return {
    orderFills,
    isLoading: loading,
    error: error?.message ?? null
  }
}
