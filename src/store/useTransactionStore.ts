import { create } from "zustand";
import { persist } from "zustand/middleware";

// Defines the shape of each item
export type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

type State = {
  // Array holding the data
  transactions: Transaction[];

  // Adds new entries
  addTransaction: (transaction: Transaction) => void;

  // Removes entries by id
  deleteTransaction: (id: string) => void;
};

export const useTransactionStore = create<State>()(persist((set) => ({
  transactions: [],

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
    
}),{name:'expense-tracker-store', // key in localStorage
        }));
