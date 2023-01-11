import React from "react";
import Lottie from "lottie-react";
import deliveryBox from "../../assets/Lottie/delivery-box.json";
import { Stack, TextField, InputAdornment, Button } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import styles from "./Login.module.css";
import LoginIcon from "@mui/icons-material/Login";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";

export const Login = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <Stack className={styles.login_container}>
      <Stack className={styles.login}>
        <Lottie
          animationData={deliveryBox}
          loop={true}
          className={styles.login_animation}
        />

        <h1 className={styles.login_title}>INFRABOX</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack spacing={3} className={styles.login_content}>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : ""}
                  placeholder='Email'
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : ""}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Password'
                  onChange={onChange}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HttpsIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<LoginIcon />}
            >
              SIGN IN
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};
