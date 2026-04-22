import "./App.css";
import { Box, Toolbar } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllIsues from "./pages/AllIssues/AllIsues.jsx";
import Header from "./components/Header.jsx";
import SideNavBar from "./components/SideNavBar.jsx";
import NewIssue from "./pages/NewIssue/NewIssue.jsx";
import IssueDetail from "./pages/IssueDetail/IssueDetail.jsx";
import AddUser from "./pages/AddUser/AddUser.jsx";
import MyTasks from "./pages/MyTasks/MyTasks.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import { ToastContainer, toast } from "react-toastify";

function Layout1() {
  const location = useLocation();
  const hideHeaderRoutes = ["/new", "/issue", "/auth"];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ width: "85%", ml: "15%" }}>
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        {!hideHeaderRoutes.includes(location.pathname) && <Toolbar />}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/allissues" element={<AllIsues />} />
          <Route path="/new" element={<NewIssue />} />
          <Route path="/issue" element={<IssueDetail />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/my" element={<MyTasks />} />
        </Routes>
      </Box>
    </Box>
  );
}

function Layout() {
  const location = useLocation();
  const hideideNavRoutes = ["/auth"];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ width: "100%" }}>
        {!hideideNavRoutes.includes(location.pathname) && <SideNavBar />}
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />

        <Layout />
        <Layout1 />
      </div>
    </>
  );
}

export default App;
