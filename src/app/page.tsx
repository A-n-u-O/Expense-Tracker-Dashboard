"use client";

import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Chart } from "@/components/Chart";
import { Summary } from "@/components/Summary";
import { TransactionList } from "@/components/TransactionList";

// import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <main className=" flex flex-col min-h-screen items-center justify-center bg-blue-100">
      <h1 className=" mb-20 font-extralight text-8xl">Expense Tracker Dashboard</h1>
      <AddTransactionForm /> {/* <TestComponent /> */}
      <Summary/>
      <Chart/>
      <TransactionList />
    </main>
  );
}
