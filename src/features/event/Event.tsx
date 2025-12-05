import { useGetEventBySlug } from "@/src/common/api/events/hooks/useEventBySlugQuery"
import { useBidAskUpdateSubscription } from "@/src/common/api/market/hooks/useBestBidAskUpdatesSubscription"
import MarketTradesChart from "@/src/common/components/market/MarketTradesChart"

const Event = ({ slug }: { slug: string }) => {
  const { event, isLoading, error } = useGetEventBySlug({ slug })
  if (!event) {
    return <div></div>
  }
  if (!event.markets || event.markets.length === 0) {
    return <div></div>
  }

  return (
    <div>
      {
        event.markets.map(market => (
          <MarketTradesChart key={market.id} market={market} />
        ))
      }

    </div>
  )

}

export default Event
