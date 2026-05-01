import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { UserPlus, RefreshCw, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../https/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AllUsers() {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useSelector((state) => state.search.query.toLowerCase());
  const { token } = useSelector((state) => state.user);
  const [editedRoles, setEditedRoles] = useState({});

  /////////-----------GET USERS--------------/////////////
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/user/all"),
  });
  const users = data?.data?.data || [];

  ///////////////------------ UPDATE USER -------------//////////

  const updateMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return api.put(`/user/update/${id}`, role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("User update successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  /////////----------- DELETE USER --------////////
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  //////////----------------- handleRoleChange ------------//////////
  const handleRoleChange = (id, newRole) => {
    setEditedRoles((prev) => ({
      ...prev,
      [id]: newRole,
    }));
  };

  const handleUpdateUser = (id) => {
    const selectedRole = editedRoles[id];

    if (!selectedRole) return;

    updateMutation.mutate({
      id,
      role: selectedRole,
    });
  };

  const handleDeleteUser = (id) => {
    setSelectedUserId(id);
    setOpenDelete(true);
  };
  const confirmDeleteUser = () => {
    deleteMutation.mutate(selectedUserId);

    setOpenDelete(false);
    setSelectedUserId(null);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName?.trim().toLowerCase().includes(query) ||
      user._id?.toString().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });
  return (
    <Grid container spacing={2} sx={{ mt: 5, px: 5 }}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          Members
        </Typography>

        <Button
          onClick={() => navigate("/adduser")}
          variant="contained"
          sx={{ gap: 1 }}
        >
          <UserPlus /> Add member
        </Button>
      </Grid>
      <Grid size={12}>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Role
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ color: "text.secondary" }}>
                    {user._id}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "text.secondary" }}>
                    {user.fullName}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>

                  <TableCell align="center">
                    <Select
                      size="small"
                      value={editedRoles[user._id] || user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      sx={{
                        borderColor:
                          user.role === "admin"
                            ? "success"
                            : user.role === "user"
                              ? "secondary"
                              : "grey.400",
                        color:
                          user.role === "admin"
                            ? "success.main"
                            : user.role === "user"
                              ? "secondary.main"
                              : "grey.400",
                        borderRadius: 2,
                        px: 1,
                        width: "1005",
                      }}
                    >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdateUser(user._id)}
                    >
                      <RefreshCw />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog open={openDelete} onClose={closeDeleteModal}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "error.main",
          }}
        >
          Delete User <TriangleAlert />
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDeleteModal}>Cancel</Button>

          <Button color="error" variant="contained" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default AllUsers;
