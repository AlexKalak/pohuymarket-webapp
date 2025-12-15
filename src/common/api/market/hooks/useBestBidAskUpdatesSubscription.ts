import { BidAskUpdateData, BidAskUpdateModel } from "@/src/entities/trade/bidAskUpdate"
import { useSubscription } from "@apollo/client/react"
import { useMemo, useState } from "react"
import BEST_BID_ASK_UPDATE_SUBSCRIPTION from "../gql/BEST_BID_ASK_UPDATE.gql"
import { useBestBidAsksUpdatesQuery } from "./useBestBidAskUpdataesQuery"

type BidAskUpdateSubscriptionData = {
  bidAskUpdate: BidAskUpdateData,
}

export const useBidAskUpdateSubscription = (marketIdentificator: string, limit = 1000): {
  bidAskUpdates: BidAskUpdateModel[],
  isLoading: boolean,
  error: string | null
} => {
  //Order old -> new
  const [subscriptionBidAskUpdates, setLiveBidAskUpdates] = useState<BidAskUpdateModel[]>([])

  const { loading, error } = useSubscription(BEST_BID_ASK_UPDATE_SUBSCRIPTION, {
    variables: {
      marketIdentificator,
    },
    onData({ data }) {
      if (data.error) {
        console.log(data.error)
        return
      }

      const subscriptionData = data?.data as BidAskUpdateSubscriptionData
      if (!subscriptionData) {
        return
      }

      let bidAskUpdate: BidAskUpdateModel
      try {
        bidAskUpdate = new BidAskUpdateModel(subscriptionData.bidAskUpdate)
      } catch (e) {
        console.error("Unable to construct new bidAks in liveSwaps", e)
        return
      }

      setLiveBidAskUpdates((prev) => {
        const newBidAsks = [...prev, bidAskUpdate]
        const leftIndex = Math.max(newBidAsks.length - limit, 0)
        return newBidAsks.slice(leftIndex)
      })
    }
  })

  //order new -> old
  const { bestBidAskUpdates: historyBidAskUpdates, isLoading: historyIsLoading, error: historyError } = useBestBidAsksUpdatesQuery({
    fromHead: true,
    first: limit,
    skip: 0,
    where: {
      marketIdentificator: marketIdentificator,
    },
    // pollInterval: 100000
  })

  const allBidAskUpdates = useMemo(() => {
    if (!historyBidAskUpdates || historyBidAskUpdates.length === 0) {
      return subscriptionBidAskUpdates.slice()
    }

    if (subscriptionBidAskUpdates?.length >= limit) {
      return subscriptionBidAskUpdates.slice()
    }

    //convert to old -> new
    const ascHistory = historyBidAskUpdates.slice()
    ascHistory.reverse()

    if (!subscriptionBidAskUpdates || subscriptionBidAskUpdates.length === 0) {
      return ascHistory
    }

    const lastHistoryBidAskUpdate = ascHistory[historyBidAskUpdates.length - 1]
    const firstSubscriptionBidAskUpdate = subscriptionBidAskUpdates[0]

    if (firstSubscriptionBidAskUpdate.timestamp > lastHistoryBidAskUpdate.timestamp) {
      const results = [...ascHistory, ...subscriptionBidAskUpdates.slice()]
      const leftIndex = Math.max(results.length - limit, 0)

      return results.slice(leftIndex)
    }

    let firstNewBidAskUpdateIndex = -1
    for (let i = 0; i < subscriptionBidAskUpdates.length; i++) {
      if (subscriptionBidAskUpdates[i].timestamp > lastHistoryBidAskUpdate.timestamp) {
        firstNewBidAskUpdateIndex = i
        break
      }
    }

    if (firstNewBidAskUpdateIndex === -1) {
      return ascHistory
    }

    const newBidAskUpdates = subscriptionBidAskUpdates.slice(firstNewBidAskUpdateIndex)

    const results = [...ascHistory, ...newBidAskUpdates.slice()]
    const leftIndex = Math.max(results.length - limit, 0)

    return results.slice(leftIndex)
  }, [historyBidAskUpdates, limit, subscriptionBidAskUpdates])

  let errorMessage = ""
  if (error?.message) {
    errorMessage = error?.message ?? ""
  } else if (historyError) {
    errorMessage = error?.message ?? ""
  }
  return {
    bidAskUpdates: allBidAskUpdates,
    isLoading: loading || historyIsLoading,
    error: errorMessage
  }
}

