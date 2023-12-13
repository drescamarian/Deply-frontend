import { Outlet } from "react-router-dom";
// import { AuthStoreProvider, useAuthStore } from "../hooks/useAuthStore";
import { AuthStoreProvider } from "../../hooks/useAuthStore";
import { EventProvider } from "../../context/EventContext.jsx";

import { Footer } from "./Footer.jsx";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <AuthStoreProvider>
      <EventProvider>
        <div className="app">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </EventProvider>
    </AuthStoreProvider>
  );
}
