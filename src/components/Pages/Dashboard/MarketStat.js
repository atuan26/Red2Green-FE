import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBitcoin, FaMoneyBill } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";

// const ccxt = window.ccxt;

const client = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

const MarketStat = () => {
  const [gnf, setGnf] = useState({})
  const [btc, setBtc] = useState(null)
  useEffect(() => {
    axios.get('https://api.alternative.me/fng/').then((res) => {
      let data = res.data.data[0]
      setTimeout(() => {
        setGnf(data);
      }, 1000);
    })
    client.onmessage = (message) => {
      setTimeout(() => {
        let btcPrice = JSON.parse(message.data)['p']
        setBtc(Number(btcPrice).toLocaleString('en-US', { maximumFractionDigits: 0 }))
      }, 1000);
    };
  }, [])
  return (
    <div className="w-full shadow-lg stats">
      <div className="stat">
        <div className="stat-figure text-success">
          <FaMoneyBill className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">Market Cap</div>
        <div className="stat-value">$1,981B</div>
        <div className="stat-desc">BTC: 41.8% ETH: 18.7%</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <GrTransaction className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">24h Vol</div>
        <div className="stat-value">$99,3B</div>
        <div className="stat-desc text-error">🔻4%</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-warning">
          <FaBitcoin className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">BTC</div>
        <div className="relative stat-value">
          {btc || <Skeleton />}
        </div>
        <div className="stat-desc text-success">↗︎ 22%</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Greed and Fear Index</div>
        <div className="stat-value  text-warning">{gnf.value || <Skeleton />}</div>
        <div className="stat-desc">
          <span className="text-warning font-bold">{gnf.value_classification ? <>{gnf.value_classification} (By <strong> alternative.me </strong>)</> : <Skeleton />} </span>
        </div>
      </div>
    </div >
  );
};

export default MarketStat;
