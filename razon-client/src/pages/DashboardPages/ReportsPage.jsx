import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f5', color: '#18181b' }}>
      <Typography variant="h4" fontWeight={900} gutterBottom>
        Reports
      </Typography>

      <Typography sx={{ mb: 3, color: '#52525b' }}>
        Charts and data visualization for VibeFitness performance reports.
      </Typography>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Weekly Check-ins
            </Typography>

            <BarChart
              height={300}
              xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], scaleType: 'band' }]}
              series={[
                { data: [12, 18, 15, 22, 30], label: 'Members', color: '#18181b' },
                { data: [8, 14, 11, 18, 25], label: 'Completed', color: '#7c3aed' },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Workout Categories
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 35, label: 'Strength', color: '#a7a7ff' },
                    { id: 1, value: 25, label: 'Cardio', color: '#7c3aed' },
                    { id: 2, value: 20, label: 'Mobility', color: '#a1a1aa' },
                  ],
                  arcLabel: (item) => `${item.value}`,
                },
              ]}
              width={350}
              height={300}
            />
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            Monthly Progress
          </Typography>

          <LineChart
            height={320}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6], label: 'Month' }]}
            series={[
              { data: [20, 35, 45, 50, 70, 90], label: 'Active Members', color: '#18181b' },
              { data: [10, 18, 30, 44, 58, 75], label: 'Goal Completion', color: '#7c3aed' },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;