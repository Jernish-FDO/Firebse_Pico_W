// --- FILE: src/components/QuickActions.jsx ---

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faExchangeAlt, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Remove onOpenTimerModal from props
function QuickActions({ onAllOn, onAllOff, onToggleAll }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 mt-8 border border-white/5 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
        <div className="w-2 h-8 bg-amber-500 rounded-full mr-4 shadow-lg shadow-amber-500/50"></div>
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <button onClick={onAllOn} className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-100 border border-emerald-600/30 px-6 py-4 rounded-2xl font-semibold flex flex-col items-center gap-3 transition-all hover:-translate-y-1">
          <FontAwesomeIcon icon={faPowerOff} className="text-xl" />
          <span>Turn All ON</span>
        </button>
        <button onClick={onAllOff} className="bg-rose-600/20 hover:bg-rose-600/40 text-rose-100 border border-rose-600/30 px-6 py-4 rounded-2xl font-semibold flex flex-col items-center gap-3 transition-all hover:-translate-y-1">
          <FontAwesomeIcon icon={faPowerOff} className="text-xl" />
          <span>Turn All OFF</span>
        </button>
        <button onClick={onToggleAll} className="bg-violet-600/20 hover:bg-violet-600/40 text-violet-100 border border-violet-600/30 px-6 py-4 rounded-2xl font-semibold flex flex-col items-center gap-3 transition-all hover:-translate-y-1">
          <FontAwesomeIcon icon={faExchangeAlt} className="text-xl" />
          <span>Toggle All</span>
        </button>
        <Link to="/timer" className="bg-sky-600/20 hover:bg-sky-600/40 text-sky-100 border border-sky-600/30 px-6 py-4 rounded-2xl font-semibold flex flex-col items-center gap-3 transition-all hover:-translate-y-1">
          <FontAwesomeIcon icon={faClock} className="text-xl" />
          <span>Set Timer</span>
        </Link>
        <Link to="/schedules" className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-100 border border-indigo-600/30 px-6 py-4 rounded-2xl font-semibold flex flex-col items-center gap-3 transition-all hover:-translate-y-1">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />
          <span>Schedules</span>
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;