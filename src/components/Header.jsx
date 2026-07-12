// --- FILE: src/components/Header.jsx ---

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

function Header({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLinkStyle = { color: '#3b82f6' };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <FontAwesomeIcon icon={faHome} className="text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">SmartHome</h1>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/timer" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Timers</NavLink>
            <NavLink to="/schedules" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Schedules</NavLink>
            <span className="text-xs flex items-center gap-2 font-medium text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               Connected
            </span>
            <button onClick={onLogout} className="text-sm text-slate-400 hover:text-red-400 font-medium transition-colors">Logout</button>
          </div>
          <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"><FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-5 w-5" /></button></div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-slate-900 border-b border-slate-800`}>
        <div className="px-4 py-4 space-y-1">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-white bg-slate-800">Dashboard</Link>
          <Link to="/timer" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Timers</Link>
          <Link to="/schedules" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Schedules</Link>
          <div className="border-t border-slate-800 my-2"></div>
          <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-slate-800 hover:text-red-300">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;