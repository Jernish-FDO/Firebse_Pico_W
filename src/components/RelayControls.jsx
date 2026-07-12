// --- FILE: src/components/RelayControls.jsx ---

import RelayCard from './RelayCard';

function RelayControls({ relays, onToggle }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
        <div className="w-2 h-8 bg-indigo-500 rounded-full mr-4 shadow-lg shadow-indigo-500/50"></div>
        Relay Controls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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