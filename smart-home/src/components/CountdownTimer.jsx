// --- FILE: src/components/CountdownTimer.jsx ---

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

function CountdownTimer({ expiryTimestamp }) {
  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000);
    const difference = expiryTimestamp - now;

    if (difference <= 0) {
      return "00:00:00";
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(difference / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    const seconds = difference % 60;

    // Format the output string
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp]);

  return (
    <div className="flex items-center space-x-2 text-sm text-blue-400 font-medium animate-pulse">
      <FontAwesomeIcon icon={faClock} />
      <span>Time left: {timeLeft}</span>
    </div>
  );
}

export default CountdownTimer;