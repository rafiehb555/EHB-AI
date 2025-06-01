"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function AffiliateCard() {
  const [affiliateData, setAffiliateData] = useState({
    referralCode: '',
    referrals: [],
    totalEarnings: 0,
    pendingEarnings: 0,
    commissionHistory: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAffiliateData = async () => {
    try {
      const res = await fetch("/api/affiliate");
      const data = await res.json();
      setAffiliateData(data);
      setError(null);
    } catch (e) {
      setError("Failed to fetch affiliate data");
    }
  };

  useEffect(() => {
    fetchAffiliateData();
  }, []);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(affiliateData.referralCode);
    alert("Referral code copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-full">
      <span className="text-2xl font-semibold mb-2">Affiliate Program</span>
      {loading ? <LoadingSpinner /> : null}
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : null}
      
      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-medium">Your Referral Code</span>
            <div className="flex items-center mt-1">
              <span className="text-blue-600 font-mono">{affiliateData.referralCode}</span>
              <button
                className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                onClick={copyReferralCode}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Total Earnings</div>
            <div className="text-xl font-bold text-green-600">{affiliateData.totalEarnings} Coins</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Pending Earnings</div>
            <div className="text-xl font-bold text-yellow-600">{affiliateData.pendingEarnings} Coins</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Active Referrals</h3>
          <div className="text-sm text-gray-600">
            {affiliateData.referrals.filter(r => r.status === 'active').length} active referrals
          </div>
        </div>

        {affiliateData.commissionHistory.length > 0 && (
          <div className="w-full">
            <h3 className="font-semibold mb-2">Commission History</h3>
            <ul className="text-sm w-full max-h-40 overflow-y-auto">
              {affiliateData.commissionHistory.map((commission, index) => (
                <li key={index} className="flex justify-between border-b py-1">
                  <div>
                    <span className="font-medium">{commission.source}</span>
                    <span className="ml-2 text-gray-500">{commission.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">+{commission.amount} Coins</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      commission.status === 'paid' ? 'bg-green-100 text-green-800' :
                      commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {commission.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 