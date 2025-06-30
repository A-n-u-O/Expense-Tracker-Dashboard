"use client";

import { AddTransactionForm } from "@/components/AddTransactionForm";

// import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <main className=" flex min-h-screen items-center justify-center bg-blue-100">
      <AddTransactionForm /> {/* <TestComponent /> */}
    </main>
  );
}
