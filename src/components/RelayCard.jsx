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
    <div className="bg-slate-700 rounded-lg p-4 flex flex-col space-y-3 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="text-xs font-mono text-slate-400">{relayId.replace('_', ' ').toUpperCase()}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className={`flex items-center space-x-2 font-semibold ${isOn ? 'text-green-400' : 'text-slate-400'}`}>
          <FontAwesomeIcon icon={faPowerOff} />
          <span>{isOn ? 'ON' : 'OFF'}</span>
        </div>
        <ToggleSwitch isOn={isOn} onToggle={() => onToggle(id, status)} />
      </div>

      <div>
        {isTimerSet ? (
          <CountdownTimer expiryTimestamp={timer_off_at} />
        ) : (
          <p className="text-xs text-slate-400">
            {/* Use the new helper function here */}
            Last changed: {formatAs12Hour(lastChanged)}
          </p>
        )}
      </div>
    </div>
  );
}

export default RelayCard;