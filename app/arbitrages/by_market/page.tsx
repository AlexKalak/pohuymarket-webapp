import ArbitragePairList from "@/src/features/arbitragePairs/ui/ArbitragePairList";
import Header from "@/src/features/header/ui/Header";

export default function ArbitragesPage() {
  return <>
    <Header byMarket={true} />
    <main>
      <div className="px-20">
        <ArbitragePairList />
      </div>
    </main>
  </>

}
