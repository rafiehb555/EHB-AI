"use client";
import { useState } from "react";

export default function SettingsCard() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Settings</span>
      <div className="w-full mb-4">
        <label className="block text-sm font-medium mb-1">Theme</label>
        <select
          className="border rounded px-2 py-1 w-48 text-sm mb-2"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label className="block text-sm font-medium mb-1">Language</label>
        <select
          className="border rounded px-2 py-1 w-48 text-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ur">Urdu</option>
        </select>
      </div>
      <div className="text-xs text-gray-400">(Mock settings, can be extended)</div>
    </div>
  );
} 