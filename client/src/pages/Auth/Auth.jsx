import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleChangeForm = () => {
    setIsSignIn((prev) => !prev);
    // setGeneralError("");
    // setRegEmailError("");
    // setRegPasswordError("");
    // setFullNameError("");
    // setData({
    //   name: "",
    //   email: "",
    //   password: "",

    // });
  };
  return (
    <Grid container>
      <Grid
        size={6}
        sx={{
          height: "100vh",
          bgcolor: "#1E293B",
          px: 10,
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold" }}>
          IssueFlow
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#ffffff", fontWeight: "bold", textAlign: "start" }}
        >
          Architecting the future of
          <br /> team coordination.
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            right: -80,
            width: 320,
            height: 320,
            border: "40px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "rotate(12deg)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 380,
            height: 380,
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
            width: "100%",
            height: "1px",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
            width: "100%",
            height: "1px",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />
      </Grid>
      <Grid size={6} sx={{ py: 10, px: 20 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "start" }}
        >
          {isSignIn ? " LogIn" : " Registration"}
        </Typography>
        <Box
          sx={{
            component: "form",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 5,
          }}
        >
          {!isSignIn && (
            <Box>
              <Typography sx={{ textAlign: "start", color: "text.secondary" }}>
                Full Name
              </Typography>
              <TextField
                size="small"
                placeholder="John Doe"
                //   onChange={onChangeHandler}
                name="name"
                //   value={data.name}
                fullWidth
                //   error={!!fullNameError}
                //   helperText={fullNameError}
              />
            </Box>
          )}

          <Box>
            <Typography sx={{ textAlign: "start", color: "text.secondary" }}>
              Email
            </Typography>
            <TextField
              size="small"
              placeholder="john@email.com"
              type="email"
              // onChange={onChangeHandler}
              name="email"
              // value={data.email}
              fullWidth
              // error={!!regEmailError}
              // helperText={regEmailError}
            />
          </Box>
          <Box>
            <Typography sx={{ textAlign: "start", color: "text.secondary" }}>
              Password
            </Typography>

            <TextField
              size="small"
              placeholder="********"
              type="password"
              // onChange={onChangeHandler}
              name="password"
              // value={data.password}
              fullWidth
              // error={!!regPasswordError}
              // helperText={regPasswordError}
            />
          </Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              background: "linear-gradient(135deg, #2563EB, #1E40AF)",
            }}
            // onClick={isSignIn ? onLoginHandler : onRegisterHandler}
          >
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>

          <Typography textAlign="center" mt={3}>
            {isSignIn ? (
              <>
                Don’t have an account?{" "}
                <Button variant="text" onClick={handleChangeForm}>
                  {" "}
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button variant="text" onClick={handleChangeForm}>
                  Sign in
                </Button>
              </>
            )}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Auth;
