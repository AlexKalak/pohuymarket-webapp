
import BEST_BID_ASK_QUERY from "../gql/BEST_BID_ASK_QUERY.gql"
import { useQuery } from "@apollo/client/react";
import { BidAskUpdateData, BidAskUpdateModel, BidAskUpdateWhere } from "@/src/entities/trade/bidAskUpdate";
import { useMemo } from "react";


type BestBidAsksResponse = {
  bestBidAskUpdates: BidAskUpdateData[]
}

type UseBestBidAsksUpdatesQueryProps = {
  fromHead?: boolean,
  first?: number,
  skip?: number,
  where?: BidAskUpdateWhere,
  pollInterval?: number
}

export const useBestBidAsksUpdatesQuery = ({ fromHead = true, first = 1000, skip = 0, where, pollInterval }: UseBestBidAsksUpdatesQueryProps): {
  bestBidAskUpdates: BidAskUpdateModel[] | undefined,
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<BestBidAsksResponse>(BEST_BID_ASK_QUERY, {
    variables: {
      fromHead,
      where,
      first,
      skip,
    },
    pollInterval,
  })

  const bestBidAskUpdates = useMemo<BidAskUpdateModel[] | undefined>(() => {
    if (!data?.bestBidAskUpdates) {
      return undefined
    }

    const bidAskUpdates: BidAskUpdateModel[] = []
    for (const bidAskUpdateData of data?.bestBidAskUpdates) {
      try {
        const bidAskUpdateModel = new BidAskUpdateModel(bidAskUpdateData)
        bidAskUpdates.push(bidAskUpdateModel)
      } catch (e) {
        console.log("Err constructing bidAskUpdateModel: ", e)
        continue
      }
    }

    return bidAskUpdates

  }, [data])

  return {
    bestBidAskUpdates: bestBidAskUpdates,
    isLoading: loading,
    error: error?.message ?? null
  }
}

