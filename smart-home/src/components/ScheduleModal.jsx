// --- FILE: src/components/ScheduleModal.jsx ---

// (This is a complex component, provided for completeness)
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const daysOfWeek = [
  { id: 'mon', label: 'M' }, { id: 'tue', label: 'T' }, { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' }, { id: 'fri', label: 'F' }, { id: 'sat', label: 'S' }, { id: 'sun', label: 'S' }
];

function ScheduleModal({ isOpen, onClose, onSave, onDelete, relays, schedules }) {
  const [selectedRelay, setSelectedRelay] = useState('');
  const [onTime, setOnTime] = useState('07:00');
  const [offTime, setOffTime] = useState('22:00');
  const [days, setDays] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [existingScheduleId, setExistingScheduleId] = useState(null);

  useEffect(() => {
    if (selectedRelay) {
      const existing = Object.entries(schedules).find(([, s]) => s.relayId === selectedRelay);
      if (existing) {
        const [id, data] = existing;
        setOnTime(data.onTime);
        setOffTime(data.offTime);
        setDays(data.days || []);
        setIsEnabled(data.enabled);
        setExistingScheduleId(id);
      } else {
        // Reset form if no schedule exists for the selected relay
        setOnTime('07:00');
        setOffTime('22:00');
        setDays([]);
        setIsEnabled(true);
        setExistingScheduleId(null);
      }
    }
  }, [selectedRelay, schedules]);

  if (!isOpen) return null;

  const handleDayToggle = (dayId) => {
    setDays(prev => prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]);
  };

  const handleSave = () => {
    if (!selectedRelay) {
      alert('Please select a relay.');
      return;
    }
    const scheduleData = { relayId: selectedRelay, onTime, offTime, days, enabled: isEnabled };
    onSave(existingScheduleId, scheduleData);
    onClose();
  };
  
  const handleDelete = () => {
    if (existingScheduleId) {
      onDelete(existingScheduleId);
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
          <label className="block text-sm font-medium text-slate-300">Select Relay</label>
          <select value={selectedRelay} onChange={(e) => setSelectedRelay(e.target.value)} className="w-full p-3 bg-slate-700 rounded-lg">
            <option value="" disabled>Choose a relay...</option>
            {Object.entries(relays).map(([id, data]) => <option key={id} value={id}>{data.name}</option>)}
          </select>
          
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Repeat on</label>
            <div className="flex justify-between">
              {daysOfWeek.map(day => (
                <button key={day.id} onClick={() => handleDayToggle(day.id)} className={`w-10 h-10 rounded-full font-bold ${days.includes(day.id) ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'}`}>
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <label className="font-medium text-slate-300">Enable Schedule</label>
            <input type="checkbox" checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <div>
            {existingScheduleId && <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold">Delete</button>}
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