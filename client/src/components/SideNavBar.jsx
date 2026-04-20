import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutGrid,
  ListTodo,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react";
import Typography from "@mui/material/Typography";

function SideNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/" },
    { label: "All Issues", icon: ListTodo, path: "/allissues" },
    { label: "New Issue", icon: PlusCircle, path: "/new" },
  ];
  return (
    <Box
      sx={{
        width: "15%",
        height: "100vh",
        background: "#1E293B",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {" "}
      <Box sx={{ px: 6, py: 4 }}>
        <Typography variant="h5" sx={{ color: "#ffffff" }}>
          IssueTracker
        </Typography>
      </Box>
      <Divider
        sx={{
          // width: "100%",
          borderColor: "#94A3B8",
          borderBottomWidth: 1,
        }}
      />
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.label}
              sx={{
                backgroundColor: isActive ? "#334155" : "transparent",
                color: isActive ? "#ffffff" : "#94A3B8",
                borderLeft: isActive
                  ? "3px solid #E2E8F0"
                  : "3px solid transparent",

                "&:hover": {
                  backgroundColor: "#33415580", // 50% opacity
                  color: "#ffffff",
                },
              }}
            >
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  <item.icon size={20} color="#94A3B8" />
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: "#fff" }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default SideNavBar;
