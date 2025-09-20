import { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const data = ""; // get user info by server
            setUser(data);
        } catch (e) {
            setUser(null);
        }
    }, []);

    const clearLocalAuth = () => {
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });
        Cookies.remove("nickname", { path: "/" });
        setUser(null);
        // try {
        //     localStorage.setItem("auth", Date.now());
        // } catch (e) {}
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                clearLocalAuth,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
