import { useState } from "react";
import { fetchStock } from "../../services/api";
import StockChart from "./StockChart";
import { STOCKS } from "../../data/stocks";
// Stock search with autocomplete, loading, and error states
// Displays market open / closed status based on US trading hours

/* 🕒 MARKET STATUS HELPER */
const isMarketOpen = () => {
  const now = new Date();

  const estTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const hours = estTime.getHours();
  const minutes = estTime.getMinutes();
  const day = estTime.getDay(); // 0 = Sunday, 6 = Saturday

  // Weekend
  if (day === 0 || day === 6) return false;

  // Market hours: 9:30 AM – 4:00 PM EST
  if (hours > 9 && hours < 16) return true;
  if (hours === 9 && minutes >= 30) return true;
  if (hours === 16 && minutes === 0) return true;

  return false;
};

const StockSearch = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // AUTOCOMPLETE FILTER
  const filteredStocks =
    query.length === 0
      ? []
      : STOCKS.filter(
          (s) =>
            s.symbol.toLowerCase().includes(query.toLowerCase()) ||
            s.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

  const handleFetch = async () => {
    if (!STOCKS.some((s) => s.symbol === selected)) {
      setError("Please select a valid stock from suggestions");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetchStock(selected);

      if (!res.data || res.data.c === 0) {
        setError("Stock not found ❌");
        return;
      }

      setData(res.data);
      setShowSuggestions(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch stock data ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 p-4 rounded relative overflow-visible">
      <h2 className="text-xl font-semibold mb-1">Search Stocks</h2>

      {/* MARKET STATUS */}
      <div className="mb-3">
        {isMarketOpen() ? (
          <span className="text-green-600 font-medium">🟢 Market Open</span>
        ) : (
          <span className="text-red-600 font-medium">🔴 Market Closed</span>
        )}
      </div>

      {/* INPUT + AUTOCOMPLETE */}
      <div className="relative w-full md:w-1/3">
        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search stock (Apple, AAPL, GOOGL...)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setError("");
          }}
        />

        {showSuggestions && filteredStocks.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50 max-h-60 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setQuery(`${stock.symbol} - ${stock.name}`);
                  setSelected(stock.symbol);
                  setShowSuggestions(false);
                }}
              >
                <strong className="text-blue-600">{stock.symbol}</strong> –{" "}
                {stock.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleFetch}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60 hover:bg-blue-700 transition"
        disabled={loading}
      >
        Fetch Stock Data
      </button>

      {/* LOADING SPINNER */}
      {loading && (
        <div className="mt-3 flex items-center gap-2 text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Fetching stock data...</span>
        </div>
      )}

      {/* ERROR BOX */}
      {error && (
        <div className="mt-3 bg-red-100 text-red-700 p-2 rounded border border-red-300">
          ❌ {error}
        </div>
      )}

      {/* CHART */}
      {data && <StockChart stock={selected} data={data} />}
    </section>
  );
};

export default StockSearch;
