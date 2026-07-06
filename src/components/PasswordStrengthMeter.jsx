// --- FILE: src/components/PasswordStrengthMeter.jsx ---

const strengthLevels = [
  { text: '', color: 'bg-transparent', width: 'w-0' }, // Level 0 (empty)
  { text: 'Weak', color: 'bg-red-500', width: 'w-1/4' },   // Level 1
  { text: 'Medium', color: 'bg-yellow-500', width: 'w-2/4' },// Level 2
  { text: 'Strong', color: 'bg-green-500', width: 'w-full' }, // Level 3
];

function PasswordStrengthMeter({ strength }) {
  const currentLevel = strengthLevels[strength] || strengthLevels[0];

  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-slate-700 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${currentLevel.color} ${currentLevel.width}`}
        ></div>
      </div>
      <p className="text-xs text-slate-400 mt-1">
        Password strength: <span className="font-semibold">{currentLevel.text}</span>
      </p>
    </div>
  );
}

export default PasswordStrengthMeter;