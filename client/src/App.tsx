import { useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-2">
            Bug Tracker Pro
          </h1>
          <p className="text-gray-600 text-lg">Track, manage, and squash bugs with ease</p>
        </header>

        {/* Form */}
        <BugForm onBugAdded={() => setRefreshKey(k => k + 1)} />

        {/* List */}
        <BugList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;