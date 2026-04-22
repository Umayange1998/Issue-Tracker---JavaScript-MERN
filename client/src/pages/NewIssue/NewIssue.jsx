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
import { api } from "../../https/api.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function NewIssue() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState("Medium");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const issueMutation = useMutation({
    mutationFn: (data) => api.post("/issue", data),
    onSuccess: () => {
      toast.success("Issue created successfully!");
      setTitle("");
      setDescription("");
      setPriority("Medium");
      navigate("/allissues");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create issue");
    },
  });
  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    issueMutation.mutate({
      title,
      priority,
      status: "Open",
      description,
      assignedTo: [],
    });
  };

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
          New Issue
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
          onClick={() => navigate(-1)}
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
          <Paper
            // variant="outlined"
            elevation={3}
            sx={{ p: 5, mt: 5, borderRadius: 4 }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Issue Title
              </Typography>
              <TextField
                fullWidth
                type="text"
                size="small"
                sx={{
                  mb: 1,
                  mt: 1,
                  borderRadius: 2,
                  bgcolor: "background.default",
                }}
                error={!!error}
                helperText={error}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                type="text"
                sx={{
                  mb: 1,
                  mt: 1,
                  borderRadius: 2,
                  bgcolor: "background.default",
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "text.secondary",
                  alignItems: "flex-start",
                }}
              >
                Priority
              </Typography>
              <Select
                size="small"
                sx={{
                  minWidth: "50%",
                  borderRadius: 2,
                  bgcolor: "background.default",
                }}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </Box>

            <Button
              sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {issueMutation.isPending ? "Uploading..." : "+ Create New Issue"}
            </Button>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NewIssue;
