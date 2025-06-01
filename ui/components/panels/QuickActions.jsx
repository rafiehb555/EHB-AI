import React from 'react';

const actions = [
  {
    id: 1,
    name: 'Upgrade SQL',
    icon: '⭐',
    description: 'Increase your service level',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 2,
    name: 'Verify Profile',
    icon: '✓',
    description: 'Complete KYC process',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    name: 'Add Service',
    icon: '➕',
    description: 'Activate new services',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 4,
    name: 'Support',
    icon: '💬',
    description: 'Get help from AI Assistant',
    color: 'bg-yellow-100 text-yellow-800'
  }
];

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900">{action.name}</span>
            <span className="text-xs text-gray-500">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 