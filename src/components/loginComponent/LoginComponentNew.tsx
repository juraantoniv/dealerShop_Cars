import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";

import {
  setLocalAccessToken,
  setLocalRefreshToken,
} from "../../common/localStorage/local.storege";
import { authService } from "../../services/auth.service";
import { userActions, userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import s from "./LoginComponent.module.css";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to={""}>Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Schema = z.object({
  password: z.string().min(1),
  email: z.string().email({ message: "error" }),
});

export type FormType = z.infer<typeof Schema>;

const defaultTheme = createTheme();

type SignType = {
  callback: () => void;
};

export const SignIn: React.FC<SignType> = ({ callback }) => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormType) => {
    authService
      .login(data)
      .then((r) => {
        console.log(r);

        setLocalAccessToken(r?.data?.tokens.accessToken);
        setLocalRefreshToken(r?.data?.tokens.refreshToken);
        dispatch(userActions.setCurrenUser(r.data.user));

        dispatch(userThunks.fetchGoods());
        toast.info(`Welcome ${r?.data?.user.name} in our platform!`, {
          position: "top-right",
          theme: "colored",
          type: "success",
        });
      })
      .catch((e) => {
        console.log(e.response.data.messages);
        toast.error(`${e.response?.data.messages}`, {
          position: "top-right",
          theme: "colored",
          type: "error",
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={s.container}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              defaultValue={"juraantoniv@gmail.com"}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              error={!!errors?.password?.message}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"forgot_password"} onClick={callback}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"create"} onClick={callback}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
