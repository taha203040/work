import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });

      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name || user.email}</h1>
      {/* يمكنك إضافة الملاحظات أو أي محتوى هنا لاحقًا */}
    </div>
  );
};

export default Dashboard;
