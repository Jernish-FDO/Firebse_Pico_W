// --- FILE: src/components/ScheduleList.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { formatAs12Hour } from '../utils/formatTime';

// --- THIS IS THE CORRECTED COMPONENT DEFINITION ---
const DayBubble = ({ day, isActive }) => (
  <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-400'}`}>
    {day.charAt(0).toUpperCase()}
  </span>
);

const allDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function ScheduleList({ schedules, relays, onEditSchedule, selectedForDeletion, onToggleSelection }) {
  const scheduleEntries = Object.entries(schedules);

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      {scheduleEntries.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No schedules have been set up yet.</p>
      ) : (
        <div className="space-y-4">
          {scheduleEntries.map(([id, schedule]) => {
            const relayName = relays[schedule.relayId]?.name || 'Unknown Relay';
            const isSelected = selectedForDeletion.includes(id);

            return (
              <div 
                key={id} 
                className={`bg-slate-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all border ${isSelected ? 'border-blue-500' : 'border-transparent'}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelection(id)}
                    className="h-5 w-5 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{relayName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${schedule.enabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-300'}`}>{schedule.enabled ? 'Enabled' : 'Disabled'}</span>
                      <p className="text-sm text-slate-300">ON: <strong>{formatAs12Hour(schedule.onTime)}</strong> | OFF: <strong>{formatAs12Hour(schedule.offTime)}</strong></p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {allDays.map(day => <DayBubble key={day} day={day} isActive={schedule.days?.includes(day)} />)}
                </div>
                <button
                  onClick={() => onEditSchedule(schedule.relayId)}
                  className="bg-slate-600 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>Edit</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ScheduleList;