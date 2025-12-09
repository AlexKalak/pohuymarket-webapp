import { ArbitragePairModel } from "@/src/entities/arbitrage/arbitragePairsModel"
import { useMutation } from "@apollo/client/react"
import DELETE_ARBITRAGES_MUTATION from "../gql/DELETE_ARBITRAGE_MUTATION.gql"
import { queryGroups } from "../../queryGroups/queryGroups"

type DeleteArbitragesMutationResponse = {
  ok: boolean
}

type DeleteArbitragePairData = {
  ids: number[]
}

export const useDeleteArbitragesMutation = (): (
  [
    useMutation.MutationFunction<DeleteArbitragesMutationResponse, { ids: number[] }>,
    {
      ok: boolean | undefined,
      isLoading: boolean,
      error: string | null
    }
  ]
) => {

  const [deleteArbitrage, { data, loading, error }] = useMutation<
    DeleteArbitragesMutationResponse,
    { ids: number[] }
  >(
    DELETE_ARBITRAGES_MUTATION,
    { refetchQueries: queryGroups['arbitrage_pairs'] }
  )

  if (!data?.ok) {
    return [
      deleteArbitrage,
      {
        ok: undefined,
        isLoading: loading,
        error: error?.message ?? null,
      }
    ]
  }

  return [
    deleteArbitrage,
    {
      ok: data.ok,
      isLoading: loading,
      error: error?.message ?? null
    }
  ]
}

