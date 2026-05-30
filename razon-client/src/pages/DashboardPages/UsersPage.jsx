import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/UserService";
import DeleteIcon from "@mui/icons-material/Delete";

const emptyUser = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "viewer",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#d4d4d8",
    },
    "&:hover fieldset": {
      borderColor: "#18181b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7c3aed",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#7c3aed",
  },
};

const UsersPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const userType = localStorage.getItem("type");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState(emptyUser);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users || data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setNewUser(emptyUser);
    setFormErrors({});
    setErrorMessage("");
    setSuccessMessage("");
    setShowPassword(false);
  };

  const handleOpen = () => {
    setIsEditing(false);
    setEditUserId(null);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    resetForm();
  };

  const handleChange = (name, value) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({
        firstName: userToEdit.firstName || "",
        lastName: userToEdit.lastName || "",
        age: userToEdit.age || "",
        gender: userToEdit.gender || "",
        contactNumber: userToEdit.contactNumber || "",
        email: userToEdit.email || "",
        type: userToEdit.type || "viewer",
        username: userToEdit.username || "",
        password: "",
        address: userToEdit.address || "",
        isActive: userToEdit.isActive ?? true,
      });
      setEditUserId(id);
      setIsEditing(true);
      setFormErrors({});
      setErrorMessage("");
      setShowPassword(false);
      setOpen(true);
    }
  };

  const validateUser = () => {
    const errors = {};
    const firstName = newUser.firstName.trim();
    const lastName = newUser.lastName.trim();
    const age = String(newUser.age).trim();
    const gender = newUser.gender.trim();
    const contactNumber = newUser.contactNumber.trim();
    const email = newUser.email.trim().toLowerCase();
    const type = newUser.type.trim();
    const username = newUser.username.trim().toLowerCase();
    const password = newUser.password;

    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!age) errors.age = "Age is required.";
    if (!gender) errors.gender = "Gender is required.";
    if (!contactNumber) errors.contactNumber = "Contact number is required.";
    if (!email) errors.email = "Email address is required.";
    if (!type) errors.type = "User type is required.";
    if (!username) errors.username = "Username is required.";
    if (!isEditing && !password) {
      errors.password = "Password is required.";
    }

    if (age && (Number(age) <= 0 || Number.isNaN(Number(age)))) {
      errors.age = "Age must be a valid positive number.";
    }

    if (contactNumber && !/^\d{11}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (username && /\s/.test(username)) {
      errors.username = "Username must not contain spaces.";
    }

    if (password && password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    const emailExists = users.some(
      (user) =>
        user._id !== editUserId &&
        String(user.email || "")
          .trim()
          .toLowerCase() === email,
    );
    if (emailExists) {
      errors.email = "Email address already exists.";
    }

    const usernameExists = users.some(
      (user) =>
        user._id !== editUserId &&
        String(user.username || "")
          .trim()
          .toLowerCase() === username,
    );
    if (usernameExists) {
      errors.username = "Username already exists.";
    }

    return errors;
  };

  const handleSaveUser = async () => {
    try {
      setErrorMessage("");
      const errors = validateUser();

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setErrorMessage("Please fix the highlighted fields before saving.");
        return;
      }

      const userData = {
        ...newUser,
        firstName: newUser.firstName.trim(),
        lastName: newUser.lastName.trim(),
        age: Number(newUser.age),
        gender: newUser.gender,
        contactNumber: newUser.contactNumber.trim(),
        email: newUser.email.trim().toLowerCase(),
        type: newUser.type,
        username: newUser.username.trim().toLowerCase(),
        address: newUser.address.trim(),
      };

      if (isEditing && !userData.password) {
        delete userData.password;
      }

      if (isEditing) {
        await updateUser(editUserId, userData);
        setSuccessMessage("User updated successfully!");
      } else {
        await createUser(userData);
        setSuccessMessage("Account created successfully!");
      }

      await loadUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
      setErrorMessage(error.response?.data?.message || "Failed to save user.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setSuccessMessage("User deleted successfully!");
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete user.",
      );
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      await loadUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
      setErrorMessage("Failed to update user status.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search) ||
      (user.email || "").toLowerCase().includes(search) ||
      (user.username || "").toLowerCase().includes(search) ||
      (user.contactNumber || "").toLowerCase().includes(search) ||
      (user.address || "").toLowerCase().includes(search);

    const matchesType = typeFilter === "all" || user.type === typeFilter;
    const matchesGender =
      genderFilter === "all" || user.gender === genderFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesType && matchesGender && matchesStatus;
  });

  const textFieldProps = (name) => ({
    error: Boolean(formErrors[name]),
    helperText: formErrors[name] || "",
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const firstName = params.row.firstName || "";
        const lastName = params.row.lastName || "";
        return (
          <Typography
            sx={{
              fontWeight: 500,
              color: "#18181b",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
        );
      },
    },
    { field: "age", headerName: "Age", flex: 0.5, minWidth: 70 },
    { field: "gender", headerName: "Gender", flex: 0.8, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 180 },
    {
      field: "type",
      headerName: "Type",
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Chip
          label={params.row.type || "viewer"}
          size="small"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1.5px solid #18181b",
            color: params.row.type === "admin" ? "#7c3aed" : "#18181b",
            backgroundColor:
              params.row.type === "admin" ? "#f5f3ff" : "#fafafa",
          }}
        />
      ),
    },
    { field: "contactNumber", headerName: "Contact", flex: 1, minWidth: 130 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 130 },
    { field: "address", headerName: "Address", flex: 1.2, minWidth: 170 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1.5px solid #18181b",
            color: params.row.isActive ? "#166534" : "#991b1b",
            backgroundColor: params.row.isActive ? "#dcfce7" : "#fee2e2",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      minWidth: 230,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-start"
          sx={{ pt: 1.5 }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{
              borderRadius: "999px",
              backgroundColor: "#18181b",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              px: 2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3f3f46",
                boxShadow: "none",
              },
            }}
          >
            Edit
          </Button>

          <Button
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser(params.row._id)}
            sx={{
              borderRadius: "999px",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Delete
          </Button>

          <Switch
            checked={params.row.isActive ?? false}
            onChange={() =>
              handleToggleActive(params.row._id, params.row.isActive ?? false)
            }
            color="secondary"
            size="small"
          />
        </Stack>
      ),
    },
  ];

  if (userType === "editor") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f4f5",
        color: "#18181b",
        width: "100%",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{
          mb: 3,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" fontWeight={900} gutterBottom>
            Users
          </Typography>

          <Typography
            sx={{
              color: "#52525b",
              whiteSpace: "nowrap",
            }}
          >
            Manage user accounts, roles, and account status for VibeFitness.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={handleOpen}
            sx={{
              border: "2px solid #18181b",
              borderRadius: "999px",
              bgcolor: "#7c3aed",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 900,
              px: 2.5,
              minWidth: 135,
              height: 44,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              boxShadow: "none",
              flexShrink: 0,
              "&:hover": {
                bgcolor: "#18181b",
                color: "#ffffff",
                border: "2px solid #18181b",
                boxShadow: "none",
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </Stack>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: "18px" }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "18px" }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ mb: 2, width: "100%", minWidth: 0 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          sx={{ width: "100%", minWidth: 0 }}
        >
          <TextField
            fullWidth
            label="Search users"
            placeholder="Search name, email, username, contact, or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={fieldStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7c3aed" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            fullWidth
            label="Filter by Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={fieldStyle}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Filter by Gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            sx={fieldStyle}
          >
            <MenuItem value="all">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={fieldStyle}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>

        <Typography
          sx={{
            mt: 2,
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#71717a",
          }}
        >
          Showing {filteredUsers.length} of {users.length} users
        </Typography>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : "28px",
            border: fullScreen ? "none" : "2px solid #18181b",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            fontSize: "28px",
            borderBottom: "2px solid #18181b",
          }}
        >
          {isEditing ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: "#fafafa" }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                value={newUser.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                sx={fieldStyle}
                {...textFieldProps("firstName")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Last Name"
                value={newUser.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                sx={fieldStyle}
                {...textFieldProps("lastName")}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newUser.age}
                onChange={(e) => handleChange("age", e.target.value)}
                sx={fieldStyle}
                {...textFieldProps("age")}
              />

              <TextField
                select
                fullWidth
                label="Gender"
                value={newUser.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                sx={fieldStyle}
                {...textFieldProps("gender")}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </TextField>
            </Stack>

            <TextField
              fullWidth
              label="Contact Number"
              value={newUser.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              sx={fieldStyle}
              {...textFieldProps("contactNumber")}
            />

            <TextField
              fullWidth
              label="Address"
              value={newUser.address}
              onChange={(e) => handleChange("address", e.target.value)}
              sx={fieldStyle}
              {...textFieldProps("address")}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={newUser.email}
              onChange={(e) => handleChange("email", e.target.value)}
              sx={fieldStyle}
              {...textFieldProps("email")}
            />

            <TextField
              select
              fullWidth
              label="Type"
              value={newUser.type}
              onChange={(e) => handleChange("type", e.target.value)}
              sx={fieldStyle}
              {...textFieldProps("type")}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Username"
              value={newUser.username}
              onChange={(e) => handleChange("username", e.target.value)}
              sx={fieldStyle}
              {...textFieldProps("username")}
            />

            <TextField
              fullWidth
              label={isEditing ? "New Password Optional" : "Password"}
              type={showPassword ? "text" : "password"}
              value={newUser.password}
              onChange={(e) => handleChange("password", e.target.value)}
              helperText={
                formErrors.password ||
                (isEditing
                  ? "Leave blank if you do not want to change the password."
                  : "Password must be at least 8 characters.")
              }
              error={Boolean(formErrors.password)}
              sx={fieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "2px solid #18181b",
                borderRadius: "18px",
                backgroundColor: "#fff",
                px: 2,
                py: 1,
              }}
            >
              <Typography sx={{ fontWeight: 800 }}>
                {newUser.isActive ? "Active Account" : "Inactive Account"}
              </Typography>

              <Switch
                checked={newUser.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                color="secondary"
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderRadius: "999px",
              border: "2px solid #18181b",
              color: "#18181b",
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            sx={{
              borderRadius: "999px",
              backgroundColor: "#18181b",
              color: "#fff",
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#7c3aed",
                boxShadow: "none",
              },
            }}
          >
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          minWidth: 0,
          backgroundColor: "#fff",
          borderRadius: "18px",
          mb: 5,
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            width: "100%",
            minWidth: 0,
            border: "none",
            backgroundColor: "#fff",
            "& .MuiDataGrid-main": { borderRadius: "18px" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fff",
              borderBottom: "2px solid #18181b",
            },
            "& .MuiDataGrid-columnHeader": { outline: "none !important" },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#18181b",
            },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e4e4e7",
              outline: "none !important",
            },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#f5f3ff" },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e4e4e7",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UsersPage;
