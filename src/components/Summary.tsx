"use client";

import { useTransactionStore } from "@/store/useTransactionStore";

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
    <div className=" bg-white p-6 rounded-lg shadow-md max-w-5xl w-full mt-20">
      <h2 className=" text-lg font-semibold text-gray-800 mb-4">Summary</h2>
      <div className=" flex justify-between mb-2">
        <span className=" text-green-600 font-semibold"> Total Income:</span>
        <span>₦{income.toLocaleString()}</span>
      </div>
      <div className=" flex justify-between mb-2">
        <span className=" text-green-600 font-semibold"> Total Expense:</span>
        <span>₦{expense.toLocaleString()}</span>
      </div>
      <div className=" flex justify-between mt-4 border-t pt-2">
        <span> Balance:</span>
        <span
          className={`font-bold ${
            balance >= 0 ? "text-green-700" : "text-red-700"
          }`}>
          ₦{balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
