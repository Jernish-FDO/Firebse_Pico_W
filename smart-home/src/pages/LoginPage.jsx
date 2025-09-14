// --- FILE: src/pages/LoginPage.jsx ---

import { useState } from 'react';
import { auth } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash, faArrowRightToBracket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'; // Import the new component

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // New state for validation
  const [isEmailValid, setIsEmailValid] = useState(null); // null, true, or false
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-3 scale

  const validateEmail = (email) => {
    // A simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 7) score++; // Length
    if (/[A-Z]/.test(pass)) score++; // Uppercase
    if (/[0-9]/.test(pass) && /[a-z]/.test(pass)) score++; // Number and Lowercase
    if (/[!@#$%^&*?]/.test(pass) && score > 0) score = 3; // Special char and meets other criteria
    
    setPasswordStrength(score > 3 ? 3 : score);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  // Dynamic border color based on email validity
  const emailBorderColor = isEmailValid === true 
    ? 'border-green-500' 
    : isEmailValid === false && email.length > 0 
    ? 'border-red-500' 
    : 'border-slate-600';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg p-8 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white flex items-center justify-center">
          <FontAwesomeIcon icon={faLock} className="text-blue-500 mr-3" />
          Secure Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Email Address"
                className={`w-full pl-10 pr-10 py-3 bg-slate-800 border ${emailBorderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-colors`}
              />
              {isEmailValid && (
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                 </div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-400">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-slate-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Your Password"
                className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-slate-500 hover:text-blue-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            {password.length > 0 && <PasswordStrengthMeter strength={passwordStrength} />}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} className="mr-2" />
            Login
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;