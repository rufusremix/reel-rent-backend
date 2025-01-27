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
import { signupSchema } from "../validations/authValidation";
import { useAuthActions } from "../hooks/useAuthActions";
import { NavLink } from "react-router";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const { handleSignup } = useAuthActions();

  const onSubmit = async ({ name, email, password }) => {
    await handleSignup({ name, email, password });
  };
  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Signup
          </Typography>
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
              {errors.name && <Typography>{errors.name.message}</Typography>}
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
            <FormControl required fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="cnfpassword"> Confirm Password</FormLabel>
              <TextField
                {...register("confirmPassword")}
                id="cnfpassword"
                placeholder="Re-enter you password"
                fullWidth
                required
              />
              {errors.confirmPassword && (
                <Typography>{errors.confirmPassword.message}</Typography>
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
