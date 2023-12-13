import { NavLink } from "react-router-dom";
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAuthStore } from "../../hooks/useAuthStore.jsx";
import "../../../styles/header.scss";


function Header() {
  const { userData, isOnline } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(false);

  return (
    <header>
      <div className="logo">
        <div className="first__line">
          <h1>KUNST</h1>
          <span>KSH</span>
        </div>
        <div className="second__line">
          <h1>IM BLICK</h1>
        </div>
      </div>
      <div className="hamburger" onClick={() => setOpen(true)}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className="nav-container">
        {<NavLink to="/">Events</NavLink>}
        {isOnline() && userData.role == "organizer" && <NavLink to="/event">Event erstellen</NavLink> || <NavLink to="/register/organizer">Event hinzufügen</NavLink>}
        {isOnline() && <NavLink to={`/mydata/`}>Meine Daten</NavLink>}
        {/* {isOnline() && <NavLink to="/users">Users</NavLink>} */}
        {!isOnline() && <NavLink to="/login">Anmeldung</NavLink>}
        {isOnline() && <NavLink to="/logout">Abmelden</NavLink>}
        {/* {!isOnline() && <NavLink to="/kontakt">Kontakt</NavLink>} */}
        {/* {isOnline() && <h3>Hallo, {userData.username}!</h3>} */}
      </nav>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="modal__nav">
          <div className="hamburger__close" onClick={() => setOpen(false)}>
            <span className="lines"></span>
            <span className="lines"></span>
          </div>
          <ul className="nav__links">
            <li>
              <NavLink to="/" onClick={handleOpen}>Events</NavLink>
            </li>
            {isOnline() && userData.role == "organizer" && (
              <li>
                <NavLink to="/event" onClick={handleOpen}>Add Event</NavLink>
              </li>
            )}
            {isOnline() && (
              <li>
                <NavLink to={`/mydata/`} onClick={handleOpen}>My Data</NavLink>
              </li>
            )}

            {!isOnline() && (
              <li>
                <NavLink to="/login" onClick={handleOpen}>Login</NavLink>
              </li>
            )}
            {isOnline() && (
              <li>
                <NavLink to="/logout" onClick={handleOpen}>Sign Out</NavLink>
              </li>
            )}
            {/* {!isOnline() && (
              <li>
                <NavLink to="/kontakt" onClick={handleOpen}>Kontakt</NavLink>
              </li>
            )} */}
            {/* {isOnline() && <h3>Hallo, {userData.username}!</h3>} */}
          </ul>
          <ul className="nav__footer">
            <li >
              <NavLink to="/kontakt" onClick={handleOpen}>Kontakt</NavLink>
            </li>
            <li>
              <NavLink to="/Impressum" >
                Impressum
              </NavLink>
            </li>
            <li>
              <NavLink to="/datenschutz" >
                Datenschutz
              </NavLink>
            </li>
          </ul>

        </Box>
      </Modal>

    </header>
  );
}

export default Header;
