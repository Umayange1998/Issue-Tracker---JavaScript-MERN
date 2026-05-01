import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllIsues from "./pages/AllIssues/AllIsues.jsx";
import NewIssue from "./pages/NewIssue/NewIssue.jsx";
import IssueDetail from "./pages/IssueDetail/IssueDetail.jsx";
import AddUser from "./pages/Users/AddUser.jsx";
import MyTasks from "./pages/MyTasks/MyTasks.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Layout1 from "./theme/Layout1.js";
import LayoutAuth from "./theme/LayoutAuth.js";
import { ToastContainer } from "react-toastify";
import AllUsers from "./pages/Users/AllUsers.jsx";

function ProtectedRoutes({ children }) {
  const { isAuthenticated, role } = useSelector((state) => state.user);
  const location = useLocation();
  const checkAdmin = ["/adduser", "/userlist"];
  const isAdmin = role === "admin";

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  } else if (checkAdmin.includes(location.pathname) && !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  const isLoading = useLoadData();

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route
          element={
            // <ProtectedRoutes>
            <Layout1 />
            // </ProtectedRoutes>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/allissues" element={<AllIsues />} />
          <Route path="/new" element={<NewIssue />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/userlist" element={<AllUsers />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/my" element={<MyTasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
