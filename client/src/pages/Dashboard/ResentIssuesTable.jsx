import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const recentIssuesData = [
  {
    id: "1",
    title: "Fix mobile responsiveness on dashboard",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    title: "Implement JWT authentication",
    status: "Open",
    priority: "Urgent",
  },
  {
    id: "3",
    title: "Documentation for API v2",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: "1",
    title: "Fix mobile responsiveness on dashboard",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    title: "Implement JWT authentication",
    status: "Open",
    priority: "Urgent",
  },
  {
    id: "3",
    title: "Documentation for API v2",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "1",
    title: "Fix mobile responsiveness on dashboard",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    title: "Implement JWT authentication",
    status: "Closed",
    priority: "Urgent",
  },
  {
    id: "3",
    title: "Documentation for API v2",
    status: "Resolved",
    priority: "Medium",
  },
];

function ResentIssuesTable({ issues }) {
  const navigate = useNavigate();
  const query = useSelector((state) => state.search.query.toLowerCase());
  const recentIssues = [...issues]
    .filter((issue) => {
      return (
        issue.title?.toLowerCase().includes(query) ||
        issue.issueId?.toString().includes(query)
      );
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);
  return (
    <TableContainer sx={{ maxHeight: 400 }}>
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
              Created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentIssues.map((issue) => (
            <TableRow
              key={issue._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" sx={{ color: "text.secondary" }}>
                {issue.issueId}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ color: "text.primary", fontWeight: 500 }}
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
                            : issue.status === "Closed"
                              ? "closed.main"
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
                {new Date(issue.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResentIssuesTable;
