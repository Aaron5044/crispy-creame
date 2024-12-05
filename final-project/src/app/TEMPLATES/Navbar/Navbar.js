"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import Home Icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import Logout Icon
import Link from "next/link"; // Correct import
import { useRouter } from "next/navigation"; // To handle redirection

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
  const router = useRouter();

  // Check session on component mount
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Set to true if user data exists in session
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Clear session data
    setIsLoggedIn(false); // Update the login state
    router.push("/logout"); // Redirect to logout page
    console.log("Session ended!!!!!!!!!!!"); // Log to console
    console.log("Session ended!!!!!!!!!!!"); // Log to console
    console.log("Session ended!!!!!!!!!!!"); // Log to console
  };

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, link: "/customer" }, // Added Home icon
    { name: "Cart", icon: <ShoppingCartIcon />, link: "/cart" },
    // Only show login icon if logged out
    !isLoggedIn && { name: "Login/Register", icon: <AccountCircleIcon />, link: "/loginExample" },
    // Only show logout icon if logged in
    isLoggedIn && {
      name: "Logout",
      icon: <ExitToAppIcon />,
      onClick: handleLogout, // Log out and clear session
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar is fixed to the top and spans the full width */}
      <AppBar position="fixed" sx={{ backgroundColor: "#ff4081", width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Logo - Aligned to the left */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Pacifico', cursive", // Use bubbly font
              color: "white",
              display: "flex",
              alignItems: "center",
              mr: 2,
            }}
          >
            Krispy Kreme
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {menuItems.map(
              (item, index) =>
                item && (
                  <IconButton
                    key={index}
                    component={item.onClick ? "button" : Link} // If there's an onClick, use button instead of Link
                    href={item.link}
                    onClick={item.onClick} // If logout, execute onClick
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": { textDecoration: "underline" },
                      margin: "0 10px",
                    }}
                  >
                    {item.icon || item.name}
                  </IconButton>
                )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add padding to content below navbar to avoid overlap */}
      <Box sx={{ paddingTop: "64px" }} />
    </Box>
  );
}
