import React from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import StatCard from "./StatCard";
import NewIssueButton from "../../components/NewIssueButton";
import ResentIssuesTable from "./ResentIssuesTable";

function Dashboard() {
  const cards = [
    { title: "Total Issues", color: "text.secondary", amount: 142 },
    { title: "Open", color: "secondary.main", amount: 18 },
    { title: "In Progress", color: "info.main", amount: 43 },
    { title: "Resolved", color: "success.main", amount: 81 },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
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
            <ResentIssuesTable />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
