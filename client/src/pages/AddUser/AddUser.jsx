import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          Add New User
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "#555555",
            borderColor: "#555555",

            minWidth: 40,
            height: 40,
            p: 0,
          }}
          onClick={() => navigate("/")}
        >
          <X />
        </Button>
      </Grid>
      <Divider sx={{ width: "100%" }} />

      <Grid
        size={7}
        sx={{
          px: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Paper variant="outlined" sx={{ p: 5, mt: 5, borderRadius: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                type="text"
                size="small"
                sx={{
                  mb: 1,
                  mt: 1,
                  borderRadius: 4,
                  bgcolor: "background.default",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {errors.title && (
              <Typography color="error" variant="caption">
                {errors.title}
              </Typography>
            )} */}
            </Box>

            <Button
              sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              fullWidth
              variant="contained"
              color="primary"
              //   onClick={handleSubmit}
            >
              {loading ? "Updating..." : "+ Add New User"}
            </Button>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddUser;
