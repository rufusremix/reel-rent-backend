import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { useAuthActions } from "../hooks/useAuthActions";
const NavBar = () => {
  const user = useAuth()?.auth?.user;
  const { handleLogout } = useAuthActions();

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        NAVBAR
        <NavLink to="/">Home</NavLink>
        {!user && <NavLink to="/signup">Signup</NavLink>}
        <NavLink to="/movies">Movies</NavLink>
        {user ? (
          <Typography
            component="span"
            sx={{
              color: "green",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => handleLogout()}
          >
            Logout{" "}
          </Typography>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        {user && <Typography>[User - ({user.name})]</Typography>}
      </Box>
    </>
  );
};

export default NavBar;
