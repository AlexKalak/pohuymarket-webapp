import { ArbitragePairData, ArbitragePairModel, ArbitragePairWhere } from "@/src/entities/arbitrage/arbitragePairsModel"
import { useMutation, useQuery } from "@apollo/client/react"
import CREATE_ARIBTRAGE_MUTATION from "../gql/CREATE_ARBITRAGE_MUTATION.gql"
import { queryGroups } from "../../queryGroups/queryGroups"
import { useEffect, useState } from "react"

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

  const [pairs, setPairs] = useState<ArbitragePairModel[]>()

  const [createArbitrage, { data, loading, error }] = useMutation<
    CreateArbitrageMutationResponse,
    { pairs: CreateArbitragePairData[] }
  >(
    CREATE_ARIBTRAGE_MUTATION,
    { refetchQueries: queryGroups['arbitrage_pairs'] }
  )

  useEffect(() => {
    if (!data?.createArbitragePairs) {
      return
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

    setPairs(pairs)

  }, [data, setPairs])

  console.log("returning valid data", pairs)

  return [
    createArbitrage,
    {
      pairs: pairs,
      isLoading: loading,
      error: error?.message ?? null
    }
  ]
}

