import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// Renders stock price chart using Chart.js

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const StockChart = ({ stock, data }) => {
  if (!data) return null;

  const chartData = {
    labels: ["Current", "High", "Low", "Open", "Prev Close"],
    datasets: [
      {
        label: stock,
        data: [data.c, data.h, data.l, data.o, data.pc],
        backgroundColor: "rgba(59,130,246,0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 KEY FIX
  };

  return (
    <div className="mt-6 w-full h-[350px] bg-white p-4 rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
