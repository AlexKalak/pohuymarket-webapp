import { useMutation } from "@apollo/client/react"
import LOAD_EVENTS_MUTATION from "../gql/LOAD_EVENTS_MUTATION.gql"

type LoadEventsResponse = {
  ok: boolean
}

type LoadEventUnit = {
  type: "kalshi" | "polymarket",
  ticker?: string,
  slug?: string,
}
type LoadEventsData = {
  events: LoadEventUnit[]
}

export const useLoadEventsMutation = (): (
  [
    useMutation.MutationFunction<LoadEventsResponse, LoadEventsData>,
    {
      ok: boolean | undefined,
      isLoading: boolean,
      error: string | null
    }
  ]
) => {

  const [loadEventsMutation, { data, loading, error }] = useMutation<
    LoadEventsResponse,
    LoadEventsData
  >(
    LOAD_EVENTS_MUTATION,
  )

  if (!data?.ok) {
    return [
      loadEventsMutation,
      {
        ok: undefined,
        isLoading: loading,
        error: error?.message ?? null,
      }
    ]
  }

  return [
    loadEventsMutation,
    {
      ok: data.ok,
      isLoading: loading,
      error: error?.message ?? null
    }
  ]
}


