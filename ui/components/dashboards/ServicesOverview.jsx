import React from 'react';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-red-100 text-red-800'
};

export const ServicesOverview = ({ services }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Services</h2>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{service.name.charAt(0)}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">Service ID: {service.id}</p>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[service.status]}`}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
          View All Services
        </button>
      </div>
    </div>
  );
}; 