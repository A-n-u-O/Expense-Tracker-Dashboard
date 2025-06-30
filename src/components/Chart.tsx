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
import { PieChart } from "lucide-react";

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
          "#ef4444", "#3b82f6", "#10b981", "#f59e0b", 
          "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ₦${context.parsed.toLocaleString()}`;
          }
        }
      },
    },
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <PieChart className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Expense Breakdown</h2>
      </div>
      
      {expenses.length > 0 ? (
        <div className="h-80">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No expenses to display</p>
            <p className="text-sm text-gray-400 mt-1">Add some transactions to see your breakdown</p>
          </div>
        </div>
      )}
    </div>
  );
};
