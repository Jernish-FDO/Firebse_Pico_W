// --- FILE: src/components/CustomSelect.jsx ---

import { useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function CustomSelect({ options, value, onChange, placeholder = "Select an option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use the hook to close the dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-left flex justify-between items-center focus:outline-none focus:border-blue-500"
      >
        <span className={selectedOption ? 'text-white' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        // --- THIS IS THE UPDATED LINE ---
        <ul className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              // Also updated list item for better padding and rounded corners on hover
              className="px-3 py-2 hover:bg-blue-600 cursor-pointer text-white rounded-md transition-colors"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;