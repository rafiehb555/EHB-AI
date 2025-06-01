"use client";
import { useState } from "react";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Wallet", href: "#wallet" },
  { name: "SQL Level", href: "#sql-level" },
  { name: "Affiliate", href: "#affiliate" },
  { name: "Services", href: "#services" },
  { name: "Notifications", href: "#notifications" },
  { name: "AI Agent", href: "#agent" },
  { name: "Auth", href: "#auth" },
  { name: "Profile", href: "#profile" },
  { name: "Settings", href: "#settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-40 transform transition-transform duration-200 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:block`}
      >
        <div className="p-6 font-bold text-xl text-center border-b">EHB Menu</div>
        <nav className="flex flex-col gap-2 p-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
} 