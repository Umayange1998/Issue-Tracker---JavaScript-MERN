import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../https/api";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let tempErrors = {};

    if (!isSignIn && validator.isEmpty(data.fullName)) {
      tempErrors.fullName = "Full name is required";
    }

    if (!validator.isEmail(data.email)) {
      tempErrors.email = "Valid email is required";
    }

    if (validator.isEmpty(data.password)) {
      tempErrors.password = "Password is required";
    } else if (!validator.isLength(data.password, { min: 6 })) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const loginMutation = useMutation({
    mutationFn: (data) => api.post("/user/login", data),
    onSuccess: (res) => {
      const { token, user } = res.data;

      localStorage.setItem("token", token);

      dispatch(
        setUser({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          token,
        }),
      );

      toast.success("Login successful!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data) => api.post("/user/register", data),
    onSuccess: () => {
      toast.success("Registration successful!");
      setTimeout(() => {
        setIsSignIn(true);
      }, 1500);
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || err?.message || "Registration failed";

      toast.error(message);
    },
  });

  const handleSubmit = () => {
    if (!validate()) return;

    if (isSignIn) {
      loginMutation.mutate({
        email: data.email,
        password: data.password,
      });
    } else {
      registerMutation.mutate(data);
    }
  };

  const handleChangeForm = () => {
    setIsSignIn((prev) => !prev);

    // clear inputs
    setData({
      fullName: "",
      email: "",
      password: "",
    });

    // clear validation errors
    setErrors({});
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
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              name="email"
              // value={data.email}
              fullWidth
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
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              name="password"
              fullWidth
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
            onClick={handleSubmit}
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
