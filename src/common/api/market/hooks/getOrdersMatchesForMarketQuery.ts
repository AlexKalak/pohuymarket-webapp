import { OrdersMatchData, OrdersMatchWhere, TradeModel } from "@/src/entities/trade/ordersMatchModel"
import GET_ORDERS_MATCHES from "../gql/GET_ORDERS_MATCHES.gql"
import { useQuery } from "@apollo/client/react"

type OrdersMatchResponse = {
  ordersMatches: OrdersMatchData[]
}

type UseTradesQueryProps = {
  fromHead?: boolean,
  first?: number,
  skip?: number,
  assetID: string,
  pollInterval?: number
}

export const useTradesQuery = ({ fromHead = true, first = 1000, skip = 0, assetID, pollInterval }: UseTradesQueryProps): {
  trades: TradeModel[],
  isLoading: boolean,
  error: string | null
} => {

  console.log(assetID)
  const where: OrdersMatchWhere = {
    takerOrMakerAssetId: assetID
  }

  const { data, loading, error } = useQuery<OrdersMatchResponse>(GET_ORDERS_MATCHES, {
    variables: {
      fromHead,
      first,
      skip,
      where
    },
    pollInterval,
  })

  if (!data?.ordersMatches) {
    return {
      trades: [],
      isLoading: loading,
      error: error?.message ?? null,
    }
  }

  const trades: TradeModel[] = []
  for (const ordersMatch of data?.ordersMatches) {
    try {
      const tradeModel = new TradeModel(ordersMatch)
      trades.push(tradeModel)
    } catch {
      continue
    }
  }

  return {
    trades: trades,
    isLoading: loading,
    error: error?.message ?? null
  }
}
