"use client";

import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Chart } from "@/components/Chart";
import { Summary } from "@/components/Summary";
import { TransactionList } from "@/components/TransactionList";

// import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <main className=" flex flex-col min-h-screen items-center justify-between p-8 bg-blue-100">
      <AddTransactionForm /> {/* <TestComponent /> */}
      <Summary/>
      <Chart/>
      <TransactionList />
    </main>
  );
}
