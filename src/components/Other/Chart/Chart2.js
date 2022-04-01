
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import React, { useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import { Chart, ChartCanvas } from "react-stockcharts";
import { Annotate, buyPath, Label, SvgPathAnnotation } from "react-stockcharts/lib/annotation";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { fitWidth } from "react-stockcharts/lib/helper";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  BarSeries,
  CandlestickSeries
} from "react-stockcharts/lib/series";
import {
  OHLCTooltip
} from "react-stockcharts/lib/tooltip";
import { last, head } from "react-stockcharts/lib/utils";




const ccxt = window.ccxt;

const candlesAppearance = {
  wickStroke: function fill(d) {
    return d.close > d.open ? "#22c55e" : "#ef4444";
  },
  fill: function fill(d) {
    return d.close > d.open ? "#22c55e" : "#ef4444";
  },
  stroke: "rgb(255 255 255 / 0)",
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 0.8,
  clip: false
}

const ChartComponent = ({ symbol = "BTCUSDT", exchange = "binance", since, timeframe = '15m' }) => {
  const [data, setData] = useState()
  const preTime = 1 * 1000 * 60 * 60 * 12
  const time = new Date(since).getTime() - preTime

  useEffect(() => {
    let exc = new ccxt[exchange]()

    const fetch = (async () => {
      let btc = (await exc.fetchOHLCV(symbol, timeframe, time, 200))
      btc = btc.map((b, i) => {
        let [date, open, high, low, close, volume] = b
        date = new Date(date)
        return { date, open, high, low, close, volume }
      })
      setData(btc)
    })
    fetch()
    // const fetchID = setInterval(() => { fetch() }, 2000)
    // return () => { clearInterval(fetchID) }
  }, [data])


  if (data == null) {
    return <><Skeleton height="400px" width="100%" /></>
  }
  return < Chart2 label={`${symbol} ${timeframe} (${exchange}) `} data={data} since={new Date(since).getTime()} />
}


let Chart2 = (props) => {
  const { label, data: initialData, width, ratio, since } = props;

  const xScaleProvider = discontinuousTimeScaleProvider
    .inputDateAccessor(d => d.date);
  const {
    data,
    xScale,
    xAccessor,
    displayXAccessor,
  } = xScaleProvider(initialData);
  const postDate = {
    onClick: console.log.bind(console),
    y: ({ yScale, datum }) => datum.close > datum.open ? yScale(datum.open) : yScale(datum.close),
    fill: "#86198F",
    opacity: 0.7,
    path: buyPath,
    tooltip: "Post date",
  };

  const start = xAccessor(head(data));
  const end = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [start, end];
  const margin = { left: 50, right: 50, top: 10, bottom: 30 }

  return (
    <ChartCanvas height={400}
      ratio={ratio}
      width={width}
      margin={margin}
      type='svg'
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
      padding={{
        left: 0,
        right: 0
      }}
    >
      <Label x={(width - margin.left - margin.right) / 2} y={30}
        fontSize="30" text={label} />
      <Chart id={1} height={300} yExtents={d => [d.high, d.low]} >
        <YAxis axisAt="left" orient="left" ticks={5}
          innerTickSize={-1 * (width - margin.left - margin.right)}
          tickStrokeDasharray={1}
          tickStrokeOpacity={0.1}
          tickStrokeWidth={1}
        />
        <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
        <CandlestickSeries  {...candlesAppearance} />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%b %d %H:%M")} />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4s")} />
        <OHLCTooltip origin={[10, 0]} />
        <Annotate with={SvgPathAnnotation}
          when={d => {
            const diff = new Date(since).getTime() - d.date.getTime()
            return diff <= 60 * 15 * 1000 && diff >= 0
          }}
          usingProps={postDate} />
      </Chart>
      <Chart id={2} origin={(w, h) => [0, h - 50]} height={50} yExtents={d => d.volume}>
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
        <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#22c55e" : "#ef4444"} />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
}
Chart2 = fitWidth(Chart2);

export default ChartComponent