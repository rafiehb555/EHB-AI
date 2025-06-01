"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data.notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    setLoading(true);
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchNotifications();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Notifications</span>
      {loading ? <LoadingSpinner /> : null}
      <ul className="w-full max-h-40 overflow-y-auto text-sm">
        {notifications.map((n) => (
          <li key={n.id} className={`flex justify-between border-b py-1 items-center ${n.read ? 'opacity-60' : ''}`}>
            <div>
              <span className="font-medium">{n.message}</span>
              <span className="ml-2 text-gray-400 text-xs">{n.date}</span>
            </div>
            {!n.read && (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-2 disabled:opacity-50"
                onClick={() => markAsRead(n.id)}
                disabled={loading}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 