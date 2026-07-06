// --- FILE: src/pages/SchedulesPage.jsx ---

import { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

function SchedulesPage({ schedules, relays, onEditSchedule, onOpenScheduleModal, onDeleteSchedule }) {
  // This state tracks which schedules are selected for deletion
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);

  // --- START OF NEW CODE ---
  
  const scheduleIds = Object.keys(schedules);
  const areAllSelected = scheduleIds.length > 0 && selectedForDeletion.length === scheduleIds.length;

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedForDeletion([]); // If all are selected, deselect all
    } else {
      setSelectedForDeletion(scheduleIds); // Otherwise, select all
    }
  };

  // --- END OF NEW CODE ---

  const handleToggleSelection = (scheduleId) => {
    setSelectedForDeletion(prev => 
      prev.includes(scheduleId) 
        ? prev.filter(id => id !== scheduleId) 
        : [...prev, scheduleId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedForDeletion.length} schedule(s)?`)) {
      selectedForDeletion.forEach(scheduleId => {
        onDeleteSchedule(scheduleId);
      });
      setSelectedForDeletion([]); // Clear selection after deletion
    }
  };

  return (
    <section id="schedule-list">
      {/* --- THIS HEADER SECTION IS UPDATED --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Schedules</h2>
        <div className="flex items-center gap-3">
          {/* New "Select All" button */}
          {scheduleIds.length > 0 && (
            <button
              onClick={handleToggleSelectAll}
              className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg font-semibold text-sm"
            >
              {areAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          )}

          {/* Delete button (conditionally rendered) */}
          {selectedForDeletion.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete ({selectedForDeletion.length})</span>
            </button>
          )}

          {/* Add Schedule button */}
          <button
            onClick={onOpenScheduleModal}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Schedule</span>
          </button>
        </div>
      </div>

      <ScheduleList 
        schedules={schedules} 
        relays={relays} 
        onEditSchedule={onEditSchedule}
        selectedForDeletion={selectedForDeletion}
        onToggleSelection={handleToggleSelection}
      />
    </section>
  );
}

export default SchedulesPage;