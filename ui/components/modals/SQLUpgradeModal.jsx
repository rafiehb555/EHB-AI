import React, { useState } from 'react';

const sqlLevels = {
  Basic: {
    requirements: {
      balance: 100,
      verification: 'Basic KYC',
      services: 1
    },
    benefits: [
      'Access to basic services',
      'Standard support',
      'Basic transaction limits'
    ]
  },
  Normal: {
    requirements: {
      balance: 500,
      verification: 'Enhanced KYC',
      services: 2
    },
    benefits: [
      'Access to premium services',
      'Priority support',
      'Higher transaction limits',
      'Lower fees'
    ]
  },
  High: {
    requirements: {
      balance: 1000,
      verification: 'Full KYC',
      services: 3
    },
    benefits: [
      'Access to all services',
      '24/7 support',
      'Maximum transaction limits',
      'Lowest fees',
      'Early access to new features'
    ]
  },
  VIP: {
    requirements: {
      balance: 5000,
      verification: 'VIP Verification',
      services: 'All'
    },
    benefits: [
      'Exclusive VIP services',
      'Dedicated support team',
      'Unlimited transactions',
      'Zero fees',
      'Priority access to all features',
      'Special rewards program'
    ]
  }
};

export const SQLUpgradeModal = ({ currentLevel, onClose, onUpgrade }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [confirmUpgrade, setConfirmUpgrade] = useState(false);

  const handleUpgrade = () => {
    if (confirmUpgrade) {
      onUpgrade(selectedLevel);
      onClose();
    } else {
      setConfirmUpgrade(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">SQL Level Upgrade</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(sqlLevels).map(([level, data]) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedLevel === level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold mb-2">{level}</div>
              <div className="text-sm text-gray-600">
                Required Balance: {data.requirements.balance} EHBGC
              </div>
            </button>
          ))}
        </div>

        {selectedLevel && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="text-sm space-y-1">
                <li>• Balance: {sqlLevels[selectedLevel].requirements.balance} EHBGC</li>
                <li>• Verification: {sqlLevels[selectedLevel].requirements.verification}</li>
                <li>• Active Services: {sqlLevels[selectedLevel].requirements.services}</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="text-sm space-y-1">
                {sqlLevels[selectedLevel].benefits.map((benefit, index) => (
                  <li key={index}>• {benefit}</li>
                ))}
              </ul>
            </div>

            {confirmUpgrade ? (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Are you sure you want to upgrade to {selectedLevel}? This will lock {sqlLevels[selectedLevel].requirements.balance} EHBGC in your wallet.
                </p>
              </div>
            ) : null}

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {confirmUpgrade ? 'Confirm Upgrade' : 'Upgrade to ' + selectedLevel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 