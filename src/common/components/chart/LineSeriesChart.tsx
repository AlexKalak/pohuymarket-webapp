'use client'

import { LineData, ColorType, createChart, IChartApi, ISeriesApi, LineSeries, Time, UTCTimestamp } from 'lightweight-charts'
import { useEffect, useRef, useState } from 'react';


function pointToLineData(point: Point): LineData {
  return {
    time: point.time as UTCTimestamp,
    value: point.value
  }
}

function pointArrayToLineSeriesData(pointArray: Point[]): LineData[] {
  const result: LineData[] = []
  for (const point of pointArray) {
    result.push(pointToLineData(point))
  }

  return result
}

export type Point = {
  value: number
  time: number
}

interface ChartComponentColor {
  backgroundColor: string
  lineColor: string
  textColor: string
  areaTopColor: string
  areaBottomColor: string
}

interface ChartComponentProps {
  pointsOfLines: {
    points: Point[],
    name: string,
    color: string,
  }[],
  lastPointOfLines: {
    point: Point | null,
    name: string,
  }[],
  colors?: ChartComponentColor
}

export const LineChart = ({ pointsOfLines, lastPointOfLines, colors }: ChartComponentProps) => {
  const {
    backgroundColor = 'black',
    lineColor = '#2962FF',
    textColor = 'white',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = {}

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<"Line">>>(null)

  const [chart, setChart] = useState<IChartApi>()

  useEffect(
    () => {
      if (!chartContainerRef?.current) return;

      const handleResize = () => {
        if (!chart) return;

        chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
      };


      let chart: IChartApi | null = null

      chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true,   // <-- key option
        },
        grid: {
          vertLines: {
            color: 'rgba(255, 255, 255, 0.4)',   // color of vertical grid lines
            style: 1,                             // line style (0=solid, 1=dotted, 2=dashed)
            visible: true,                        // show/hide vertical lines
          },
          horzLines: {
            color: 'rgba(255, 255, 255, 0.4)',   // color of horizontal grid lines
            style: 1,
            visible: true,
          },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientWidth * 0.4
      });

      chart.timeScale().fitContent();
      setChart(chart)


      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart?.remove();
      };
    },
    [setChart, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  useEffect(() => {
    if (!chart) {
      return
    }

    seriesMapRef.current = new Map<string, ISeriesApi<"Line">>()
    for (const pointsOfLine of pointsOfLines) {
      const series = chart.addSeries(LineSeries, {
        color: pointsOfLine.color
      });
      seriesMapRef.current.set(pointsOfLine.name, series)

    }

    return () => {
      if (seriesMapRef?.current) {
        for (const [, value] of seriesMapRef.current) {
          chart.removeSeries(value)
        }
      }
    }

  }, [chart, pointsOfLines])

  useEffect(() => {
    if (!seriesMapRef.current) {
      return
    }

    for (const pointsOfLine of pointsOfLines) {
      const series = seriesMapRef.current.get(pointsOfLine.name)
      if (!series) {
        continue
      }
      series.setData(pointArrayToLineSeriesData(pointsOfLine.points))

    }

    for (const lastPointOfLine of lastPointOfLines) {
      const series = seriesMapRef.current.get(lastPointOfLine.name)
      if (!series) {
        continue
      }
      if (!lastPointOfLine.point) {
        continue
      }
      series.update(pointToLineData(lastPointOfLine.point))
    }
  }, [pointsOfLines, lastPointOfLines])

  return (
    <div className="w-full" style={{ aspectRatio: 7 / 3 }} ref={chartContainerRef}>
    </div>
  )

}

export default LineChart


