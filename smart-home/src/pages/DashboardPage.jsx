// --- FILE: src/pages/DashboardPage.jsx ---
// This version contains the TIMER LOGIC inside the React App.

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

  // Fetch data from Firebase (no changes here)
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

  // --- NEW: TIMER LOGIC HANDLER IN REACT ---
  useEffect(() => {
    let timerId = null;

    // Find the next relay that needs to be turned off
    let nextExpiryTime = Infinity;
    let relaysToExpire = [];

    const nowInSeconds = Date.now() / 1000;

    Object.entries(relays).forEach(([id, data]) => {
      if (data.timer_off_at && data.timer_off_at > nowInSeconds) {
        if (data.timer_off_at < nextExpiryTime) {
          nextExpiryTime = data.timer_off_at;
        }
      }
    });

    // If we found a timer that needs to be handled
    if (nextExpiryTime !== Infinity) {
      const delay = (nextExpiryTime - nowInSeconds) * 1000;
      console.log(`Next timer will fire in ${Math.round(delay / 1000)} seconds.`);

      timerId = setTimeout(() => {
        console.log("Timer expired! Sending turn-off command.");
        const updates = {};
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Find all relays that should be off by now
        Object.entries(relays).forEach(([id, data]) => {
          if (data.timer_off_at && data.timer_off_at <= currentTime) {
            updates[`${devicePath}/relays/${id}/status`] = false;
            updates[`${devicePath}/relays/${id}/timer_off_at`] = 0;
            updates[`${devicePath}/relays/${id}/last_changed`] = currentTime;
          }
        });

        if (Object.keys(updates).length > 0) {
          update(ref(database), updates);
        }
      }, delay);
    }

    // Cleanup function: This is crucial to prevent memory leaks!
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [relays]); // Re-run this effect whenever the relays data changes

  // All other functions remain the same
  const handleLogout = () => auth.signOut();
  const handleToggleRelay = (relayId, currentStatus) => { /* ... no changes ... */ };
  const handleAll = (targetStatus) => { /* ... no changes ... */ };
  const handleToggleAll = () => { /* ... no changes ... */ };
  const handleSaveTimer = (relayId, durationSeconds) => {
    const timerEndTime = Math.floor(Date.now() / 1000) + durationSeconds;
    const updates = {};
    updates[`${devicePath}/relays/${relayId}/timer_off_at`] = timerEndTime;
    updates[`${devicePath}/relays/${relayId}/status`] = true;
    update(ref(database), updates);
  };
  const handleSaveSchedule = (scheduleId, scheduleData) => { /* ... no changes ... */ };
  const handleDeleteSchedule = (scheduleId) => { /* ... no changes ... */ };

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