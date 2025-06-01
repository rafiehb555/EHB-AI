"use client";
import { useState, useEffect } from "react";

export default function AuthCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    const res = await fetch("/api/auth");
    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Authentication</span>
      {user ? (
        <div className="text-center">
          <div className="text-lg font-bold mb-2">Welcome, {user.name}!</div>
          <div className="text-sm text-gray-600 mb-2">Email: {user.email}</div>
          <div className="text-xs text-gray-400">Role: {user.role}</div>
        </div>
      ) : (
        <form className="flex flex-col items-center w-full" onSubmit={handleLogin}>
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
        </form>
      )}
    </div>
  );
} 