"use client";

import { useTransactionStore } from "@/store/useTransactionStore";

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactionStore();
  if (transactions.length === 0) {
    return (
      <div className=" text-gray-500 text-center mt-4">
        No transactions yet.
      </div>
    );
  }
  return (
    <div className=" mt-6 w-full max-w-md space-y-4">
      <h2 className=" text-lg font-semibold text-gray-800">Transactions</h2>
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={`flex justify-between items-center p-4 border-1-4 rounded shadow ${
            tx.type === `income`
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          }`}>
          <div>
            <p className=" font-semibold">{tx.category}</p>
            <p className=" text-sm text-gray-600">
              {new Date(tx.date).toDateString()}
            </p>
          </div>
          <div className=" text-right">
            <p
              className={`font-bold ${
                tx.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
              {tx.type === "income" ? "+" : "-"}₦{tx.amount.toLocaleString()}
            </p>
            <button
              onClick={() => deleteTransaction(tx.id)}
              className=" text-xs text-gray-500 hover:text-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
