import { Box } from "@mui/material";
import { NavLink } from "react-router";
const NavBar = () => {
  return (
    <>
      <Box>
        NAVBAR
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </Box>
    </>
  );
};

export default NavBar;
