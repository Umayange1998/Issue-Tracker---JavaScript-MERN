import { Box, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";

export default function Layout1() {
  const location = useLocation();

  const hideHeaderRoutes = ["/new", "/issue", "/adduser"];

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavBar />

      <Box sx={{ width: "100%", ml: "15%" }}>
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        {!hideHeaderRoutes.includes(location.pathname) && <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  );
}
