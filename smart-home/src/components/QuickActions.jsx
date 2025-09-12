// --- FILE: src/components/QuickActions.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPowerOff, faExchangeAlt, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function QuickActions({ onAllOn, onAllOff, onToggleAll, onOpenTimerModal, onOpenScheduleModal }) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faBolt} className="text-yellow-400 mr-3" />
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-4">
        <button onClick={onAllOn} className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2">
          <FontAwesomeIcon icon={faPowerOff} /><span>Turn All ON</span>
        </button>
        <button onClick={onAllOff} className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2">
          <FontAwesomeIcon icon={faPowerOff} /><span>Turn All OFF</span>
        </button>
        <button onClick={onToggleAll} className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2">
          <FontAwesomeIcon icon={faExchangeAlt} /><span>Toggle All</span>
        </button>
        {/* ADDED/UPDATED BUTTONS */}
        <button onClick={onOpenTimerModal} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2">
          <FontAwesomeIcon icon={faClock} /><span>Set Timer</span>
        </button>
        <button onClick={onOpenScheduleModal} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2">
          <FontAwesomeIcon icon={faCalendarAlt} /><span>Schedules</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;