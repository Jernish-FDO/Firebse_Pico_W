// --- FILE: src/utils/formatTime.js ---

/**
 * Formats a UNIX timestamp (in seconds) or a 24-hour time string (e.g., "22:00")
 * into a 12-hour format with AM/PM.
 * @param {number | string} input - The time to format.
 * @returns {string} The formatted time string (e.g., "10:00 PM").
 */
export const formatAs12Hour = (input) => {
  // Return 'N/A' for null, undefined, or 0
  if (!input) {
    return 'N/A';
  }

  let date;

  // Handle UNIX timestamps (numbers) from Firebase
  if (typeof input === 'number') {
    // Timestamps are in seconds, but the Date object needs milliseconds
    date = new Date(input * 1000);
  }
  // Handle 24-hour time strings (e.g., "22:00") from schedules
  else if (typeof input === 'string' && input.includes(':')) {
    const [hours, minutes] = input.split(':');
    date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  } else {
    // If the format is unknown, return a sensible default
    return 'Invalid Time';
  }

  // Check if the created date is valid before formatting
  if (isNaN(date.getTime())) {
    return 'Invalid Time';
  }

  // Use the browser's built-in formatter to get a clean 12-hour time
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};