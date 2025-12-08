import MarketsSearchBarFeature from "../../event/ui/MarketsSearchBarFeature"

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-10 px-10 py-5">
      <h1 className="text-3xl text-left">PohMarket</h1>
      <MarketsSearchBarFeature />
    </div>
  )
}

export default Header
