'use client'

import { LineData, ColorType, createChart, IChartApi, ISeriesApi, LineSeries, Time, UTCTimestamp, LineType } from 'lightweight-charts'
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
    show: boolean
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

        chart.applyOptions({ width: chartContainerRef?.current?.clientWidth, height: chartContainerRef?.current?.clientHeight });
      };


      let chart: IChartApi | null = null

      console.log("NEW CHARTTTT")
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
        height: chartContainerRef.current.clientHeight,
      });

      // chart.timeScale().fitContent();
      chart.timeScale().applyOptions({
        shiftVisibleRangeOnNewBar: false,
      });

      seriesMapRef.current = new Map<string, ISeriesApi<"Line">>()
      setChart(chart)

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        seriesMapRef.current = new Map<string, ISeriesApi<"Line">>()

        chart?.remove();
      };
    },
    [setChart, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  useEffect(() => {
    if (!chart || !seriesMapRef.current) {
      return
    }

    for (const pointsOfLine of pointsOfLines) {
      const existingSeries = seriesMapRef.current.get(pointsOfLine.name)

      if (existingSeries) {
        if (!pointsOfLine.show) {
          chart.removeSeries(existingSeries);
          seriesMapRef.current.delete(pointsOfLine.name)
        }
        continue
      }

      const series = chart.addSeries(LineSeries, {
        lineType: LineType.WithSteps,
        color: pointsOfLine.color
      });


      if (!pointsOfLine.show || pointsOfLine.points.length === 0) {
        continue
      }

      series.setData(pointArrayToLineSeriesData(pointsOfLine.points))
      seriesMapRef.current.set(pointsOfLine.name, series)
      console.log("added new series", pointsOfLine.points.length, pointsOfLine.name)
    }

  }, [chart, pointsOfLines])

  useEffect(() => {
    if (!seriesMapRef.current) {
      return
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
  }, [lastPointOfLines])

  return (
    <div className="w-full" style={{ aspectRatio: 7 / 3 }} ref={chartContainerRef}>
    </div>
  )

}

export default LineChart


