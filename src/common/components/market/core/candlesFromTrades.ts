import { CandleModel } from "@/src/entities/candle/candle";
import { TradeModel } from "@/src/entities/trade/ordersMatchModel";

//trades should go in ascending order
export const tradesToCandles = (newTrades: TradeModel[], timeSpacing: number): { candles: CandleModel[], updatingCandle: CandleModel | null } => {
  const candles: CandleModel[] = []
  let updatingCandle = new CandleModel()

  for (const trade of newTrades) {
    // if (trade.action === "SELL") {
    //   continue
    // }

    if (trade.timestamp === 0) {
      continue
    }

    const normalizedTxTimestamp =
      trade.timestamp - (trade.timestamp % timeSpacing);

    if (normalizedTxTimestamp < updatingCandle.timestamp) {
      continue
    }

    const price = trade.price

    if (normalizedTxTimestamp - updatingCandle.timestamp < timeSpacing) {
      if (price < updatingCandle.low) {
        updatingCandle.low = price;
      }
      if (price > updatingCandle.high) {
        updatingCandle.high = price;
      }

      updatingCandle.close = price;
    } else {
      candles.push({ ...updatingCandle })
      const diff = normalizedTxTimestamp - updatingCandle.timestamp;
      const amountOfEmptyCandles = Math.floor(diff / timeSpacing) - 1;

      if (amountOfEmptyCandles < 1000) {
        for (let i = 0; i < amountOfEmptyCandles; i++) {
          candles.push(new CandleModel({
            amountSwaps: 0,
            open: updatingCandle.close,
            close: updatingCandle.close,
            high: updatingCandle.close,
            low: updatingCandle.close,
            timestamp: updatingCandle.timestamp + (i + 1) * timeSpacing,
          }));
        }
      }
      else {
        candles.length = 0
      }

      updatingCandle = {
        open: updatingCandle.close,
        close: price,
        high: price,
        low: price,
        timestamp: normalizedTxTimestamp,
        amountSwaps: 1,
      };
    }
  }

  return { candles, updatingCandle }
}

export const tradesToCandlesStupid = (newTrades: TradeModel[], timeSpacing: number): { candles: CandleModel[], updatingCandle: CandleModel | null } => {
  const candles: CandleModel[] = []
  let updatingCandle = new CandleModel()

  let initialTimestamp = 0

  for (const trade of newTrades) {
    if (trade.timestamp === 0) {
      continue
    }
    if (initialTimestamp === 0) {
      initialTimestamp = trade.timestamp
    } else {
      initialTimestamp += timeSpacing
    }

    const price = trade.price

    updatingCandle = {
      open: updatingCandle.close,
      close: price,
      high: price,
      low: price,
      timestamp: initialTimestamp,
      amountSwaps: 1,
    };
    candles.push(updatingCandle)
  }

  return { candles, updatingCandle }
}

