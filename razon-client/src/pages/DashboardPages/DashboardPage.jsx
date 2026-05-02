import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

const summaryCards = [
  { label: 'Total Members', value: '128' },
  { label: 'Active Plans', value: '94' },
  { label: 'Workouts Today', value: '36' },
  { label: 'Avg. Progress', value: '78%' },
];

const DashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f5', color: '#18181b' }}>
      <Typography variant="h4" fontWeight={900} gutterBottom>
        Dashboard
      </Typography>

      <Typography sx={{ mb: 3, color: '#52525b' }}>
        Overview of VibeFitness members, workout activity, and progress.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 3 }}>
        {summaryCards.map((card) => (
          <Card
            key={card.label}
            sx={{
              flex: 1,
              border: '2px solid #18181b',
              borderRadius: 4,
              bgcolor: '#ffffff',
              boxShadow: 'none',
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#71717a',
                }}
              >
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        <Card sx={{ flex: 2, border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Weekly Workout Activity
            </Typography>

            <BarChart
              height={320}
              xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], scaleType: 'band' }]}
              series={[
                { data: [35, 44, 24, 34, 48], label: 'Check-ins', color: '#18181b' },
                { data: [51, 36, 49, 30, 55], label: 'Completed', color: '#7c3aed' },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, border: '2px solid #18181b', borderRadius: 4, boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Goal Distribution
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: 'Strength', color: '#a7a7ff' },
                    { id: 1, value: 35, label: 'Cardio', color: '#7c3aed' },
                    { id: 2, value: 25, label: 'Mobility', color: '#a1a1aa' },
                  ],
                  arcLabel: (item) => `${item.value}`,
                },
              ]}
              width={320}
              height={260}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
              <Gauge width={110} height={110} value={78} />
              <Box>
                <Typography fontWeight={800}>Progress Score</Typography>
                <Typography sx={{ color: '#52525b', fontSize: 14 }}>
                  Average member completion rate based on weekly activity.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default DashboardPage;