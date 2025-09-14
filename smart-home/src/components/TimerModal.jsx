// --- FILE: src/components/TimerModal.jsx ---

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock } from '@fortawesome/free-solid-svg-icons';

function TimerModal({ isOpen, onClose, onSave, relays }) {
  const [selectedRelays, setSelectedRelays] = useState([]);
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const areAllSelected = selectedRelays.length > 0 && selectedRelays.length === Object.keys(relays).length;

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedRelays([]);
    } else {
      setSelectedRelays(Object.keys(relays));
    }
  };

  if (!isOpen) return null;

  const handleToggleSelection = (relayId) => {
    setSelectedRelays((prevSelected) => {
      if (prevSelected.includes(relayId)) {
        return prevSelected.filter((id) => id !== relayId);
      } else {
        return [...prevSelected, relayId];
      }
    });
  };

  const handleSave = () => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (selectedRelays.length === 0 || totalSeconds <= 0) {
      alert('Please select at least one relay and set a duration greater than 0 seconds.');
      return;
    }
    onSave(selectedRelays, totalSeconds);
    onClose();
  };
  
  // --- THIS IS THE CORRECTED LINE ---
  const handleClose = () => {
    setSelectedRelays([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md mx-4 shadow-2xl relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FontAwesomeIcon icon={faClock} className="text-blue-400 mr-3" />
          Set Turn-Off Timer
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-300">Select Relays</label>
              <button onClick={handleToggleSelectAll} className="text-xs bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md transition-colors">
                {areAllSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="max-h-40 overflow-y-auto bg-slate-900/50 p-3 rounded-lg border border-slate-700 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-blue-500">
              {Object.entries(relays).map(([id, data]) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedRelays.includes(id)}
                    onChange={() => handleToggleSelection(id)}
                    className="h-5 w-5 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  />
                  <span className="text-white">{data.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Turn OFF After</label>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-400">Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  min="0"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-400">Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  min="0"
                  max="59"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-400">Seconds</label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  min="0"
                  max="59"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={handleClose} className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg font-semibold">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">Start Timer</button>
        </div>
      </div>
    </div>
  );
}

export default TimerModal;