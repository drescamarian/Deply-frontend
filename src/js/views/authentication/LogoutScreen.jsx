import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import axios from "axios";
import "./LogoutScreen.scss"


export default function LogoutScreen() {
    const { isOnline, clearUserData } = useAuthStore();

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_BASE_URL}auth/logout`, {
            withCredentials: true
        })
            .then(resp => {
                clearUserData();
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            })
            .catch(error => {
                clearUserData();
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            });
    }, []);

    return (
        <div className="logout">
            {!isOnline() && <h3 className="logout_message">Sie haben sich erfolgreich abgemeldet.</h3>}
        </div>
    );
}