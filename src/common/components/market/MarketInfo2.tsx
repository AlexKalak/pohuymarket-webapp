import { useMarketByIdentificatorQuery } from "../../api/market/hooks/useMarketsQuery";

type MarketInfo2 = {
  arbitragePairID: number
}

const MarketInfo2 = ({ arbitragePairID: number }: MarketInfo2) => {
  const { market, isLoading: marketLoading, error: marketError } = useMarketByIdentificatorQuery({
    identificator: marketID,
  });

  const { market: market2, isLoading: market2Loading, error: market2Error } = useMarketByIdentificatorQuery({
    identificator: market2ID,
  });

  return (
    <div className="flex gap-10 items-center">
      <div className="flex flex-col gap2">
        <div>Market 1 question</div>
        <div>{market && market.GetQuestion()}</div>
      </div>
      <div className="flex flex-col gap2">
        <div>Market 2 question</div>
        <div>{market2 && market2.GetQuestion()}</div>
      </div>
    </div>

  )
}

export default MarketInfo2
