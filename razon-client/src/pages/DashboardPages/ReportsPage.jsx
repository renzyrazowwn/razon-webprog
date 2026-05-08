import { useRef } from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>VibeFitness Reports</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #f4f4f5;
              color: #18181b;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 2px solid #18181b;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -0.04em;
            }

            .report-header span {
              color: #7c3aed;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #52525b;
              line-height: 1.5;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 2px solid #18181b !important;
              border-radius: 16px !important;
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 18px;
              background: #ffffff !important;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Vibe<span>Fitness</span> Reports</h1>
              <p>Charts and data visualization for VibeFitness performance reports.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>

            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f5', color: '#18181b' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3, width: '100%' }}
      >
        <Box>
          <Typography variant="h4" fontWeight={900} gutterBottom>
            Reports
          </Typography>

          <Typography sx={{ color: '#52525b',  whiteSpace: 'nowrap', }}>
            Charts and data visualization for VibeFitness performance reports.
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={handlePrint}
            sx={{
              border: '2px solid #18181b',
              borderRadius: '999px',
              bgcolor: '#7c3aed',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 900,
              px: 2,
              py: 0.3,
              minWidth: 90,
              height: 50,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              '&:hover': {
                bgcolor: '#18181b',
                color: '#ffffff',
                border: '2px solid #18181b',
              },
            }}
          >
            Export Summary
          </Button>
        </Box>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
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
      </Stack>
    </Box>
  );
};

export default ReportsPage;