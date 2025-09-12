// --- FILE: src/components/TimerModal.jsx ---

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock } from '@fortawesome/free-solid-svg-icons';

function TimerModal({ isOpen, onClose, onSave, relays }) {
  const [selectedRelay, setSelectedRelay] = useState('');
  
  // State for hours, minutes, and seconds, all defaulting to 0
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  if (!isOpen) return null;

  const handleSave = () => {
    // Calculate total duration in seconds from all three inputs
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (!selectedRelay || totalSeconds <= 0) {
      alert('Please select a relay and set a duration greater than 0 seconds.');
      return;
    }
    onSave(selectedRelay, totalSeconds);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md mx-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FontAwesomeIcon icon={faClock} className="text-blue-400 mr-3" />
          Set Turn-Off Timer
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Select Relay</label>
            <select
              value={selectedRelay}
              onChange={(e) => setSelectedRelay(e.target.value)}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="" disabled>Choose a relay to turn ON...</option>
              {Object.entries(relays).map(([id, data]) => (
                <option key={id} value={id}>{data.name}</option>
              ))}
            </select>
          </div>
          
          {/* Updated grid with three columns for Hours, Minutes, and Seconds */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Turn OFF After</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value, 10)))}
                min="0"
                max="12"
                placeholder="Hours"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10)))}
                min="0"
                max="59"
                placeholder="Minutes"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value, 10)))}
                min="0"
                max="59"
                placeholder="Seconds"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg font-semibold">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">Start Timer</button>
        </div>
      </div>
    </div>
  );
}

export default TimerModal;