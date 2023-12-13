// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Imports von benoetigten Paketen
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterOrgaUserForm.scss";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);
  const navigate = useNavigate();

  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [firstname, lastname, email, organization, password, confirmPassword]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      firstname,
      lastname,
      email,
      organization,
      password,
    };


    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register/organizer`,
        userData
      );
      // alert("Sie haben sich erfolgreich registriert ", resp)
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  const handleFirstnameChange = (evt) => {
    setFirstname(evt.target.value);
  };
  const handleLastnameChange = (evt) => {
    setLastname(evt.target.value);
  };
  const handleOrganizationChange = (evt) => {
    setOrganization(evt.target.value);
  };
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
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
    const isValid = password.length > 0 && password === confirmPassword;
    setConfirmBtnActive(isValid);
  };

  return (
    <section className="register-Orga-User-section">
      <div className="info_card" >
        <h1>Erstellen Sie Events!</h1>
        <p>
          Sie sind Promoter und wollen Ihre nächste KUNST-Ausstellung, Messe oder Auktion auf dieser Seite ankündigen?<br></br>
          Registrieren Sie Ihre Organisation und erstellen und updaten
          Sie Ihre Events.
        </p>
        <div className="redirect">
          <p>Ihre Organisation ist bereits registriert? </p>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <form className="register-Orga-User-Form" onSubmit={handleSubmit}>

        <h2>REGISTRIERUNG</h2>

        <div className="input">
          <div className="inputs-column">
            <div className="group">
              <input type="text" required onChange={handleFirstnameChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Firstname</label></div>
            <div className="group">
              <input type="text" required onChange={handleOrganizationChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Organization</label></div>
            <div className="group">
              <input type="password" required onChange={handlePasswordChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label></div>
          </div>

          <div className="inputs-column">
            <div className="group">
              <input type="text" required onChange={handleLastnameChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Lastname</label>
            </div>
            <div className="group">
              <input type="text" required onChange={handleEmailChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label></div>
            <div className="group">
              <input type="password" required onChange={handleConfirmPasswordChange} autoComplete="new-password" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Confirm Password</label>
            </div>
          </div>

        </div>

        <button type="submit" disabled={!isConfirmBtnActive}> Sign Up </button>

        <span className="login-hinweis"> Bereits registriert? <Link to="/login">Hier anmelden </Link></span>

      </form>
    </section>
  );
}
