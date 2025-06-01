"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function SQLLevelCard() {
  const [levelData, setLevelData] = useState({
    currentLevel: 1,
    progress: 0,
    upgradeHistory: [],
    nextLevelCost: 1000
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLevelData = async () => {
    try {
      const res = await fetch("/api/level");
      const data = await res.json();
      setLevelData(data);
      setError(null);
    } catch (e) {
      setError("Failed to fetch level data");
    }
  };

  useEffect(() => {
    fetchLevelData();
  }, []);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upgrade" })
      });
      const data = await res.json();
      
      if (data.success) {
        setLevelData(data);
        setError(null);
      } else {
        setError(data.message || "Upgrade failed");
      }
    } catch (e) {
      setError("Failed to process upgrade");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">SQL Level</span>
      {loading ? <LoadingSpinner /> : null}
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : null}
      
      <div className="w-full mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-medium">Level {levelData.currentLevel}</span>
          <span className="text-gray-600">Next: {levelData.nextLevelCost} Coins</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${levelData.progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Progress: {levelData.progress}%
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleUpgrade}
        disabled={loading || levelData.progress < 100}
      >
        Upgrade Level
      </button>

      {levelData.upgradeHistory.length > 0 && (
        <div className="w-full mt-4">
          <h3 className="font-semibold mb-2">Upgrade History</h3>
          <ul className="text-sm w-full max-h-40 overflow-y-auto">
            {levelData.upgradeHistory.map((upgrade, index) => (
              <li key={index} className="flex justify-between border-b py-1">
                <span>Level {upgrade.fromLevel} → {upgrade.toLevel}</span>
                <span className="text-gray-500">{upgrade.cost} Coins</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 