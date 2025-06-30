"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export const Chart = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const expenses = transactions.filter((tx) => tx.type === "expense");

  //grouping by category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((tx) => {
    if (categoryTotals[tx.category]) {
      categoryTotals[tx.category] += tx.amount;
    } else {
      categoryTotals[tx.category] = tx.amount;
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#f87171", // red
          "#60a5fa", // blue
          "#34d399", // green
          "#fbbf24", // yellow
          "#a78bfa", // purple
          "#f472b6", // pink
          "#38bdf8", // cyan
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className=" mt-20 bg-white p-6 rounded-lg shadow-md max-w-5xl w-full">
      <h2 className=" text-lg font-semibold text-gray-800 mb-4">
        Expense Breakdown by category
      </h2>{" "}
      {expenses.length > 0 ? (
        <Pie data={data} />
      ) : (
        <p className=" text-gray-500 text-sm">No expenses to display</p>
      )}
    </div>
  );
};
