import React, { useState, useEffect } from 'react';
import { WalletCard } from '../components/cards/WalletCard';
import { SQLLevelBadge } from '../components/cards/SQLLevelBadge';
import { ServicesOverview } from '../components/dashboards/ServicesOverview';
import { ActivityFeed } from '../components/panels/ActivityFeed';
import { QuickActions } from '../components/panels/QuickActions';
import { Sidebar } from '../components/layout/Sidebar';
import { SQLUpgradeModal } from '../components/modals/SQLUpgradeModal';
import { DashboardCharts } from '../components/charts/DashboardCharts';

export default function MainDashboard() {
  const [userData, setUserData] = useState({
    name: "User",
    sqlLevel: "Basic",
    walletBalance: 0,
    services: [],
    recentActivity: []
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSQLUpgrade, setShowSQLUpgrade] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUserData = async () => {
      // Simulated API response
      const mockData = {
        name: "John Doe",
        sqlLevel: "VIP",
        walletBalance: 1250.50,
        services: [
          { id: 1, name: "GoSellr", status: "active" },
          { id: 2, name: "JPS", status: "active" },
          { id: 3, name: "OBS", status: "pending" }
        ],
        recentActivity: [
          { id: 1, type: "service_activation", message: "GoSellr service activated", timestamp: "2024-03-20T10:00:00Z" },
          { id: 2, type: "wallet_transaction", message: "Received 100 EHBGC", timestamp: "2024-03-19T15:30:00Z" }
        ]
      };
      setUserData(mockData);

      // Simulated notifications
      setNotifications([
        { id: 1, type: 'info', message: 'New service available: WMS', timestamp: new Date() },
        { id: 2, type: 'warning', message: 'SQL level upgrade available', timestamp: new Date() }
      ]);
    };

    fetchUserData();
  }, []);

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSQLUpgrade = (newLevel) => {
    // TODO: Implement SQL upgrade logic
    console.log('Upgrading to:', newLevel);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content Wrapper */}
      <div className="ml-64">
        {/* Header Section */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {userData.name}</h1>
                <button 
                  onClick={() => setShowSQLUpgrade(true)}
                  className="ml-2"
                >
                  <SQLLevelBadge level={userData.sqlLevel} />
                </button>
              </div>
              
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <span className="text-xl">🔔</span>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <p className="text-sm">{notification.message}</p>
                            <button
                              onClick={() => clearNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Message */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to EHB Platform!</h2>
            <p className="text-lg opacity-90">
              Your all-in-one solution for managing services, wallet, and more.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <WalletCard balance={userData.walletBalance} />
              <ServicesOverview services={userData.services} />
              <DashboardCharts />
              <ActivityFeed activities={userData.recentActivity} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              {/* Add more panels here */}
            </div>
          </div>
        </main>
      </div>

      {/* SQL Upgrade Modal */}
      {showSQLUpgrade && (
        <SQLUpgradeModal
          currentLevel={userData.sqlLevel}
          onClose={() => setShowSQLUpgrade(false)}
          onUpgrade={handleSQLUpgrade}
        />
      )}
    </div>
  );
} 