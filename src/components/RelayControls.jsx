// --- FILE: src/components/RelayControls.jsx ---

import RelayCard from './RelayCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function RelayControls({ relays, onToggle }) {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FontAwesomeIcon icon={faCircle} className="text-green-500 mr-3" />
        Relay Controls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Object.entries(relays)
          .sort(([keyA], [keyB]) => {
            const numA = parseInt(keyA.split('_')[1], 10);
            const numB = parseInt(keyB.split('_')[1], 10);
            return numA - numB;
          })
          .map(([id, data]) => (
            <RelayCard
              key={id}
              id={id}
              name={data.name || `Relay ${id.split('_')[1]}`}
              relayId={id}
              status={data.status}
              lastChanged={data.last_changed}
              timer_off_at={data.timer_off_at || 0} // Pass the timer value here
              onToggle={onToggle}
            />
          ))}
      </div>
    </div>
  );
}

export default RelayControls;