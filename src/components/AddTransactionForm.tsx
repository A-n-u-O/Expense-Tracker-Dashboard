"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { useState } from "react";

export const AddTransactionForm = () => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setType("expense");
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md w-full">
      <h2 className=" text-xl font-semibold text-gray-800">Add Transaction</h2>
      {successMessage && (
        <div className=" bg-green-100 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}
      <div className=" flex space-x-4">
        <label className=" flex items-center space-x-1">
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
            className=" accent-green-500"
          />
          <span>Income</span>
        </label>

        <label className=" flex items-center space-x-1">
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
            className=" accent-red-500"
          />
          <span>Expense</span>
        </label>
      </div>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className=" w-full p-2 border rounded-md"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className=" w-full p-2 border rounded-md"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className=" w-full p-2 border rounded-md"
      />

      <button
        type="submit"
        className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        {" "}
        Add Transaction
      </button>
    </form>
  );
};
