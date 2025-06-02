import React, { useState, useEffect } from 'react';

const fetchAgentStatus = async () => {
  const res = await fetch('/api/ai/agent-status');
  const data = await res.json();
  return data.agents || [];
};

const fetchMultiAgentSearch = async (query) => {
  // Placeholder: This should call the multi-agent search API
  const res = await fetch('/api/ai/multi-agent-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: query }),
  });
  return await res.json();
};

export default function EhbAIAgentDashboard() {
  const [statusList, setStatusList] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Poll agent status every 5 seconds
  useEffect(() => {
    const getStatus = async () => setStatusList(await fetchAgentStatus());
    getStatus();
    const interval = setInterval(getStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const data = await fetchMultiAgentSearch(search);
      setResults(data.results || []);
    } catch (err) {
      setResults([{ provider: 'all', error: err.message }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side panel: Agent status */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-bold mb-4">Agent Status</h2>
        <ul>
          {statusList.map((agent) => (
            <li key={agent.name} className={`mb-2 flex items-center ${agent.status === 'working' ? 'text-green-600' : 'text-red-600'}`}> 
              <span className="w-3 h-3 rounded-full mr-2" style={{ background: agent.status === 'working' ? '#22c55e' : '#ef4444' }}></span>
              <span className="font-medium">{agent.name}</span>
              <span className="ml-2 text-xs">{agent.status}</span>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">EHB AI Multi-Agent Dashboard</h1>
        <form onSubmit={handleSearch} className="flex mb-6">
          <input
            type="text"
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
            placeholder="Search across all agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r font-semibold hover:bg-blue-700">Search</button>
        </form>
        {loading && <div className="mb-4 text-blue-600">Searching all agents...</div>}
        <div className="space-y-4">
          {results.map((res, idx) => (
            <div key={idx} className="border rounded p-4 bg-white shadow">
              <div className="font-bold mb-1">{res.provider || 'Unknown Agent'}</div>
              {res.result && <div className="text-gray-800 whitespace-pre-wrap">{JSON.stringify(res.result)}</div>}
              {res.error && <div className="text-red-600">Error: {res.error}</div>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 