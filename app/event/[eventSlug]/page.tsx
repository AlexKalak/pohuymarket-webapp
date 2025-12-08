'use client'

import { useParams } from "next/navigation"
import Event from "@/src/features/event/ui/Event"

const EventPage = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>()
  return (
    <div>
      {
        //FIX: chainId
      }
      <Event slug={eventSlug} />
    </div>
  )

}

export default EventPage


