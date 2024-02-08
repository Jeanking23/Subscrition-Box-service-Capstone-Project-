import React, { useEffect, useState } from "react";
import { useNavigate}  from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";

const HomePage = () => {
  const { user, token } = useAuth();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/box_service/subscription", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Response:", response);

        if (response && response.data) {
          console.log("Data:", response.data);
          setData(response.data);
        } else {
          setError("No data received from the server");
        }
        setIsPending(false);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data);
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleStartClick = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/subscribe");
    }
  };

  return (
    <div className="homepage-container">
      <div className="content-container">
        <h1>Welcome to Box service, {user ? user.username : "Guest" }!</h1>
        {isPending ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <div>
            {data.length > 0 ? (
              <ul>
                {data.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
            <button onClick={handleStartClick} className="st-btn">
              Start
            </button>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
