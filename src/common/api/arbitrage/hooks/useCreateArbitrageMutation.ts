import { ArbitragePairData, ArbitragePairModel, ArbitragePairWhere } from "@/src/entities/arbitrage/arbitragePairsModel"
import { useMutation, useQuery } from "@apollo/client/react"
import CREATE_ARIBTRAGE_MUTATION from "../gql/CREATE_ARBITRAGE_MUTATION.gql"

type CreateArbitrageMutationResponse = {
  createArbitragePairs: ArbitragePairData[]
}

type CreateArbitragePairData = {
  polymarketMarketID: number,
  kalshiMarketTicker: string,
}

export const useCreateArbitragePairsMutation = (): (
  [
    useMutation.MutationFunction<CreateArbitrageMutationResponse, { pairs: CreateArbitragePairData[] }>,
    {
      pairs: ArbitragePairModel[] | undefined,
      isLoading: boolean,
      error: string | null
    }
  ]
) => {

  const [createArbitrage, { data, loading, error }] = useMutation<CreateArbitrageMutationResponse, { pairs: CreateArbitragePairData[] }>(CREATE_ARIBTRAGE_MUTATION)

  if (!data?.createArbitragePairs) {
    return [
      createArbitrage,
      {
        pairs: undefined,
        isLoading: loading,
        error: error?.message ?? null,
      }
    ]
  }

  const pairs: ArbitragePairModel[] = []

  for (const pairData of data?.createArbitragePairs) {
    try {
      const tradeModel = new ArbitragePairModel(pairData)
      pairs.push(tradeModel)
    } catch {
      continue
    }
  }

  return [
    createArbitrage,
    {
      pairs: pairs,
      isLoading: loading,
      error: error?.message ?? null
    }
  ]
}

