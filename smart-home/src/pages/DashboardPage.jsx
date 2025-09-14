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

  // Effect to fetch real-time data from Firebase
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

  // Effect to handle automatic turn-off for expired timers
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const updates = {};
      let needsUpdate = false;

      for (const relayId in relays) {
        const relay = relays[relayId];
        if (relay.status === true && relay.timer_off_at > 0 && relay.timer_off_at <= now) {
          updates[`${devicePath}/relays/${relayId}/status`] = false;
          updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        update(ref(database), updates);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [relays]);


  const handleLogout = () => auth.signOut();

  const handleToggleRelay = (relayId, currentStatus) => {
    const updates = {};
    const newStatus = !currentStatus;
    updates[`${devicePath}/relays/${relayId}/status`] = newStatus;
    updates[`${devicePath}/relays/${relayId}/last_changed`] = Math.floor(Date.now() / 1000);
    if (newStatus === false) {
      updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
    }
    update(ref(database), updates);
  };
  
  const handleAll = (targetStatus) => {
    const updates = {};
    const newTimestamp = Math.floor(Date.now() / 1000);
    Object.keys(relays).forEach(relayId => {
      updates[`${devicePath}/relays/${relayId}/status`] = targetStatus;
      updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;
      if (targetStatus === false) {
        updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
      }
    });
    update(ref(database), updates);
  };

  const handleToggleAll = () => {
    const updates = {};
    const newTimestamp = Math.floor(Date.now() / 1000);
    Object.entries(relays).forEach(([relayId, relayData]) => {
      const newStatus = !relayData.status;
      updates[`${devicePath}/relays/${relayId}/status`] = newStatus;
      updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;
      if (newStatus === false) {
          updates[`${devicePath}/relays/${relayId}/timer_off_at`] = 0;
      }
    });
    update(ref(database), updates);
  };

  const handleSaveTimer = (relayIds, durationSeconds) => {
    const timerEndTime = Math.floor(Date.now() / 1000) + durationSeconds;
    const newTimestamp = Math.floor(Date.now() / 1000);
    const updates = {};
    relayIds.forEach(relayId => {
      updates[`${devicePath}/relays/${relayId}/status`] = true; 
      updates[`${devicePath}/relays/${relayId}/timer_off_at`] = timerEndTime;
      updates[`${devicePath}/relays/${relayId}/last_changed`] = newTimestamp;
    });
    update(ref(database), updates);
  };

  // --- START OF NEWLY IMPLEMENTED LOGIC ---

  /**
   * Saves or updates a schedule in Firebase.
   * @param {string | null} scheduleId - The ID of the schedule to update, or null to create a new one.
   * @param {object} scheduleData - The schedule data to save.
   */
  const handleSaveSchedule = (scheduleId, scheduleData) => {
    if (scheduleId) {
      // If an ID exists, it's an update.
      console.log(`Updating schedule: ${scheduleId}`);
      const scheduleRef = ref(database, `${schedulesPath}/${scheduleId}`);
      set(scheduleRef, scheduleData);
    } else {
      // If no ID, it's a new schedule.
      console.log("Creating new schedule...");
      const schedulesRef = ref(database, schedulesPath);
      push(schedulesRef, scheduleData);
    }
  };

  /**
   * Deletes a schedule from Firebase.
   * @param {string} scheduleId - The ID of the schedule to delete.
   */
  const handleDeleteSchedule = (scheduleId) => {
    if (!scheduleId) {
      console.error("Delete failed: No schedule ID provided.");
      return;
    }
    console.log(`Deleting schedule: ${scheduleId}`);
    const scheduleRef = ref(database, `${schedulesPath}/${scheduleId}`);
    remove(scheduleRef);
  };
  
  // --- END OF NEWLY IMPLEMENTED LOGIC ---
  
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