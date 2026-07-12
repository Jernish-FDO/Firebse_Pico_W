// --- FILE: src/components/RelayCard.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import CountdownTimer from './CountdownTimer';
import { formatAs12Hour } from '../utils/formatTime'; // Import the new helper

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button onClick={onToggle} className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none ${isOn ? 'bg-green-500' : 'bg-slate-600'}`}>
    <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${isOn ? 'translate-x-8' : 'translate-x-1'}`} />
  </button>
);

function RelayCard({ id, name, relayId, status, lastChanged, timer_off_at, onToggle }) {
  const isOn = status === true;
  const isTimerSet = timer_off_at && timer_off_at > (Date.now() / 1000);

  // The local formatTimestamp function is no longer needed.

  return (
    <div className="bg-slate-800 rounded-2xl p-5 flex flex-col space-y-4 shadow-sm border border-slate-700/50 transition-all hover:border-slate-500 hover:shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-100 text-lg tracking-tight">{name}</h3>
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2 py-1 bg-slate-900 rounded-md">{relayId.replace('_', ' ')}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className={`flex items-center space-x-2 font-medium ${isOn ? 'text-green-400' : 'text-slate-500'}`}>
          <FontAwesomeIcon icon={faPowerOff} size="sm" />
          <span className="text-sm">{isOn ? 'Active' : 'Inactive'}</span>
        </div>
        <ToggleSwitch isOn={isOn} onToggle={() => onToggle(id, status)} />
      </div>

      <div className="pt-2 border-t border-slate-700/50">
        {isTimerSet ? (
          <CountdownTimer expiryTimestamp={timer_off_at} />
        ) : (
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
            Last active: {formatAs12Hour(lastChanged)}
          </p>
        )}
      </div>
    </div>
  );
}

export default RelayCard;