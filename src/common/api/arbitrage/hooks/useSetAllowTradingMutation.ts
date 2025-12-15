import { useMutation } from "@apollo/client/react"
import SET_ALLOW_TRADING_MUTATION from "../gql/SET_ALLOW_TRADING_MUTATION.gql"
import { queryGroups } from "../../queryGroups/queryGroups"

type SetAllowTradingMutationResponse = {
  ok: boolean
}

type SetAllowTradingArbitragePairData = {
  id: number,
  allow: boolean
}

export const useSetAllowTradingMutation = (): (
  [
    useMutation.MutationFunction<SetAllowTradingMutationResponse, SetAllowTradingArbitragePairData>,
    {
      ok: boolean | undefined,
      isLoading: boolean,
      error: string | null
    }
  ]
) => {

  const [allowTrading, { data, loading, error }] = useMutation<
    SetAllowTradingMutationResponse,
    SetAllowTradingArbitragePairData
  >(
    SET_ALLOW_TRADING_MUTATION,
    { refetchQueries: queryGroups['arbitrage_pairs'] }
  )

  if (!data?.ok) {
    return [
      allowTrading,
      {
        ok: undefined,
        isLoading: loading,
        error: error?.message ?? null,
      }
    ]
  }

  return [
    allowTrading,
    {
      ok: data.ok,
      isLoading: loading,
      error: error?.message ?? null
    }
  ]
}

