import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/store";
import s from "./CreateAcctountNew.module.css";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Schema = z
  .object({
    name: z.string().min(1),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    age: z.number().min(1).max(99),
    email: z.string().email(),
    city: z.string().min(1, { message: "error" }).max(20),
    file: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }

    return data;
  });

export type FormTypeCreateUserNew = z.infer<typeof Schema>;

const defaultTheme = createTheme();

export const SignUp = () => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormTypeCreateUserNew>({
    resolver: zodResolver(Schema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(errors);

  const onSubmit = async (data: FormTypeCreateUserNew) => {
    console.log(data);
    try {
      await authService.createUser({ ...data, file: data.file[0] });
      toast.info("User created", {
        type: "success",
        theme: "colored",
      });
      navigate("/");
    } catch (e) {
      toast.error("Something wrong happened");
      console.log(e);
      navigate("/");
    }
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                component="label"
                style={{ margin: "1em" }}
              >
                Upload PHOTO
                <input {...register("file")} name={"file"} type="file" hidden />
              </Button>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("name")}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("age", { valueAsNumber: true })}
                  name={"age"}
                  size={"small"}
                  helperText="Please enter age"
                  id="demo-helper-text-aligned"
                  label="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("city")}
                  required
                  fullWidth
                  id="email"
                  label="city"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("confirmPassword")}
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
