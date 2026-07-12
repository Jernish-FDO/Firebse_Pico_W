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
    <nav className="bg-slate-950/60 backdrop-blur-xl shadow-2xl border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <FontAwesomeIcon icon={faHome} className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">SmartHome</h1>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/timer" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-sm font-semibold text-slate-300 hover:text-white transition-all hover:scale-105">Timers</NavLink>
            <NavLink to="/schedules" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-sm font-semibold text-slate-300 hover:text-white transition-all hover:scale-105">Schedules</NavLink>
            <span className="text-[11px] flex items-center gap-2 font-bold text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               System Online
            </span>
            <button onClick={onLogout} className="text-sm text-slate-500 hover:text-rose-400 font-semibold transition-colors">Logout</button>
          </div>
          <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"><FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-5 w-5" /></button></div>
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