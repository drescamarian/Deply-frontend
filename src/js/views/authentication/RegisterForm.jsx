// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from "react";

// Imports von benoetigten Paketen
import axios from "axios";
import "./RegisterOrgaUserForm.scss";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);
  const [confirmedUsername, setConfirmedUsername] = useState(null);

  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [username, password, confirmPassword]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        userData
      );
      setConfirmedUsername(resp.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
  const validateForm = () => {
    // Pruefe, ob alle Felder befuellt und Passwortfelder gleich
    const isValid =
      username.length > 0 &&
      password.length > 0 &&
      password === confirmPassword;
    setConfirmBtnActive(isValid);
  };

  return (
    <form className="register-Orga-User-Form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        Username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>

      <label>
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </label>

      <button type="submit" disabled={!isConfirmBtnActive}>
        Sign Up
      </button>

      {confirmedUsername && <h3>Welcome {confirmedUsername}!</h3>}
    </form>
  );
}
