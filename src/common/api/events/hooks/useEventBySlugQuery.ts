import { EventData, EventModel } from "@/src/entities/event/eventModel";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetEventBySlug = ({ slug }: { slug: string }): { event: EventModel | undefined, isLoading: boolean, error: string } => {
  const { data, isLoading, error } = useQuery<EventData>({
    queryKey: ["event_slug", slug],
    queryFn: async () => {
      const res = await fetch(`/gamma-polymarket/events/slug/${slug}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        })
      if (!res.ok) throw new Error("failed")
      return res.json()
    }
  })


  const event = useMemo(() => {
    if (!data) return undefined
    console.log("Data: ", data)

    return new EventModel(data)
  }, [data])


  return {
    event,
    isLoading,
    error: error?.message ?? ""
  }

}
