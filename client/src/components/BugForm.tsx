import { useState } from 'react';
import axios from 'axios';

interface Props {
  onBugAdded: () => void;
}

export default function BugForm({ onBugAdded }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/bugs', {
        title,
        description,
        status: 'open'
      });
      setTitle('');
      setDescription('');
      onBugAdded();
    } catch (err) {
      alert('Failed to submit bug. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Report New Bug</h2>
      
      <input
        type="text"
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      
      <textarea
        placeholder="Describe the bug in detail..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Submitting...' : 'Submit Bug'}
      </button>
    </form>
  );
}