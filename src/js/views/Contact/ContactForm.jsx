import { useState } from "react";
import "./kontaktFormStyle.scss";

const ContactForm = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="KontaktForm-container">
      <form onSubmit={handelSubmit}>
        <h2 className="kontaktForm-container-header">KONTAKT</h2>
        <div className="group">
          <input type="text" required />
          <span className="highlight"></span>
          <span className="bar">
          </span><label>Ihre Vorname</label></div>
        <div className="group">
          <input type="text" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Ihre Nachname</label>
        </div>
        <div className="group">
          <input type="text" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Ihre Organisation</label>
        </div>
        <div className="group"><input type="text" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Ihre Email</label>
        </div>
        <div className="group">
          <textarea type="textarea" rows="5" required></textarea>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Message</label>
        </div>
        <button type="submit">Absenden</button>
      </form>
    </div>
  );
};

export default ContactForm;
