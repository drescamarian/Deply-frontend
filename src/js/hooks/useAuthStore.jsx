import { createContext, useContext, useEffect, useState } from "react";

// Erstelle neuen Context fuer die Speicherung der Userdaten
const AuthStoreCtx = createContext({
    userData: {},
    setUserData: () => {},
    isOnline: () => {},
    clearUserData: () => {}
});


// Konstante fuer Provider des Userdatencontext
export function AuthStoreProvider({children}) {
    // Statespeicher fuer die Userdaten, die vom Server beim Einloggen ausgeliefert werden
    // Ist der Wert null, scheint man nicht eingeloggt zu sein.
    const [userData, setUserData] = useState(null);

    // Lade initial Daten aus dem sessionStorage, um bei Reload, die Userdaten wiederherzustellen
    useEffect(() => {
        if (!userData) {
            setUserData(JSON.parse(sessionStorage.getItem('userData')));
        }
    }, []);

    // Speichere Userdaten bei Veraenderung im sessionStorage fuer Wiederherstellung, wenn Daten nicht null
    useEffect(() => {
        if (userData) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    // Convenience Funktion zum Pruefen, ob User Frontendseitig als eingeloggt gilt
    const isOnline = () => {
        return userData !== null;
    };

    // Convenience Funktion zum Frontendseitigen ausloggen (Userdaten leeren)
    const clearUserData = () => {
        setUserData(null);
        sessionStorage.removeItem('userData');
    };

    return (
        <AuthStoreCtx.Provider value={{userData, setUserData, isOnline, clearUserData}}>
            {children}
        </AuthStoreCtx.Provider>
    );
};


// Custom hook fuer das Ausliefern des Context Values
export const useAuthStore = () => {
    // Wert, der im Context gespeichert wird
    const authStore = useContext(AuthStoreCtx);
    return authStore;
};