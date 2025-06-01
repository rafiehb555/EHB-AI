import React, { useState } from 'react';

const menuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '📊',
    active: true
  },
  {
    id: 'services',
    name: 'Services',
    icon: '🛠️',
    subItems: ['GoSellr', 'JPS', 'OBS', 'WMS']
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: '💰',
    subItems: ['Balance', 'Transactions', 'Locked Coins']
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: '👤',
    subItems: ['Settings', 'Verification', 'SQL Level']
  },
  {
    id: 'support',
    name: 'Support',
    icon: '💬',
    subItems: ['AI Assistant', 'Tickets', 'FAQ']
  }
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState(['dashboard']);

  const toggleItem = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="w-64 bg-white h-screen shadow-sm fixed left-0 top-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">EHB Platform</h1>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-2">
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                expandedItems.includes(item.id) ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <span className="text-gray-700">{item.name}</span>
              </div>
              {item.subItems && (
                <span className="text-gray-400">
                  {expandedItems.includes(item.id) ? '▼' : '▶'}
                </span>
              )}
            </button>

            {item.subItems && expandedItems.includes(item.id) && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600">👤</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">VIP Member</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 