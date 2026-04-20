import "./App.css";
import { Box, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllIsues from "./pages/AllIssues/AllIsues.jsx";
import Header from "./components/Header.jsx";
import SideNavBar from "./components/SideNavBar.jsx";
import NewIssue from "./pages/NewIssue/NewIssue.jsx";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideNavBar />

      {/* Main Content */}
      <Box sx={{ width: "85%", ml: "15%", px: 5 }}>
        <Header />

        {/* This pushes content below fixed header */}
        <Toolbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/allissues" element={<AllIsues />} />
          <Route path="/new" element={<NewIssue />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
