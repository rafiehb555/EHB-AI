"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function ServicesCard() {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (!serviceName) return;
    setLoading(true);
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: serviceName }),
    });
    setServiceName("");
    await fetchServices();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Services</span>
      {loading ? <LoadingSpinner /> : null}
      <div className="w-full mb-4">
        <input
          className="border rounded px-2 py-1 w-48 text-sm mr-2"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          placeholder="Request new service"
        />
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={handleAddService}
          disabled={loading || !serviceName}
        >
          Add
        </button>
      </div>
      <ul className="w-full max-h-40 overflow-y-auto text-sm">
        {services.map((srv) => (
          <li key={srv.id} className="flex justify-between border-b py-1">
            <span>{srv.name}</span>
            <span className={srv.status === "Active" ? "text-green-600" : "text-yellow-600"}>{srv.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 