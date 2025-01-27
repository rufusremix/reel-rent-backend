import {
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
import { NavLink } from "react-router";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { handleLogin } = useAuthActions();

  const onSubmit = async (userData) => {
    await handleLogin(userData);
  };
  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Login
          </Typography>
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
              {errors.email && <Typography>{errors.email.message}</Typography>}
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
              {errors.password && (
                <Typography>{errors.password.message}</Typography>
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
