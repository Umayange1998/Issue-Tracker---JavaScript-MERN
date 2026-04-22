import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AllIsues from "./pages/AllIssues/AllIsues.jsx";
import NewIssue from "./pages/NewIssue/NewIssue.jsx";
import IssueDetail from "./pages/IssueDetail/IssueDetail.jsx";
import AddUser from "./pages/AddUser/AddUser.jsx";
import MyTasks from "./pages/MyTasks/MyTasks.jsx";
import Auth from "./pages/Auth/Auth.jsx";

import Layout1 from "./theme/Layout1.js";
import LayoutAuth from "./theme/LayoutAuth.js";
import { ToastContainer } from "react-toastify";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
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
            <ProtectedRoutes>
              <Layout1 />
            </ProtectedRoutes>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/allissues" element={<AllIsues />} />
          <Route path="/new" element={<NewIssue />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/my" element={<MyTasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
