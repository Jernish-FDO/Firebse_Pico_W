// --- FILE: src/App.jsx ---

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { database, auth } from "./firebase/config";
import { ref, onValue, update, set, push, remove } from "firebase/database";

// Page Imports
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SchedulesPage from './pages/SchedulesPage';
import TimerPage from './pages/TimerPage';

// Component Imports
import Header from './components/Header';
import ScheduleModal from './components/ScheduleModal';

function App() {
  const { user, loading } = useAuth();

  // --- All shared state is managed here in the top-level component ---
  const [relays, setRelays] = useState({});
  const [schedules, setSchedules] = useState({});
  const [deviceData, setDeviceData] = useState({ online: false, last_update: null });
  
  // The ScheduleModal is global, but Timer is now a page, so its state is removed.
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [modalSelectedRelays, setModalSelectedRelays] = useState([]);

  const devicePath = 'home_automation/devices/pico_w_001';
  const schedulesPath = 'schedules';

  // --- Effects for data fetching and timer management ---

  // Effect to fetch real-time data from Firebase for the device and schedules
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
  
  // --- All handler functions are defined here and passed down as props ---

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

  const handleSaveSchedule = async (scheduleId, scheduleData) => {
    if (scheduleId) {
      setSchedules(prevSchedules => ({ ...prevSchedules, [scheduleId]: scheduleData }));
      const scheduleRef = ref(database, `${schedulesPath}/${scheduleId}`);
      await set(scheduleRef, scheduleData);
    } else {
      const schedulesRef = ref(database, schedulesPath);
      const newScheduleRef = await push(schedulesRef, scheduleData);
      if (newScheduleRef.key) {
        setSchedules(prevSchedules => ({ ...prevSchedules, [newScheduleRef.key]: scheduleData }));
      }
    }
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (!scheduleId) return;
    setSchedules(prevSchedules => {
      const newSchedules = { ...prevSchedules };
      delete newSchedules[scheduleId];
      return newSchedules;
    });
    const scheduleRef = ref(database, `${schedulesPath}/${scheduleId}`);
    remove(scheduleRef);
  };
  
  const handleEditSchedule = (relayId) => {
    setModalSelectedRelays([relayId]);
    setScheduleModalOpen(true);
  };

  const openScheduleModal = () => {
    setModalSelectedRelays([]);
    setScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setScheduleModalOpen(false);
    setModalSelectedRelays([]);
  };

  // --- RENDER LOGIC ---

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <DashboardPage
                    relays={relays}
                    deviceData={deviceData}
                    onToggleRelay={handleToggleRelay}
                    onAll={handleAll}
                    onToggleAll={handleToggleAll}
                  />
                } 
              />
              <Route 
                path="/schedules" 
                element={
                  <SchedulesPage
                    schedules={schedules}
                    relays={relays}
                    onEditSchedule={handleEditSchedule}
                    onOpenScheduleModal={openScheduleModal}
                    onDeleteSchedule={handleDeleteSchedule}
                  />
                }
              />
              <Route 
                path="/timer" 
                element={
                  <TimerPage
                    relays={relays}
                    onSave={handleSaveTimer}
                  />
                }
              />
            </Routes>
          </main>
          
          {/* TimerModal is removed, but ScheduleModal remains as it's a global component */}
          <ScheduleModal 
            isOpen={isScheduleModalOpen} 
            onClose={closeScheduleModal} 
            onSave={handleSaveSchedule} 
            onDelete={handleDeleteSchedule} 
            relays={relays} 
            schedules={schedules}
            selectedRelays={modalSelectedRelays}
            onSelectionChange={setModalSelectedRelays}
          />
        </>
      )}
    </div>
  );
}

export default App;