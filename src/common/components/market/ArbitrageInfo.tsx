import { ArbitragePairModel } from "@/src/entities/arbitrage/arbitragePairsModel";
import { useMarketByIdentificatorQuery } from "../../api/market/hooks/useMarketsQuery";

type ArbitrageInfoProps = {
  pair: ArbitragePairModel
}

const ArbitrageInfo = ({ pair }: ArbitrageInfoProps) => {

  const { market, isLoading: marketLoading, error: marketError } = useMarketByIdentificatorQuery({
    identificator: pair?.polymarketMarketID?.toString() ?? "",
  });

  const { market: market2, isLoading: market2Loading, error: market2Error } = useMarketByIdentificatorQuery({
    identificator: pair?.kalshiMarketTicker ?? "",
  });


  return (
    <div className="flex gap-10 items-center">
      <div className={`flex flex-col gap2 ${pair?.revertPolymarket && "text-red-600"}`}>
        <div>Market 1 question</div>
        <div>{market && market.GetQuestion()}</div>
        <div>{market && market?.GetIdentificator()}</div>
      </div>
      <div className="flex flex-col gap2">
        <div>Market 2 question</div>
        <div>{market2 && market2.GetQuestion()}</div>
        <div>{market2 && market2?.GetIdentificator()}</div>
      </div>
    </div>

  )
}

export default ArbitrageInfo
