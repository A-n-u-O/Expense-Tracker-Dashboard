"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { Calendar, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactionStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null

  if (transactions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No transactions yet</h3>
          <p className="text-gray-500">Start by adding your first transaction above</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Tag className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Recent Transactions</h2>
        <div className="ml-auto bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-600">{transactions.length} total</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`group p-4 rounded-xl border-2 transition-all hover:shadow-md ${
              tx.type === "income"
                ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-300"
                : "border-red-200 bg-gradient-to-r from-red-50 to-rose-50 hover:border-red-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  tx.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}>
                  <Tag className={`w-5 h-5 ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{tx.category}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {typeof window !== "undefined"
                        ? new Date(tx.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : tx.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-xl font-bold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete transaction"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
