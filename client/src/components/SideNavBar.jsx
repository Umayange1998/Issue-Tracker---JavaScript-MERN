import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  LayoutGrid,
  ListTodo,
  PlusCircle,
  UserPlus,
  NotebookPen,
  LogOut,
} from "lucide-react";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { removeUser } from "../Redux/Slices/userSlice";

function SideNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adduser = location.pathname === "/adduser";
  const { role } = useSelector((state) => state.user);

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/" },
    { label: "All Issues", icon: ListTodo, path: "/allissues" },
    { label: "New Issue", icon: PlusCircle, path: "/new" },
    { label: "My Tasks", icon: NotebookPen, path: "/my" },
  ];
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/auth");
  };
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
        <Typography
          onClick={() => navigate("/")}
          variant="h5"
          sx={{ color: "#ffffff", cursor: "pointer" }}
        >
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
        {role === "admin" && (
          <ListItem
            sx={{
              backgroundColor: adduser ? "#334155" : "transparent",
              color: adduser ? "#ffffff" : "#94A3B8",
              borderLeft: adduser
                ? "3px solid #E2E8F0"
                : "3px solid transparent",

              "&:hover": {
                backgroundColor: "#33415580",
                color: "#ffffff",
              },
            }}
          >
            <ListItemButton onClick={() => navigate("/adduser")}>
              <ListItemIcon>
                <UserPlus size={20} color="#94A3B8" />
              </ListItemIcon>
              <ListItemText primary={"Add Member"} sx={{ color: "#fff" }} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem
          sx={{
            "&:hover": {
              backgroundColor: "#33415580", // 50% opacity
              color: "#ffffff",
            },
          }}
        >
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogOut size={20} color="#94A3B8" />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default SideNavBar;
