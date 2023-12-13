import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { useLocation } from "react-router-dom";

export default function PrivateRoute() {
    const { isOnline } = useAuthStore();
    const location = useLocation();

    return (
        // Wenn online, zeige angeforderte Route an
        // Wenn NICHT online, Navigiere zum Login und speichere angeforderte Route im location State, um zurueckzukehren
        isOnline() ? <Outlet /> : <Navigate to='/login' replace state={{from: location}} />
    );
};