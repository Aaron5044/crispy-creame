"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    /// This code checks if user data is stored in sessionStorage when the component mounts. 
    // If the data exists, it sets the user data to state. 
    // If no user data is found, it redirects the user to the login page.
    const fetchUser = async () => {
      const user = JSON.parse(sessionStorage.getItem("user")); // Get user data from sessionStorage
      if (user) {
        setUser(user);  // Set user data to state
      } else {
        router.push("/login");  // Redirect to login if no user session found
      }
    };

    // Fetch user data once after the component mounts
    fetchUser();
  }, []);  // Empty dependency array ensures this runs only once after mount

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>  {/* Display user email */}
      <p>Role: {user.role || 'Customer'}</p>  {/* Display user role */}
    </div>
  );
};

export default Dashboard;
