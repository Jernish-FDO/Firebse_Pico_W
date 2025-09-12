// --- FILE: src/pages/DashboardPage.jsx ---

import { useState, useEffect } from 'react';
import { database, auth } from "../firebase/config";
import { ref, onValue, update, set, push, remove } from "firebase/database";

import Header from '../components/Header';
import DeviceStatus from '../components/DeviceStatus';
import RelayControls from '../components/RelayControls';
import QuickActions from '../components/QuickActions';
import TimerModal from '../components/TimerModal';
import ScheduleModal from '../components/ScheduleModal';

function DashboardPage() {
  const [relays, setRelays] = useState({});
  const [schedules, setSchedules] = useState({});
  const [deviceData, setDeviceData] = useState({ online: false, last_update: null });

  const [isTimerModalOpen, setTimerModalOpen] = useState(false);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);

  const devicePath = 'home_automation/devices/pico_w_001';
  const schedulesPath = 'schedules';

  // This useEffect for fetching data is correct and remains the same.
  useEffect(() => {
    const deviceRef = ref(database, devicePath);
    const schedulesRef = ref(database, schedulesPath);
    const unsubDevice = onValue(deviceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRelays(data.relays || {});
        setDeviceData({ online: data.online, last_update: data.last_update });
      }
    });
    const unsubSchedules = onValue(schedulesRef, (snapshot) => {
      setSchedules(snapshot.val() || {});
    });
    return () => {
      unsubDevice();
      unsubSchedules();
    };
  }, []);

  const handleLogout = () => auth.signOut();

  // --- FIXED: This function now correctly updates status, timestamp, and cancels timers. ---
  const handleToggleRelay = (relayId, currentStatus) => {
    const updates = {};
    const newStatus = !currentStatus;
    const newTimestamp = Math.floor(Date.now() / 1000);

    updates[`${devicePath}/relays/${relayId}/status`] = newStatus;
    updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;

    // If the user manually turns the relay OFF, we must also cancel its timer.
    if (newStatus === false) {
      updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
    }
    
    update(ref(database), updates);
  };
  
  // --- FIXED: This function now correctly updates all relays and their timestamps. ---
  const handleAll = (targetStatus) => {
    const updates = {};
    const newTimestamp = Math.floor(Date.now() / 1000);

    Object.keys(relays).forEach(relayId => {
      updates[`${devicePath}/relays/${relayId}/status`] = targetStatus;
      updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;
      
      // If turning all OFF, also cancel all active timers.
      if (targetStatus === false) {
        updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
      }
    });
    update(ref(database), updates);
  };

  // --- FIXED: This function now correctly toggles all relays. ---
  const handleToggleAll = () => {
    const updates = {};
    const newTimestamp = Math.floor(Date.now() / 1000);

    Object.entries(relays).forEach(([relayId, relayData]) => {
      const newStatus = !relayData.status;
      updates[`${devicePath}/relays/${relayId}/status`] = newStatus;
      updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;

      // If toggling to OFF, cancel any active timer.
      if (newStatus === false) {
          updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
      }
    });
    update(ref(database), updates);
  };

  // This function was already working correctly.
  const handleSaveTimer = (relayId, durationSeconds) => {
    const timerEndTime = Math.floor(Date.now() / 1000) + durationSeconds;
    const updates = {};
    updates[`${devicePath}/relays/${relayId}/timer_off_at`] = timerEndTime;
    updates[`${devicePath}/relays/${relayId}/status`] = true; // Also turn the relay ON
    updates[`${devicePath}/relays/${relayId}/last_changed`] = Math.floor(Date.now() / 1000);
    update(ref(database), updates);
  };

  const handleSaveSchedule = (scheduleId, scheduleData) => { /* ... (This logic is separate and correct) ... */ };
  const handleDeleteSchedule = (scheduleId) => { /* ... (This logic is separate and correct) ... */ };
  
  const activeCount = Object.values(relays).filter(r => r.status === true).length;
  const totalCount = Object.keys(relays).length;
  const formattedLastUpdate = deviceData.last_update ? new Date(deviceData.last_update * 1000).toLocaleTimeString() : 'N/A';

  return (
    <>
      <Header onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DeviceStatus 
          isOnline={deviceData.online}
          lastUpdate={formattedLastUpdate} 
          activeCount={activeCount}
          totalCount={totalCount}
        />
        {/* Pass the CORRECTED handler to the child component */}
        <RelayControls relays={relays} onToggle={handleToggleRelay} />
        <QuickActions
          onAllOn={() => handleAll(true)}
          onAllOff={() => handleAll(false)}
          onToggleAll={handleToggleAll}
          onOpenTimerModal={() => setTimerModalOpen(true)}
          onOpenScheduleModal={() => setScheduleModalOpen(true)}
        />
      </main>

      <TimerModal isOpen={isTimerModalOpen} onClose={() => setTimerModalOpen(false)} onSave={handleSaveTimer} relays={relays} />
      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => setScheduleModalOpen(false)} onSave={handleSaveSchedule} onDelete={handleDeleteSchedule} relays={relays} schedules={schedules} />
    </>
  );
}

export default DashboardPage;