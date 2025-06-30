"use client";

import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Chart } from "@/components/Chart";
import { Summary } from "@/components/Summary";
import { TransactionList } from "@/components/TransactionList";

// import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-4 tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Take control of your finances with ease
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form and Summary */}
          <div className="xl:col-span-1 space-y-8">
            <AddTransactionForm />
            <Summary />
          </div>

          {/* Right Column - Chart and Transactions */}
          <div className="xl:col-span-2 space-y-8">
            <Chart />
            <TransactionList />
          </div>
        </div>
      </div>
    </main>
  );
}
