import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'plan', headerName: 'Plan', width: 150 },
  { field: 'goal', headerName: 'Fitness Goal', width: 190 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: params.value === 'Active' ? '#f5f3ff' : '#e4e4e7',
          color: params.value === 'Active' ? '#7c3aed' : '#52525b',
          border: params.value === 'Active' ? '1px solid #7c3aed' : '1px solid #a1a1aa',
          fontWeight: 800,
        }}
      />
    ),
  },
];

const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', plan: 'Basic', goal: 'Strength Training', status: 'Active' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', plan: 'Premium', goal: 'Weight Loss', status: 'Active' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', plan: 'Premium', goal: 'Muscle Gain', status: 'Inactive' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', plan: 'Student', goal: 'Cardio Fitness', status: 'Active' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', plan: 'Premium', goal: 'Endurance', status: 'Active' },
  { id: 6, firstName: 'Ferrara', lastName: 'Clifford', plan: 'Basic', goal: 'Mobility', status: 'Inactive' },
];

const UsersPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f5', color: '#18181b' }}>
      <Typography variant="h4" fontWeight={900} gutterBottom>
        Users
      </Typography>

      <Typography sx={{ mb: 3, color: '#52525b' }}>
        User list and member details for VibeFitness.
      </Typography>

      <Card sx={{ border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            Member Details
          </Typography>

          <Box sx={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;