"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

export const Summary = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Wallet className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Financial Summary</h2>
      </div>

      <div className="space-y-6">
        {/* Income */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Total Income</p>
              <p className="text-2xl font-bold text-green-800">₦{income.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-red-700 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-red-800">₦{expense.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className={`p-6 rounded-xl border-2 ${
          balance >= 0 
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200" 
            : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
        }`}>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Current Balance</p>
            <p className={`text-3xl font-bold ${
              balance >= 0 ? "text-blue-700" : "text-red-700"
            }`}>
              ₦{balance.toLocaleString()}
            </p>
            <p className={`text-sm mt-2 ${
              balance >= 0 ? "text-blue-600" : "text-red-600"
            }`}>
              {balance >= 0 ? "You're doing great!" : "Consider reducing expenses"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
