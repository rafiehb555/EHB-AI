"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function WalletCard() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    const res = await fetch("/api/wallet");
    const data = await res.json();
    setBalance(data.balance);
    setHistory(data.history);
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleAction = async (type) => {
    setLoading(true);
    await fetch("/api/wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount: Number(amount) }),
    });
    setAmount(0);
    await fetchWallet();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Wallet</span>
      {loading ? <LoadingSpinner /> : <span className="text-3xl font-bold text-green-600 mb-4">{balance} Coins</span>}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={() => handleAction("deposit")}
          disabled={loading || !amount}
        >
          Deposit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={() => handleAction("withdraw")}
          disabled={loading || !amount}
        >
          Withdraw
        </button>
      </div>
      <div className="w-full">
        <h3 className="font-semibold mb-2">Transaction History</h3>
        <ul className="text-sm w-full max-h-40 overflow-y-auto">
          {history.map((tx) => (
            <li key={tx.id} className="flex justify-between border-b py-1">
              <span className={tx.type === "deposit" ? "text-green-600" : "text-red-600"}>{tx.type}</span>
              <span>{tx.amount} Coins</span>
              <span className="text-gray-500">{tx.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 