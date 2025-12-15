'use client'
import { useKalshiUnloadedMarkets } from "@/src/common/api/events/hooks/useKalshiUnloadedEvents";
import UnloadEventsList from "@/src/features/event/ui/UnloadEventsList";


export default function UnloadedMarketsPage() {

  const { markets } = useKalshiUnloadedMarkets(1765314000)


  return <div className="px-20 py-10">

    {markets
      ? <UnloadEventsList markets={markets} />
      : "Unable to load markets"
    }
  </div>

}

