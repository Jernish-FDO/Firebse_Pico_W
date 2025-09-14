// --- FILE: src/components/ActiveTimers.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import CountdownTimer from './CountdownTimer'; // We reuse the existing countdown component

function ActiveTimers({ relays }) {
  // Filter the relays to find only those with an active timer
  const activeTimerEntries = Object.entries(relays).filter(
    ([, relayData]) => relayData.timer_off_at && relayData.timer_off_at > (Date.now() / 1000)
  );

  return (
    <div className="bg-slate-800 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faClock} className="text-blue-400 mr-3" />
        Active Timers
      </h2>
      {activeTimerEntries.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No timers are currently running.</p>
      ) : (
        <div className="space-y-3">
          {activeTimerEntries.map(([id, relayData]) => (
            <div key={id} className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">{relayData.name}</h3>
              {/* The CountdownTimer component does all the work for us! */}
              <CountdownTimer expiryTimestamp={relayData.timer_off_at} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveTimers;