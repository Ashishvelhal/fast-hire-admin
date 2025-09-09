import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
} from '@mui/material';
import { 
  Search, 
  Add, 
  MoreVert, 
  Edit, 
  Delete, 
  Block, 
  CheckCircle,
  PersonAdd
} from '@mui/icons-material';
import { getAllSuperAdmins, createSuperAdmin, updateSuperAdmin, deleteSuperAdmin } from '../../services/superAdminService';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAllSuperAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuClick = (event, admin) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdmin(admin);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAdmin(null);
  };

  const handleOpenDialog = (type, admin = null) => {
    setDialogType(type);
    if (type === 'edit' && admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
      setSelectedAdmin(admin);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'admin',
      });
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAdmin(null);
    setFormData({
      name: '',
      email: '',
      role: 'admin',
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      if (dialogType === 'add') {
        await createSuperAdmin(formData);
      } else if (dialogType === 'edit' && selectedAdmin) {
        await updateSuperAdmin(selectedAdmin.id, formData);
      }
      fetchAdmins();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving admin:', error);
      // Handle specific errors if needed
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save admin. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedAdmin.name}?`)) {
      try {
        setLoading(true);
        await deleteSuperAdmin(selectedAdmin.id);
        fetchAdmins();
        handleMenuClose();
      } catch (error) {
        console.error('Error deleting admin:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredAdmins = admins.filter(admin => 
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdmins = filteredAdmins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Administrators</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PersonAdd />}
          onClick={() => handleOpenDialog('add')}
        >
          Add Admin
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search admins..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin) => (
                  <TableRow key={admin.id} hover>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={admin.role} 
                        size="small" 
                        color={admin.role === 'superAdmin' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={admin.status || 'active'} 
                        size="small" 
                        color={admin.status === 'active' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, admin)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No administrators found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAdmins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          handleOpenDialog('edit', selectedAdmin);
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose();
          handleDelete();
        }}>
          <Delete fontSize="small" sx={{ mr: 1 }} color="error" />
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Administrator' : 'Edit Administrator'}
        </DialogTitle>
        <DialogContent>
          {errors.form && (
            <Box color="error.main" mb={2}>
              {errors.form}
            </Box>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={dialogType === 'edit'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            error={!!errors.role}
            helperText={errors.role}
            SelectProps={{
              native: true,
            }}
          >
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
          </TextField>
          {dialogType === 'add' && (
            <Typography variant="caption" color="textSecondary">
              A welcome email with setup instructions will be sent to the email address provided.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admins;
