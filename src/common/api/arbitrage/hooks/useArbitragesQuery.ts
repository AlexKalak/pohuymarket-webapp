import { ArbitragePairData, ArbitragePairModel, ArbitragePairWhere } from "@/src/entities/arbitrage/arbitragePairsModel"
import { useQuery } from "@apollo/client/react"
import GET_ARBITAGE_PAIRS from "../gql/GET_ARBITRAGE_PAIRS_QUERY.gql"

type ArbitragePairsResponse = {
  arbitragePairs: ArbitragePairData[]
}

type UseArbitragePairsQueryProps = {
  first?: number,
  skip?: number,
  where?: ArbitragePairWhere,
  pollInterval?: number
}

export const useArbitragePairsQuery = ({ first = 1000, skip = 0, where, pollInterval }: UseArbitragePairsQueryProps): {
  pairs: ArbitragePairModel[],
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<ArbitragePairsResponse>(GET_ARBITAGE_PAIRS, {
    variables: {
      first,
      skip,
      where
    },
    pollInterval,
  })

  if (!data?.arbitragePairs) {
    return {
      pairs: [],
      isLoading: loading,
      error: error?.message ?? null,
    }
  }

  const pairs: ArbitragePairModel[] = []
  for (const pairData of data?.arbitragePairs) {
    try {
      const tradeModel = new ArbitragePairModel(pairData)
      pairs.push(tradeModel)
    } catch {
      continue
    }
  }

  return {
    pairs: pairs,
    isLoading: loading,
    error: error?.message ?? null
  }
}

