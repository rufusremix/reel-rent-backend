import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ mt: 5 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
