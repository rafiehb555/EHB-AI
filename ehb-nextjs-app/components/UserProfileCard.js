"use client";
import { useEffect, useState } from "react";

export default function UserProfileCard() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data.user);
    setForm({
      name: data.user.name,
      email: data.user.email,
      phone: data.user.phone,
      address: data.user.address,
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEdit(false);
    await fetchUser();
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">User Profile</span>
      {edit ? (
        <form className="flex flex-col items-center w-full" onSubmit={handleUpdate}>
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1 w-48 text-sm mb-2"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <div className="text-center w-full">
          <div className="text-lg font-bold mb-2">{user.name}</div>
          <div className="text-sm text-gray-600 mb-1">Email: {user.email}</div>
          <div className="text-sm text-gray-600 mb-1">Phone: {user.phone}</div>
          <div className="text-sm text-gray-600 mb-1">Address: {user.address}</div>
          <div className="text-xs text-gray-400 mb-2">Role: {user.role}</div>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mt-2"
            onClick={() => setEdit(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
} 