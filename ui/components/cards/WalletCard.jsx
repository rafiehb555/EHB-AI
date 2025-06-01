import React, { useState } from 'react';

const mockTransactions = [
  { id: 1, type: 'deposit', amount: 500, timestamp: '2024-03-20T10:00:00Z', status: 'completed' },
  { id: 2, type: 'withdrawal', amount: -200, timestamp: '2024-03-19T15:30:00Z', status: 'pending' },
  { id: 3, type: 'transfer', amount: 100, timestamp: '2024-03-18T09:15:00Z', status: 'completed' }
];

export const WalletCard = ({ balance }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    // TODO: Implement deposit logic
    setShowDepositModal(false);
    setDepositAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">EHB Wallet</h2>
        <span className="text-sm text-gray-500">EHBGC</span>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">
          {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-gray-500 mt-1">Available Balance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setShowDepositModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Deposit
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
          Withdraw
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Locked Amount</span>
          <span className="font-medium text-gray-900">0.00 EHBGC</span>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-4">
        <button
          onClick={() => setShowTransactions(!showTransactions)}
          className="w-full text-left text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between"
        >
          <span>Recent Transactions</span>
          <span>{showTransactions ? '▼' : '▶'}</span>
        </button>

        {showTransactions && (
          <div className="mt-2 space-y-2">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} EHBGC
                  </p>
                  <p className="text-xs text-gray-500">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Deposit EHBGC</h3>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDepositModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 