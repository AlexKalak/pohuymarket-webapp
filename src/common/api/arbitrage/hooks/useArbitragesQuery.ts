import { ArbitragePairData, ArbitragePairModel, ArbitragePairWhere } from "@/src/entities/arbitrage/arbitragePairsModel"
import { useQuery } from "@apollo/client/react"
import GET_ARBITAGE_PAIRS from "../gql/GET_ARBITRAGE_PAIRS_QUERY.gql"
import { useMemo } from "react"

type ArbitragePairsResponse = {
  arbitragePairs: ArbitragePairData[]
}

type UseArbitragePairsQueryProps = {
  first?: number,
  skip?: number,
  where?: ArbitragePairWhere,
  pollInterval?: number
}
type UseArbitragePairQueryProps = {
  where: ArbitragePairWhere,
  pollInterval?: number
}

export const useArbitragePairsQuery = ({ first = 1000, skip = 0, where, pollInterval }: UseArbitragePairsQueryProps): {
  pairs: ArbitragePairModel[] | undefined,
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

  const pairs: ArbitragePairModel[] | undefined = useMemo(() => {
    if (!data?.arbitragePairs) {
      return undefined
    }

    const pairs: ArbitragePairModel[] = []
    for (const pairData of data?.arbitragePairs) {
      try {
        const tradeModel = new ArbitragePairModel(pairData)
        pairs.push(tradeModel)
      } catch (e) {
        console.log(e)
        continue
      }
    }

    return pairs
  }, [data])

  return {
    pairs: pairs,
    isLoading: loading,
    error: error?.message ?? null
  }
}

export const useArbitragePairQuery = ({ where, pollInterval }: UseArbitragePairQueryProps): {
  pair: ArbitragePairModel | undefined,
  isLoading: boolean,
  error: string | null
} => {
  const { data, loading, error } = useQuery<ArbitragePairsResponse>(GET_ARBITAGE_PAIRS, {
    variables: {
      first: 1,
      skip: 0,
      where
    },
    pollInterval,
    skip: !where.id,
  })


  const pair: ArbitragePairModel | undefined = useMemo<ArbitragePairModel | undefined>(() => {
    if (!data?.arbitragePairs || data.arbitragePairs.length === 0) {
      return undefined
    }

    try {
      const tradeModel = new ArbitragePairModel(data?.arbitragePairs[0])
      return tradeModel
    } catch (e) {
      console.log(e)
      return undefined
    }

  }, [data])

  return {
    pair: pair,
    isLoading: loading,
    error: error?.message ?? null
  }
}

