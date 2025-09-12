// src/App.jsx
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking auth status
  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {user ? <DashboardPage /> : <LoginPage />}
    </div>
  );
}

export default App;