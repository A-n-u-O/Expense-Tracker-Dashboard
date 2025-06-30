'use client'
import { useTransactionStore } from '@/store/useTransactionStore'

export default function TestComponent() {
  const { transactions, addTransaction } = useTransactionStore()

  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() =>
          addTransaction({
            id: crypto.randomUUID(),
            type: 'income',
            category: 'Freelance',
            amount: 200,
            date: new Date().toISOString(),
          })
        }
      >
        Add Dummy Transaction
      </button>

      <pre className="mt-4 p-4 bg-white rounded shadow">
        {JSON.stringify(transactions, null, 2)}
      </pre>
    </div>
  )
}