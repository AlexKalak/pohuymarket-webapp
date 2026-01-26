import GET_EVENTS_BY_TEXT from "../gql/EVENTS_BY_TEXT.gql"
import { useQuery } from "@apollo/client/react";
import { PolymarketEventData, PolymarketEventModel } from "@/src/entities/event/polymarketEventModel";
import { KalshiEventData, KalshiEventModel } from "@/src/entities/event/kalshiEventModel";


type EventsByTextResponse = {
  eventsByText: {
    polymarket: PolymarketEventData[],
    kalshi: KalshiEventData[]
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

  return {
    polymarketEvents: polymarketEvents,
    kalshiEvents: kalshiEvents,
    isLoading: loading,
    error: error?.message ?? null
  }
}
