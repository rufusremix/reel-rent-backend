import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/authValidation";
import { useAuthActions } from "../hooks/useAuthActions";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { handleLogin } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const [status, setStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const onSubmit = async (userData) => {
    const result = await handleLogin(userData);
    if (!result.success) {
      setStatus({ success: false, error: true, message: result.message });
      return;
    }
    setStatus({ success: true, error: false, message: result.message });
    setTimeout(() => navigate(from, { replace: true }), 400);
  };
  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Login
          </Typography>
          {status.message && (
            <Alert
              severity={status.success ? "success" : "error"}
              sx={{ mb: 2 }}
            >
              {status.message}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mb: 2 }}
          >
            <FormControl required fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="email"> Email</FormLabel>
              <TextField
                {...register("email")}
                id="email"
                placeholder="Enter your email"
                fullWidth
                required
              />
              {formErrors.email && (
                <Typography>{formErrors.email.message}</Typography>
              )}
            </FormControl>
            <FormControl required fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="password"> Password</FormLabel>
              <TextField
                {...register("password")}
                id="password"
                placeholder="Enter your password"
                fullWidth
                required
                type="password"
              />
              {formErrors.password && (
                <Typography>{formErrors.password.message}</Typography>
              )}
            </FormControl>
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
          </Box>
          <Typography>
            Don't have an account? <NavLink to="/signup">Signup</NavLink>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
