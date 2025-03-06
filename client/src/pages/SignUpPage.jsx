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
import { signupSchema } from "../validations/authValidation";
import { useAuthActions } from "../hooks/useAuthActions";
import { NavLink } from "react-router";
import { useState } from "react";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const { handleSignup } = useAuthActions();

  const [status, setStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const onSubmit = async ({ name, email, password }) => {
    const result = await handleSignup({
      name,
      email,
      password,
    });

    if (!result.success) {
      setStatus({ success: false, error: true, message: result.message });
      return;
    }
    setStatus({ success: true, error: false, message: result.message });
    reset();
  };
  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Signup
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
              <FormLabel htmlFor="name"> Name</FormLabel>
              <TextField
                {...register("name")}
                id="name"
                placeholder="Enter your Name"
                fullWidth
                required
              />
              {formErrors.name && (
                <Typography>{formErrors.name.message}</Typography>
              )}
            </FormControl>
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
              />
              {formErrors.password && (
                <Typography>{formErrors.password.message}</Typography>
              )}
            </FormControl>
            <FormControl required fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="cnfpassword"> Confirm Password</FormLabel>
              <TextField
                {...register("confirmPassword")}
                id="cnfpassword"
                placeholder="Re-enter you password"
                fullWidth
                required
                type="Password"
              />
              {formErrors.confirmPassword && (
                <Typography>{formErrors.confirmPassword.message}</Typography>
              )}
            </FormControl>
            <Button fullWidth variant="contained" type="submit">
              Register
            </Button>
          </Box>
          <Typography>
            Already a user? <NavLink to="/login">Login</NavLink>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SignUpPage;
