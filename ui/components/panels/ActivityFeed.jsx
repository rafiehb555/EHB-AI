import React from 'react';

const activityIcons = {
  service_activation: '🔄',
  wallet_transaction: '💰',
  sql_upgrade: '⭐',
  verification: '✓'
};

export const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg">{activityIcons[activity.type] || '📝'}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
}; 