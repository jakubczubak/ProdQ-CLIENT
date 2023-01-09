import React from "react";
import Lottie from "lottie-react";
import deliveryBox from "..//assets/Lottie/delivery-box.json";
import { Stack, TextField, InputAdornment, Button } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import styles from "./Login.module.css";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log(email + " " + password);
  };

  return (
    <Stack className={styles.login_container}>
      <Stack className={styles.login}>
        <Lottie
          animationData={deliveryBox}
          loop={true}
          className={styles.login_animation}
        />
        <Stack spacing={3} className={styles.login_content}>
          <h1 className={styles.login_title}>INFRABOX</h1>
          <TextField
            label="Email"
            type="email"
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              ),
            }}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            size="large"
            endIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            SIGN IN
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
