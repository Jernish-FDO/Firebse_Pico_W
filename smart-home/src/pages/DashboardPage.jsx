// --- FILE: src/pages/DashboardPage.jsx ---

import DeviceStatus from '../components/DeviceStatus';
import RelayControls from '../components/RelayControls';
import QuickActions from '../components/QuickActions';
// Removed the import for ActiveTimers
import { formatAs12Hour } from '../utils/formatTime';

function DashboardPage({ 
  relays, 
  deviceData, 
  onToggleRelay, 
  onAll, 
  onToggleAll, 
}) {
  const activeCount = Object.values(relays).filter(r => r.status === true).length;
  const totalCount = Object.keys(relays).length;
  const formattedLastUpdate = formatAs12Hour(deviceData.last_update);

  return (
    <>
      <section id="device-status" className="pt-24 -mt-24">
        <DeviceStatus 
          isOnline={deviceData.online}
          lastUpdate={formattedLastUpdate} 
          activeCount={activeCount}
          totalCount={totalCount}
        />
      </section>
      
      {/* The ActiveTimers section has been removed from here */}

      <section id="relay-controls" className="pt-24 -mt-24">
        <RelayControls relays={relays} onToggle={onToggleRelay} />
      </section>
      
      <section id="quick-actions" className="pt-24 -mt-24">
        <QuickActions
          onAllOn={() => onAll(true)}
          onAllOff={() => onAll(false)}
          onToggleAll={onToggleAll}
        />
      </section>
    </>
  );
}

export default DashboardPage;