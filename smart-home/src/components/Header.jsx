// --- FILE: src/components/Header.jsx ---

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faCircle, faSignOutAlt, faBars, faTimes, faCalendarCheck, faClock,
  faMicrochip, faToggleOn, faBolt
} from '@fortawesome/free-solid-svg-icons';

function Header({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLinkStyle = { color: '#3b82f6' };

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center"><FontAwesomeIcon icon={faHome} className="text-blue-500 text-2xl mr-3" /><h1 className="text-xl font-bold">Smart Home</h1></Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/timer" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="font-semibold text-slate-200 hover:text-blue-400">Timers</NavLink>
            <NavLink to="/schedules" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="font-semibold text-slate-200 hover:text-blue-400">Schedules</NavLink>
            <span className="text-sm font-medium text-green-400"><FontAwesomeIcon icon={faCircle} className="mr-2 text-green-500 animate-pulse" /> Connected</span>
            <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout</button>
          </div>
          <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700"><FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" /></button></div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-slate-800 absolute w-full shadow-xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Main Page Links */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
          <Link to="/timer" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><FontAwesomeIcon icon={faClock} className="w-5"/> Timers Page</Link>
          <Link to="/schedules" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><FontAwesomeIcon icon={faCalendarCheck} className="w-5"/> Schedules Page</Link>
          <div className="border-t border-slate-700 my-2 !mt-3 !mb-2"></div>
          
          {/* Dashboard Section Anchor Links */}
          <a href="/#device-status" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><FontAwesomeIcon icon={faMicrochip} className="w-5"/> Device Status</a>
          {/* The Active Timers anchor link has been removed */}
          <a href="/#relay-controls" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><FontAwesomeIcon icon={faToggleOn} className="w-5"/> Relay Controls</a>
          <a href="/#quick-actions" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-3 text-slate-200 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><FontAwesomeIcon icon={faBolt} className="w-5"/> Quick Actions</a>
          <div className="border-t border-slate-700 my-2 !mt-3 !mb-2"></div>

          <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 text-red-400 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;