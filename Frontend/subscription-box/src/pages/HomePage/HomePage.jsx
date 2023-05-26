import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:5000/api/user");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to our website, {user.username}!</h1>
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default HomePage;
