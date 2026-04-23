import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import StatCard from "./StatCard";
import NewIssueButton from "../../components/NewIssueButton";
import ResentIssuesTable from "./ResentIssuesTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../https/api";

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["issues"],
    queryFn: () => api.get("/issue"),
  });

  const issues = data?.data || [];

  const total = issues.length;
  const open = issues.filter((i) => i.status === "Open").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;

  const cards = [
    { title: "Total Issues", color: "text.secondary", amount: total },
    { title: "Open", color: "secondary.main", amount: open },
    { title: "In Progress", color: "info.main", amount: inProgress },
    { title: "Resolved", color: "success.main", amount: resolved },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 5, px: 5 }}>
      <Grid size={12}>
        <Grid container spacing={2}>
          {cards.map((card) => {
            return (
              <Grid size={3}>
                <StatCard
                  title={card.title}
                  color={card.color}
                  amount={card.amount}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid size={12} sx={{ pb: 5 }}>
        <Paper variant="outlined" sx={{ borderRadius: 4 }}>
          <Box
            sx={{
              width: "100%",
              px: 3,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Recent Issues</Typography>
            <NewIssueButton />
          </Box>
          <Divider />
          <Box sx={{ width: "100%" }}>
            <ResentIssuesTable issues={issues} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
