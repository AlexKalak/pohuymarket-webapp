import GET_EVENTS_BY_TEXT from "../gql/EVENTS_BY_TEXT.gql"
import { useQuery } from "@apollo/client/react";
import { PolymarketEventData, PolymarketEventModel } from "@/src/entities/event/polymarketEventModel";
import { KalshiEventData, KalshiEventModel } from "@/src/entities/event/kalshiEventModel";
import { PredictFunMarketModel, PredictFunMarketData } from "@/src/entities/market/predictFunMarket";
import { PredictFunEventData, PredictFunEventModel } from "@/src/entities/event/predictFunEventModel";


type EventsByTextResponse = {
  eventsByText: {
    polymarket: PolymarketEventData[],
    kalshi: KalshiEventData[]
    predictFun: PredictFunEventData[]
  }
}

type UseEventsByTextProps = {
  first?: number,
  skip?: number,
  text: string,
  pollInterval?: number
}

export const useEventsByTextQuery = ({ first = 1000, skip = 0, text, pollInterval }: UseEventsByTextProps): {
  kalshiEvents: KalshiEventModel[],
  polymarketEvents: PolymarketEventModel[]
  predictFunEvents: PredictFunEventModel[]
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<EventsByTextResponse>(GET_EVENTS_BY_TEXT, {
    variables: {
      text: text,
      first,
      skip,
    },
    pollInterval,
    fetchPolicy: "cache-and-network",
  })

  const eventsByText = data?.eventsByText
  if (!eventsByText?.kalshi && !eventsByText?.polymarket) {
    return {
      polymarketEvents: [],
      kalshiEvents: [],
      predictFunEvents: [],
      isLoading: loading,
      error: error?.message ?? null,
    }
  }

  const polymarketEvents: PolymarketEventModel[] = []
  for (const eventData of eventsByText?.polymarket) {
    try {
      const eventModel = new PolymarketEventModel(eventData)
      for (const market of eventModel.markets) {
        market.event_slug = eventModel.slug
      }

      polymarketEvents.push(eventModel)
    } catch (e) {
      continue
    }
  }

  const kalshiEvents: KalshiEventModel[] = []
  for (const eventData of eventsByText?.kalshi) {
    try {
      const eventModel = new KalshiEventModel(eventData)
      kalshiEvents.push(eventModel)
    } catch {
      continue
    }
  }

  const predictFunEvents: PredictFunEventModel[] = []
  console.log("Predict fun events data: ", eventsByText.predictFun)
  for (const eventData of eventsByText?.predictFun) {
    try {
      const eventModel = new PredictFunEventModel(eventData)
      predictFunEvents.push(eventModel)
    } catch (e) {
      console.log(e)
      continue
    }
  }
  console.log("Predict fun events models: ", predictFunEvents)

  return {
    polymarketEvents: polymarketEvents,
    kalshiEvents: kalshiEvents,
    predictFunEvents: predictFunEvents,
    isLoading: loading,
    error: error?.message ?? null
  }
}
