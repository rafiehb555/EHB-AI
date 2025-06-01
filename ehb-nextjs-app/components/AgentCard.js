"use client";
import { useEffect, useState } from "react";

export default function AgentCard() {
  const [status, setStatus] = useState("Idle");
  const [lastAction, setLastAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");

  const fetchAgent = async () => {
    const res = await fetch("/api/agent");
    const data = await res.json();
    setStatus(data.agentStatus);
    setLastAction(data.lastAction);
  };

  useEffect(() => {
    fetchAgent();
    const interval = setInterval(fetchAgent, 2000);
    return () => clearInterval(interval);
  }, []);

  const runAgent = async () => {
    if (!action) return;
    setLoading(true);
    await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setAction("");
    setTimeout(fetchAgent, 2000);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">AI Agent</span>
      <span className={`text-lg mb-2 ${status === "Running" ? "text-green-600" : "text-gray-600"}`}>Status: {status}</span>
      <div className="w-full mb-2">
        <input
          className="border rounded px-2 py-1 w-48 text-sm mr-2"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Enter agent action"
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={runAgent}
          disabled={loading || !action}
        >
          Run Agent
        </button>
      </div>
      {lastAction && (
        <div className="text-xs text-gray-500 mt-2">Last Action: {lastAction}</div>
      )}
    </div>
  );
} 