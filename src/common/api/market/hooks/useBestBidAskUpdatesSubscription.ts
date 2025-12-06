import { BidAskUpdateData, BidAskUpdateModel } from "@/src/entities/trade/bidAskUpdate"
import { useSubscription } from "@apollo/client/react"
import { useState } from "react"
import BEST_BID_ASK_UPDATE_SUBSCRIPTION from "../gql/BID_ASK_UPDATE.gql"

type BidAskUpdateSubscriptionData = {
  bidAskUpdate: BidAskUpdateData,
}

export const useBidAskUpdateSubscription = (marketIdentificator: string): {
  bidAskUpdates: BidAskUpdateModel[],
  isLoading: boolean,
  error: string | null
} => {

  //Order old -> new
  const [liveBidAskUpdates, setLiveBidAskUpdates] = useState<BidAskUpdateModel[]>([])

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

        // const leftIndex = Math.max(newBidAsks.length - 100, 0)
        // newBidAsks = newBidAsks.slice(leftIndex)

        return newBidAsks
      })
    }
  })

  return {
    bidAskUpdates: liveBidAskUpdates,
    isLoading: loading,
    error: error?.message ?? ""
  }
}

