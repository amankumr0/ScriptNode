import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authServices } from "./appwrite/AuthService";
import { login, logout } from "./Store/authSlice";
import App from "./App";

export default function App2() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const user = authServices.getCurrentUser();
            if (user) {
                dispatch(login({ userData: user }))
            } else {
                dispatch(logout())
            }
        } catch (error) {
            console.log("Error:: APP :: usesEffetct")
        } finally {
            setLoading(false)
        }
    }, [])

}
