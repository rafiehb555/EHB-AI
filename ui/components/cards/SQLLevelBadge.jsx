import React from 'react';

const levelColors = {
  Free: 'bg-gray-100 text-gray-800',
  Basic: 'bg-blue-100 text-blue-800',
  Normal: 'bg-green-100 text-green-800',
  High: 'bg-purple-100 text-purple-800',
  VIP: 'bg-yellow-100 text-yellow-800'
};

export const SQLLevelBadge = ({ level }) => {
  const colorClass = levelColors[level] || levelColors.Free;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      <span className="mr-1">SQL</span>
      <span>{level}</span>
    </div>
  );
}; 