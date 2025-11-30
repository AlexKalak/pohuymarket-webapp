export type CandleDTO = {
  open?: number,
  close?: number,
  low?: number,
  high?: number,
  timestamp?: number,
  amountSwaps?: number

}

export class CandleModel {
  open: number
  close: number
  low: number
  high: number
  timestamp: number
  amountSwaps: number

  constructor(candleDTO?: CandleDTO) {
    if (candleDTO === undefined) {
      this.open = 0
      this.close = 0
      this.low = 0
      this.high = 0
      this.timestamp = 0
      this.amountSwaps = 0

      return
    }

    if (!candleDTO?.open || !candleDTO?.close || !candleDTO?.high || !candleDTO?.low) {
      throw new Error("Unable to construct CandleModel from CandleDTO provided")
    }

    this.open = Number(candleDTO.open)
    this.close = Number(candleDTO.close)
    this.low = Number(candleDTO.low)
    this.high = Number(candleDTO.high)
    this.timestamp = Number(candleDTO.timestamp)
    this.amountSwaps = Number(candleDTO.amountSwaps)
  }
}
