import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.id,
    first_name: user.first_name,
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:5000/api/auth";
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isServerError, setIsServerError] = useState(false);

  const registerUser = async (registerData) => {
    try {
      const finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        address: registerData.address,
        phone_number: registerData.phone_number,

      };
      const response = await axios.post(`${BASE_URL}/register`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
      } else {
        setIsServerError(true);
        console.log("Registration failed.");
      }
    } catch (error) {
      setIsServerError(true);
      console.error("An error occurred during registration:", error.response.data);
    }
  };

const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    console.log(response);
    if (response && response.status === 200 && response.data && response.data.access) {
      const accessToken = response.data.access;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      const loggedInUser = jwtDecode(accessToken);
      setUser(setUserObject(loggedInUser));
      setIsServerError(false);
      navigate("/");
    } else {
      setIsServerError(true);
      navigate("/");
    }
  } catch (error) {
    console.log("Error logging in:");
    setIsServerError(true);
    navigate("/");
  }
};

  

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext
