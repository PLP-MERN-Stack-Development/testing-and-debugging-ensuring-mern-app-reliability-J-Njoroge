import { useState, useEffect } from 'react';
import axios from 'axios';

interface Bug {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

export default function BugList() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBugs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bugs');
      setBugs(res.data);
    } catch (err) {
      console.error('Failed to fetch bugs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const updateStatus = async (id: string, status: Bug['status']) => {
    await axios.put(`http://localhost:5000/api/bugs/${id}`, { status });
    fetchBugs();
  };

  const deleteBug = async (id: string) => {
    if (confirm('Delete this bug permanently?')) {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      fetchBugs();
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading bugs...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">All Reported Bugs</h2>
      
      {bugs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 italic">No bugs reported yet. Be the first!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bugs.map((bug) => (
            <div key={bug._id} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{bug.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{bug.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  bug.status === 'open' ? 'bg-red-100 text-red-800' :
                  bug.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {bug.status}
                </span>
                
                <div className="flex gap-3 text-sm">
                  {bug.status === 'open' && (
                    <button onClick={() => updateStatus(bug._id, 'in-progress')} className="text-blue-600 hover:underline">
                      Start
                    </button>
                  )}
                  {bug.status === 'in-progress' && (
                    <button onClick={() => updateStatus(bug._id, 'resolved')} className="text-green-600 hover:underline">
                      Resolve
                    </button>
                  )}
                  <button onClick={() => deleteBug(bug._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}