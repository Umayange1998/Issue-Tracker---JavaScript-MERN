import { Box, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";

export default function Layout1() {
  const location = useLocation();

  const shouldHideHeader =
    location.pathname === "/new" ||
    location.pathname === "/adduser" ||
    location.pathname.startsWith("/issue/");

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavBar />

      <Box sx={{ width: "100%", ml: "15%" }}>
        {!shouldHideHeader && <Header />}
        {!shouldHideHeader && <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  );
}
