// --- FILE: src/components/DeviceStatus.jsx ---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faWifi, faClock, faPowerOff, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function DeviceStatus({ isOnline, lastUpdate, activeCount, totalCount }) {
  const wifiStatus = isOnline ? "Connected" : "Offline";
  const wifiIconColor = isOnline ? "text-green-400" : "text-red-400";
  const wifiIcon = isOnline ? faWifi : faExclamationTriangle;

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faMicrochip} className="text-blue-400 mr-3" />
        Device Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard icon={wifiIcon} title="WiFi Status" value={wifiStatus} iconColor={wifiIconColor} />
        <StatusCard icon={faClock} title="Last Update" value={lastUpdate} iconColor="text-blue-400" />
        <StatusCard icon={faPowerOff} title="Active Relays" value={`${activeCount} / ${totalCount}`} iconColor="text-yellow-400" />
      </div>
    </div>
  );
}

const StatusCard = ({ icon, title, value, iconColor }) => (
  <div className="bg-slate-700 rounded-lg p-4 shadow-md">
    <div className="flex items-center">
      <FontAwesomeIcon icon={icon} className={`${iconColor} text-2xl mr-4`} />
      <div>
        <p className="text-sm text-slate-300">{title}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
    </div>
  </div>
);

export default DeviceStatus;