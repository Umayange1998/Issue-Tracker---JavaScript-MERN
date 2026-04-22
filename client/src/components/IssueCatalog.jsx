import {
  Box,
  Chip,
  Grid,
  Link,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import NewIssueButton from "./NewIssueButton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../https/api.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function IssueCatalog({ onlyMyTasks = false }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const query = useSelector((state) => state.search.query.toLowerCase());
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["issues"],
    queryFn: () => api.get("/issue"),
  });
  const issues = data?.data || [];
  const filteredIssues = issues.filter((issue) => {
    const statusMatch = statusFilter === "All" || issue.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || issue.priority === priorityFilter;

    const searchMatch =
      issue.title?.toLowerCase().includes(query) ||
      issue.issueId?.toString().includes(query) ||
      issue.priority?.toLowerCase().includes(query);

    const myTaskMatch =
      !onlyMyTasks || issue.assignedTo?.some((u) => u._id === userId);

    return statusMatch && priorityMatch && searchMatch && myTaskMatch;
  });

  return (
    <Grid container spacing={2} sx={{ mt: 5, px: 5 }}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Issue Catalog
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value={"All"}>All Statuses</MenuItem>
            <MenuItem value={"Open"}>Open</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Resolved"}>Resolved</MenuItem>
          </Select>
          <Select
            size="small"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value={"All"}>All Priorities</MenuItem>
            <MenuItem value={"Urgent"}>Urgent</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
          </Select>
          <NewIssueButton />
        </Box>
      </Grid>
      <Grid size={12}>
        <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Priority
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow
                  key={issue.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ color: "text.secondary" }}>
                    {issue.issueId}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <Link
                      component="button"
                      underline="none"
                      onClick={() => navigate(`/issue/${issue._id}`)}
                      sx={{
                        color: "text.primary",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {issue.title}
                    </Link>
                    <Typography variant="caption">
                      {issue.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      sx={{
                        bgcolor:
                          issue.priority === "High"
                            ? "error.main"
                            : issue.priority === "Urgent"
                              ? "urgent.main"
                              : issue.priority === "Medium"
                                ? "info.main"
                                : issue.priority === "Low"
                                  ? "#94A3B8"
                                  : "grey.400",
                        color: "white",
                        borderRadius: 2,
                        px: 1,
                        width: 90,
                      }}
                      label={issue.priority}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    <Link
                      component="button"
                      underline="none"
                      onClick={() => navigate(`/issue/${issue._id}`)}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default IssueCatalog;
