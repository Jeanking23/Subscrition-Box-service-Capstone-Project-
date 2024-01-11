import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
    const { users, token } = useContext(AuthContext)
    return { users, token }
};

export default useAuth;