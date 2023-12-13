// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import der zugehoerigen CSS-Datei
import "./styles/App.scss";

// Import eigener Komponenten
import Layout from "./js/components/Layout/Layout";
import RegisterForm from "./js/views/authentication/RegisterForm";
import LoginForm from "./js/views/authentication/LoginForm";
import UserInfo from "./js/views/user/UserInfo";
import LogoutScreen from "./js/views/authentication/LogoutScreen";
import PrivateRoute from "./js/services/PrivateRoute";
import UsersTable from "./js/views/user/UsersTable";
import RegisterUserForm from "./js/views/authentication/RegisterUserForm.jsx";
import RegisterOrgaForm from "./js/views/authentication/RegisterOrgaForm.jsx";
import AddEventForm from "./js/views/event/AddEventForm.jsx";
import EventOverview from "./js/views/event/EventOverview.jsx";
import ContactForm from "./js/views/Contact/ContactForm.jsx"
import EventDetails from "./js/views/event/EventDetails.jsx"
import EditEvent from "./js/views/EditEvent.jsx";

// Definition einer Komponente
// Am besten gleich als export Statement schreiben, um es nachher nicht zu vergessen.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<EventOverview />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register/user" element={<RegisterUserForm />} />
          <Route path="/register/organizer" element={<RegisterOrgaForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route path="/event" element={<AddEventForm />} />
          <Route path="/kontakt" element={<ContactForm />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mydata" element={<UsersTable />} />
            <Route path="/users/:userId" element={<UserInfo />} />
            <Route path="/event/edit/:eventId" element={<EditEvent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
