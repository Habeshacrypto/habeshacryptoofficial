"use client";

// ============================================================
// COMPONENT: TradingAnalyzer
// PURPOSE: Fetches OHLCV + Fibonacci + VWAP data from
//          https://fibbot.fun/api/chart/data and renders a
//          full TradingView lightweight-chart with overlays.
// API:     GET /api/chart/data?token_address=...&timeframe=...
// ============================================================

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

// ── Volume Profile helper ──
// Builds a price-bucketed volume histogram from OHLCV data
function buildVolumeProfile(
  ohlcv: OHLCVItem[],
  buckets = 40,
): { price: number; buyVol: number; sellVol: number }[] {
  if (!ohlcv.length) return [];
  const prices = ohlcv.map((c) => (c.high + c.low) / 2);
  const minP = Math.min(...ohlcv.map((c) => c.low));
  const maxP = Math.max(...ohlcv.map((c) => c.high));
  const step = (maxP - minP) / buckets;
  const profile = Array.from({ length: buckets }, (_, i) => ({
    price: minP + (i + 0.5) * step,
    buyVol: 0,
    sellVol: 0,
  }));
  ohlcv.forEach((c, i) => {
    const vol = c.close > c.open ? c.close - c.open : c.open - c.close;
    const idx = Math.min(Math.floor((prices[i] - minP) / step), buckets - 1);
    if (c.close >= c.open) profile[idx].buyVol += vol || step * 0.001;
    else profile[idx].sellVol += vol || step * 0.001;
  });
  return profile;
}

const API_BASE = "https://fibbot.fun/api/chart/data";

const TIMEFRAMES = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "15m", value: "15m" },
  { label: "1h", value: "1h" },
  { label: "4h", value: "4h" },
  { label: "1d", value: "1d" },
];

// Fibonacci level colors matching the screenshot
const FIB_COLORS: Record<string, string> = {
  "0": "#888888",
  "0.236": "#00bfff",
  "0.382": "#00e676",
  "0.5": "#ffd700",
  "0.618": "#b44fff",
  "0.786": "#ff5722",
  "0.886": "#aaaaaa",
  "1": "#ffffff",
};

interface OHLCVItem {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
interface VWAPItem {
  time: number;
  value: number;
}
interface ApiResponse {
  success: boolean;
  chart: {
    ohlcv: OHLCVItem[];
    fibLevels: Record<string, number>;
    vwapSeries: VWAPItem[];
    swingPoints: { swingHigh: number; swingLow: number };
  };
  currentPrice: number;
  symbol: string;
  tokenAddress: string;
  totalSupply: number;
  vwap: number;
}

declare global {
  interface Window {
    LightweightCharts: any;
  }
}

export default function TradingAnalyzer() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [timeframe, setTimeframe] = useState("15m");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candleSeriesRef = useRef<any>(null);

  // ── Load lightweight-charts from CDN once ──
  useEffect(() => {
    if (window.LightweightCharts) {
      setScriptReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src =
      "https://unpkg.com/lightweight-charts@4.1.3/dist/lightweight-charts.standalone.production.js";
    s.onload = () => setScriptReady(true);
    document.head.appendChild(s);
  }, []);

  // ── Render chart whenever data or container is ready ──
  const renderChart = useCallback(() => {
    if (
      !data ||
      !scriptReady ||
      !chartContainerRef.current ||
      !window.LightweightCharts
    )
      return;

    // Destroy previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // const LC = window.LightweightCharts;
    // const container = chartContainerRef.current;

    const LC = window.LightweightCharts;
    const container = chartContainerRef.current;
    const supply = data.totalSupply || 1_000_000_000;
    const mcapOhlcv = data.chart.ohlcv.map((c) => ({
      ...c,
      open: c.open * supply,
      high: c.high * supply,
      low: c.low * supply,
      close: c.close * supply,
    }));

    const chart = LC.createChart(container, {
      width: container.clientWidth,
      height: 420,
      layout: {
        background: { color: "#071224" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "rgba(0,255,136,0.04)" },
        horzLines: { color: "rgba(0,255,136,0.04)" },
      },
      crosshair: {
        mode: LC.CrosshairMode.Normal,
        vertLine: {
          color: "rgba(0,255,136,0.4)",
          labelBackgroundColor: "#00ff88",
        },
        horzLine: {
          color: "rgba(0,255,136,0.4)",
          labelBackgroundColor: "#00ff88",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(0,255,136,0.15)",
        textColor: "#64748b",
      },
      timeScale: {
        borderColor: "rgba(0,255,136,0.15)",
        textColor: "#64748b",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    chartRef.current = chart;

    // ── Candlestick series ──
    // const candleSeries = chart.addCandlestickSeries({
    //   upColor: "#00ff88",
    //   downColor: "#ff4444",
    //   borderUpColor: "#00ff88",
    //   borderDownColor: "#ff4444",
    //   wickUpColor: "#00ff88",
    //   wickDownColor: "#ff4444",
    // });

    // Auto-detect decimal precision from actual price data
    const samplePrice = data.chart.ohlcv[0]?.close ?? 1;
    const precision =
      samplePrice < 0.0001
        ? 8
        : samplePrice < 0.01
          ? 6
          : samplePrice < 1
            ? 4
            : 2;

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00ff88",
      downColor: "#ff4444",
      borderUpColor: "#00ff88",
      borderDownColor: "#ff4444",
      wickUpColor: "#00ff88",
      wickDownColor: "#ff4444",
      priceFormat: {
        type: "custom",
        formatter: (price: number) => {
          if (price >= 1_000_000_000)
            return `$${(price / 1_000_000_000).toFixed(2)}B`;
          if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(2)}M`;
          if (price >= 1_000) return `$${(price / 1_000).toFixed(2)}K`;
          return `$${price.toFixed(2)}`;
        },
        minMove: 1,
      },
      // priceFormat: {
      //   type: "price",
      //   precision: precision,
      //   minMove: parseFloat((1 / Math.pow(10, precision)).toFixed(precision)),
      // },
    });

    candleSeriesRef.current = candleSeries;
    // const candles = data.chart.ohlcv
    //   .map((c) => ({
    //     time: c.time as any,
    //     open: c.open,
    //     high: c.high,
    //     low: c.low,
    //     close: c.close,
    //   }))
    //   .sort((a, b) => a.time - b.time);
    const candles = mcapOhlcv
      .map((c) => ({
        time: c.time as any,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
      .sort((a, b) => a.time - b.time);
    candleSeries.setData(candles);

    // ── VWAP line ──
    if (data.chart.vwapSeries?.length) {
      const vwapSeries = chart.addLineSeries({
        color: "#6366f1",
        lineWidth: 2,
        title: "VWAP",
        priceLineVisible: false,
        lastValueVisible: true,
      });
      vwapSeries.setData(
        data.chart.vwapSeries
          // .map((v) => ({ time: v.time as any, value: v.value }))
          .map((v) => ({ time: v.time as any, value: v.value * supply }))
          .sort((a, b) => a.time - b.time),
      );
    }

    // ── Fibonacci price lines ──
    if (data.chart.fibLevels) {
      Object.entries(data.chart.fibLevels).forEach(([key, price]) => {
        const color = FIB_COLORS[key] ?? "#888888";
        candleSeries.createPriceLine({
          // price,
          price: price * supply,
          color,
          lineWidth: 1,
          lineStyle: LC.LineStyle.Dashed,
          axisLabelVisible: true,
          title: `Fib ${key}`,
        });
      });
    }

    // Fit content
    chart.timeScale().fitContent();

    // ── Volume Profile canvas overlay ──
    const drawVolumeProfile = () => {
      const canvas = canvasRef.current;
      if (!canvas || !candleSeriesRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = container.clientWidth;
      const H = 420;
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);

      const profile = buildVolumeProfile(data.chart.ohlcv, 40);
      const maxVol = Math.max(...profile.map((b) => b.buyVol + b.sellVol));
      if (!maxVol) return;

      // Max bar width = 8% of chart width
      const maxBarW = W * 0.08;
      // Left padding matches the chart's left edge (approx)
      const leftPad = 2;

      profile.forEach(({ price, buyVol, sellVol }) => {
        const yCoord = candleSeriesRef.current.priceToCoordinate(price);
        if (yCoord === null || yCoord < 0 || yCoord > H) return;

        const totalVol = buyVol + sellVol;
        const totalW = (totalVol / maxVol) * maxBarW;
        const buyW = (buyVol / maxVol) * maxBarW;
        const barH = Math.max(2, (H / 40) * 0.75);

        // sell portion (red)
        if (sellVol > 0) {
          ctx.fillStyle = "rgba(255, 68, 68, 0.45)";
          ctx.fillRect(leftPad, yCoord - barH / 2, totalW, barH);
        }
        // buy portion (green) on top
        if (buyVol > 0) {
          ctx.fillStyle = "rgba(0, 255, 136, 0.50)";
          ctx.fillRect(leftPad, yCoord - barH / 2, buyW, barH);
        }
      });
    };

    // Draw after a short delay to let the chart settle its price scale
    const drawTimer = setTimeout(drawVolumeProfile, 120);

    // Responsive resize
    const ro = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        setTimeout(drawVolumeProfile, 80);
      }
    });
    ro.observe(container);

    // Redraw on visible range change (zoom / scroll)
    chart.timeScale().subscribeVisibleLogicalRangeChange(() => {
      setTimeout(drawVolumeProfile, 30);
    });

    return () => {
      clearTimeout(drawTimer);
      ro.disconnect();
    };
  }, [data, scriptReady]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  // ── Fetch handler ──
  const handleFetch = async () => {
    if (!tokenAddress.trim()) {
      setError("Please enter a token address.");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);
    try {
      const url = `${API_BASE}?token_address=${encodeURIComponent(tokenAddress.trim())}&timeframe=${timeframe}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const json: ApiResponse = await res.json();
      if (!json.success) throw new Error("API returned success: false");
      setData(json);
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch chart data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatPrice = (n: number | undefined) => {
    if (n === undefined || n === null || isNaN(n)) return "—";
    return n < 0.001
      ? n.toExponential(4)
      : n.toLocaleString(undefined, { maximumSignificantDigits: 6 });
  };

  return (
    <section id="analyzer" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute inset-0 bg-[#071224]/20" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-[#00ff88]/4 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest mb-3 block">
            On-Chain Analysis
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white section-title">
            Trading Chart Analyzer
          </h2>
          <p className="font-body text-slate-400 text-base mt-6 max-w-xl mx-auto">
            Paste any token contract address, choose a timeframe, and instantly
            load a live candlestick chart with Fibonacci levels and VWAP.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="crypto-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Token address */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => {
                  setTokenAddress(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                placeholder="Paste token / contract address..."
                className="crypto-input pl-10 pr-10 font-mono text-sm"
                spellCheck={false}
              />
              {tokenAddress && (
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00ff88] transition-colors"
                >
                  {copied ? (
                    <Check size={14} className="text-[#00ff88]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </div>

            {/* Timeframe */}
            <div className="relative sm:w-36">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="crypto-input pl-10 appearance-none cursor-pointer"
              >
                {TIMEFRAMES.map((tf) => (
                  <option
                    key={tf.value}
                    value={tf.value}
                    style={{ background: "#0a1a35" }}
                  >
                    {tf.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleFetch}
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 sm:w-30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <TrendingUp size={15} />
                  Load Chart
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 mt-4 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <AlertCircle
                size={14}
                className="text-red-400 flex-shrink-0 mt-0.5"
              />
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* ── Chart area ── */}
        <div className="crypto-card overflow-hidden">
          {/* Chart header */}
          {data && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#00ff88]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <span className="font-mono text-xs text-slate-400 truncate max-w-xs">
                  {data.tokenAddress}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-slate-600 uppercase">
                  {timeframe}
                </span>
                <button
                  onClick={handleFetch}
                  className="text-slate-600 hover:text-[#00ff88] transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Fib legend */}
          {data?.chart.fibLevels && (
            <div className="flex flex-wrap gap-3 px-5 py-2 border-b border-[#00ff88]/5">
              {Object.entries(data.chart.fibLevels).map(([key, price]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-px"
                    style={{ background: FIB_COLORS[key] ?? "#888" }}
                  />
                  <span className="font-mono text-[10px] text-slate-600">
                    Fib {key}{" "}
                    <span style={{ color: FIB_COLORS[key] ?? "#888" }}>
                      ${formatPrice(price)}
                    </span>
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-px bg-[#6366f1]" />
                <span className="font-mono text-[10px] text-slate-600">
                  VWAP{" "}
                  <span className="text-[#6366f1]">
                    ${formatPrice(data.vwap)}
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* Chart container */}
          <div className="relative" style={{ minHeight: 420 }}>
            <div ref={chartContainerRef} className="w-full" />
            {/* Volume profile canvas — sits over chart, pointer-events off so chart stays interactive */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ width: "100%", height: 420 }}
            />

            {/* Empty state */}
            {!data && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Faded fake chart bg */}
                <svg
                  viewBox="0 0 700 300"
                  className="absolute inset-0 w-full h-full opacity-5"
                  preserveAspectRatio="none"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 60}
                      x2="700"
                      y2={i * 60}
                      stroke="#00ff88"
                      strokeWidth="0.5"
                      strokeDasharray="4,8"
                    />
                  ))}
                  {[
                    50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600,
                    650,
                  ].map((x, i) => {
                    const h = 40 + Math.sin(i * 0.8) * 30;
                    const y = 120 + Math.cos(i * 1.2) * 50;
                    const up = i % 3 !== 0;
                    return (
                      <g key={x}>
                        <line
                          x1={x}
                          y1={y - h * 0.4}
                          x2={x}
                          y2={y + h * 0.4}
                          stroke={up ? "#00ff88" : "#ff4444"}
                          strokeWidth="1"
                        />
                        <rect
                          x={x - 10}
                          y={y - h * 0.25}
                          width="20"
                          height={h * 0.5}
                          fill={up ? "#00ff88" : "#ff4444"}
                          opacity="0.7"
                        />
                      </g>
                    );
                  })}
                </svg>
                <TrendingUp size={36} className="text-[#00ff88]/20 mb-3" />
                <p className="font-heading text-sm text-slate-700 uppercase tracking-widest">
                  Paste a token address to load chart
                </p>
              </div>
            )}

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071224]/80 backdrop-blur-sm">
                <div className="w-10 h-10 border-2 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin mb-4" />
                <p className="font-mono text-xs text-[#00ff88] uppercase tracking-widest">
                  Fetching chart data...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
