import { useState } from "react";
import { signInStaff } from "../config/firebase";
import "./staffLoginModal.scss";

interface StaffLoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export function StaffLoginModal({ onClose, onLoginSuccess }: StaffLoginModalProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const { user } = await signInStaff(email, password);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Staff Login</h2>
        {error && <p className="error">{error}</p>}
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
