"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { Calendar, DollarSign, PlusCircle, Tag } from "lucide-react";
import { useEffect, useState } from "react";

export const AddTransactionForm = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !amount || !date) return alert("Please fill all fields.");

    addTransaction({
      id: crypto.randomUUID(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    });

    //Show success message
    setSuccessMessage("Transaction added successfully!");
    // Hide after 3 seconds
    setTimeout(() => setSuccessMessage(""), 5000);

    // Reset Form
    setCategory("");
    setAmount("");
  };

  if (!isMounted) return null;
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <PlusCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Add Transaction</h2>
      </div>

      {successMessage && (
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Transaction Type</label>
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="radio"
                value="income"
                checked={type === "income"}
                onChange={() => setType("income")}
                className="sr-only"
              />
              <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                type === "income" 
                  ? "border-green-500 bg-green-50 text-green-700" 
                  : "border-gray-200 bg-gray-50 hover:border-green-300"
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type === "income" ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <span className="font-medium">Income</span>
                </div>
              </div>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
                className="sr-only"
              />
              <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                type === "expense" 
                  ? "border-red-500 bg-red-50 text-red-700" 
                  : "border-gray-200 bg-gray-50 hover:border-red-300"
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type === "expense" ? "bg-red-500" : "bg-gray-300"}`}></div>
                  <span className="font-medium">Expense</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Category Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="e.g., Food, Transport, Salary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};
