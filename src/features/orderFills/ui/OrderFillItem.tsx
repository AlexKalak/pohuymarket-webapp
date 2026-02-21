import { KalshiOrderFillModel } from "@/src/entities/orderFill/kalshiOrderFillModel"
import { PolymarketOrderFillModel } from "@/src/entities/orderFill/polymarketOrderFillModel"

type OrderFillItemProps = {
  orderFill: KalshiOrderFillModel | PolymarketOrderFillModel
  yesAssetId?: string
}

const isKalshiFill = (fill: KalshiOrderFillModel | PolymarketOrderFillModel): fill is KalshiOrderFillModel => {
  return 'side' in fill
}

const OrderFillItem = ({ orderFill, yesAssetId }: OrderFillItemProps) => {
  const actionColor = orderFill.action === "BUY" ? "text-green-400" : "text-red-400"

  let side: string
  if (isKalshiFill(orderFill)) {
    side = orderFill.side
  } else {
    console.log("assetId : ", orderFill.assetId)
    console.log("yesAssetId: ", yesAssetId)
    side = orderFill.assetId === yesAssetId ? "yes" : "no"
  }

  return (
    <div className="border border-gray-600 rounded-lg px-4 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <span className={`font-semibold ${actionColor}`}>
          {orderFill.action}
        </span>
        <span className="text-gray-300">
          {Math.abs(orderFill.contractsAmount)} contracts
        </span>
        <span className="text-gray-300">
          @ ${orderFill.price.toFixed(2)}
        </span>
      </div>
      <div className="flex gap-4 items-center text-sm text-gray-400">
        <span className={side === "yes" ? "text-green-400" : "text-red-400"}>
          {side.toUpperCase()}
        </span>
        <span>
          {new Date(orderFill.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default OrderFillItem
