import { create } from "zustand";

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

export const useTransactionStore = create<State>((set) => ({
  transactions: [],

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
}));
