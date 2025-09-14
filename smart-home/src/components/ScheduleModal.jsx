// --- FILE: src/components/ScheduleModal.jsx ---

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const daysOfWeek = [
  { id: 'mon', label: 'M' }, { id: 'tue', label: 'T' }, { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' }, { id: 'fri', label: 'F' }, { id: 'sat', label: 'S' }, { id: 'sun', label: 'S' }
];

function ScheduleModal({ isOpen, onClose, onSave, onDelete, relays, schedules }) {
  const [selectedRelays, setSelectedRelays] = useState([]);
  
  const [onTime, setOnTime] = useState('07:00');
  const [offTime, setOffTime] = useState('22:00');
  const [days, setDays] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);

  // --- THIS FUNCTION HAS BEEN MOVED UP ---
  const resetForm = () => {
    setOnTime('07:00');
    setOffTime('22:00');
    setDays([]);
    setIsEnabled(true);
  };
  // --- END OF MOVE ---

  const areAllRelaysSelected = selectedRelays.length > 0 && selectedRelays.length === Object.keys(relays).length;
  const areAllDaysSelected = days.length === daysOfWeek.length;

  const handleToggleSelectAllRelays = () => {
    if (areAllRelaysSelected) {
      setSelectedRelays([]);
    } else {
      setSelectedRelays(Object.keys(relays));
    }
  };

  const handleToggleSelectAllDays = () => {
    if (areAllDaysSelected) {
      setDays([]);
    } else {
      setDays(daysOfWeek.map(day => day.id));
    }
  };
  
  useEffect(() => {
    if (selectedRelays.length === 1) {
      const singleRelayId = selectedRelays[0];
      const existing = Object.entries(schedules).find(([, s]) => s.relayId === singleRelayId);
      if (existing) {
        const [, data] = existing;
        setOnTime(data.onTime);
        setOffTime(data.offTime);
        setDays(data.days || []);
        setIsEnabled(data.enabled);
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
  }, [selectedRelays, schedules]);

  if (!isOpen) return null;
  
  const handleToggleRelaySelection = (relayId) => {
    setSelectedRelays((prev) => 
      prev.includes(relayId) ? prev.filter((id) => id !== relayId) : [...prev, relayId]
    );
  };

  const handleDayToggle = (dayId) => {
    setDays(prev => prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]);
  };

  const handleSave = () => {
    if (selectedRelays.length === 0) {
      alert('Please select at least one relay.');
      return;
    }
    const scheduleData = { onTime, offTime, days, enabled: isEnabled };
    
    selectedRelays.forEach(relayId => {
      const existing = Object.entries(schedules).find(([, s]) => s.relayId === relayId);
      const existingScheduleId = existing ? existing[0] : null;
      onSave(existingScheduleId, { ...scheduleData, relayId: relayId });
    });

    onClose();
  };
  
  const handleDelete = () => {
    if (selectedRelays.length === 1) {
      const existing = Object.entries(schedules).find(([, s]) => s.relayId === selectedRelays[0]);
      if (existing) {
        onDelete(existing[0]);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-lg mx-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-400 mr-3" />
          Schedule Settings
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-300">Select Relays</label>
              <button onClick={handleToggleSelectAllRelays} className="text-xs bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md transition-colors">
                {areAllRelaysSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto bg-slate-900/50 p-3 rounded-lg border border-slate-700 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              {Object.entries(relays).map(([id, data]) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedRelays.includes(id)}
                    onChange={() => handleToggleRelaySelection(id)}
                    className="h-5 w-5 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  />
                  <span className="text-white">{data.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300">Turn ON Time</label>
              <input type="time" value={onTime} onChange={(e) => setOnTime(e.target.value)} className="w-full p-2 bg-slate-700 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Turn OFF Time</label>
              <input type="time" value={offTime} onChange={(e) => setOffTime(e.target.value)} className="w-full p-2 bg-slate-700 rounded-lg" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-300">Repeat on</label>
              <button type="button" onClick={handleToggleSelectAllDays} className="text-xs bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md transition-colors">
                {areAllDaysSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="flex justify-between">
              {daysOfWeek.map(day => (
                <button key={day.id} type="button" onClick={() => handleDayToggle(day.id)} className={`w-10 h-10 rounded-full font-bold transition-colors ${days.includes(day.id) ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'}`}>
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <label className="font-medium text-slate-300">Enable Schedule</label>
            <input type="checkbox" checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} className="form-checkbox h-5 w-5 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <div>
            {selectedRelays.length === 1 && <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold">Delete</button>}
          </div>
          <div className="space-x-4">
            <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg font-semibold">Cancel</button>
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">Save Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;