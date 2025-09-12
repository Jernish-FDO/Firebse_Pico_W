// --- FILE: src/components/Header.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header({ onLogout }) {
  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="text-blue-500 text-2xl mr-3" />
            <h1 className="text-xl font-bold">Smart Home Control</h1>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-green-400">
              <FontAwesomeIcon icon={faCircle} className="mr-2 text-green-500 animate-pulse" />
              Connected
            </span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors flex items-center font-semibold"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;