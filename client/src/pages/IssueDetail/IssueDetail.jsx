import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const issue = {
  id: "1",
  title: "Fix mobile responsiveness on dashboard",
  description: " Lorem ipsum dolor sit amet, consectetur adipiscing. ",
  status: "In Progress",
  priority: "High",
};
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#000000",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function IssueDetail() {
  const [status, setStatus] = useState("Open");
  const navigate = useNavigate();
  const priority = "High";

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
        <Button
          sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
          onClick={() => navigate(-1)}
        >
          {" "}
          <ArrowLeft /> Back
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>#ISS-{issue.id}</Typography>
          <Box
            sx={{
              bgcolor: "secondary.main",
              minWidth: 40,
              height: 40,
              p: 0,
              borderRadius: 1,
            }}
          ></Box>
        </Box>
      </Grid>
      <Divider sx={{ width: "100%" }} />
      <Grid
        size={8}
        sx={{ px: 5, display: "flex", flexDirection: "column", gap: 5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 3,
            borderRadius: 4,
          }}
        >
          <Chip
            size="small"
            variant="outlined"
            sx={{
              borderColor:
                issue.status === "Open"
                  ? "warning.main"
                  : issue.status === "Resolved"
                    ? "success.main"
                    : issue.status === "In Progress"
                      ? "info.main"
                      : issue.status === "Closed"
                        ? "closed.main"
                        : "grey.400",
              color:
                issue.status === "Open"
                  ? "warning.main"
                  : issue.status === "Resolved"
                    ? "success.main"
                    : issue.status === "In Progress"
                      ? "info.main"
                      : "grey.400",
              borderRadius: 2,
              px: 1,
              width: 100,
            }}
            label={issue.status}
          />
          <Typography
            variant="h5"
            sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
          >
            {issue.title}{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              Specification
            </Typography>
            <Typography>{issue.description}</Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            // variant="caption"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            Internal Activity Log
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar {...stringAvatar("Kent Dodds")} />
            <Box>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "background.default",
                  border: 1,
                  borderColor: "#555555",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ color: "text.secondary" }}>
                  Synced with v2 migration. Patching now.
                </Typography>
              </Box>
              <Typography sx={{ color: "text.secondary" }}>user</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid size={4}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 4,
          }}
        >
          <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
            Controls
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="caption"
              sx={{ mt: 2, color: "text.secondary", fontWeight: "bold" }}
            >
              Change Status
            </Typography>
            <Select
              size="small"
              value={status}
              sx={{
                borderColor:
                  status === "Open"
                    ? "warning.main"
                    : status === "Resolved"
                      ? "success.main"
                      : status === "In Progress"
                        ? "info.main"
                        : status === "Closed"
                          ? "closed.main"
                          : "grey.400",
                color:
                  status === "Open"
                    ? "warning.main"
                    : status === "Resolved"
                      ? "success.main"
                      : status === "In Progress"
                        ? "info.main"
                        : "grey.400",
                borderRadius: 2,
                px: 1,
                width: "1005",
              }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Resolved"}>Resolved</MenuItem>
            </Select>
            <Button variant="contained" sx={{ bgcolor: "success.main" }}>
              Update
            </Button>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                PRIORITY
              </Typography>
              <Typography
                sx={{
                  color:
                    priority === "High"
                      ? "error.main"
                      : priority === "Urgent"
                        ? "urgent.main"
                        : priority === "Medium"
                          ? "info.main"
                          : priority === "Low"
                            ? "#94A3B8"
                            : "grey.400",
                }}
              >
                {priority}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                CREATED
              </Typography>
              <Typography>20/04/2026</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default IssueDetail;
