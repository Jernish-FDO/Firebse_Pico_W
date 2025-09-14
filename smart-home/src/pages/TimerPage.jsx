// --- FILE: src/pages/TimerPage.jsx ---

import { useState } from 'react';
// We no longer need useNavigate, so it's removed from the import
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import ActiveTimers from '../components/ActiveTimers';

function TimerPage({ relays, onSave }) {
  const [selectedRelays, setSelectedRelays] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  
  // The useNavigate hook is no longer needed
  // const navigate = useNavigate(); 

  const areAllSelected = selectedRelays.length > 0 && selectedRelays.length === Object.keys(relays).length;
  const totalDuration = (hours * 3600) + (minutes * 60) + seconds;

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedRelays([]);
    } else {
      setSelectedRelays(Object.keys(relays));
    }
  };

  const handleToggleSelection = (relayId) => {
    setSelectedRelays((prev) =>
      prev.includes(relayId)
        ? prev.filter((id) => id !== relayId)
        : [...prev, relayId]
    );
  };

  // --- THIS IS THE UPDATED handleSave FUNCTION ---
  const handleSave = () => {
    if (selectedRelays.length === 0 || totalDuration <= 0) {
      alert('Please select at least one relay and set a duration greater than 0 seconds.');
      return;
    }
    // Call the save function passed down from App.jsx
    onSave(selectedRelays, totalDuration);
    
    // Clear the form after saving for instant user feedback
    setSelectedRelays([]);
    setHours(0);
    setMinutes(5); // Reset to a sensible default
    setSeconds(0);

    // The navigate('/') call has been removed.
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Timers</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSelectAll}
            className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg font-semibold text-sm"
          >
            {areAllSelected ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={handleSave}
            disabled={selectedRelays.length === 0 || totalDuration <= 0}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faPlay} />
            <span>Start Timer</span>
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <ActiveTimers relays={relays} />
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Relays to Turn ON</h3>
            <div className="max-h-64 overflow-y-auto bg-slate-900/50 p-3 rounded-lg border border-slate-700 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              {Object.entries(relays).map(([id, data]) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-slate-700">
                  <input type="checkbox" checked={selectedRelays.includes(id)} onChange={() => handleToggleSelection(id)} className="h-5 w-5 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50" />
                  <span className="text-white">{data.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Set Duration to Turn OFF After</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">Hours</label>
                <input type="number" value={hours} onChange={(e) => setHours(Math.max(0, parseInt(e.target.value, 10) || 0))} min="0" className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">Minutes</label>
                <input type="number" value={minutes} onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))} min="0" max="59" className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">Seconds</label>
                <input type="number" value={seconds} onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value, 10) || 0))} min="0" max="59" className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimerPage;