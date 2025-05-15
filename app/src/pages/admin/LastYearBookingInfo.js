import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import "../../styles/admin/LastYearBookingInfo.css";

export default function PageViewsBarChart() {
    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    return (
        <div className='last-year-booking-containere'>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Last year booking information
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>

                    </Stack>
                    <BarChart
                        borderRadius={8}
                        colors={colorPalette}
                        xAxis={[
                            {
                                scaleType: 'band',
                                categoryGapRatio: 0.5,
                                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            },
                        ]}
                        series={[
                            {
                                id: 'page-views',
                                label: 'Total booking',
                                data: [2234, 3872, 2998, 4125, 3357, 2789, 2998, 3567, 4123, 3890, 3102, 2784],
                                stack: 'A',
                            },
                            {
                                id: 'downloads',
                                label: 'Cancel booking',
                                data: [3098, 4215, 2384, 2101, 4752, 3593, 2384, 3201, 4102, 3758, 2900, 2567],
                                stack: 'A',
                            },
                            {
                                id: 'conversions',
                                label: 'New Users',
                                data: [4051, 2275, 3129, 4693, 3904, 2038, 2275, 3452, 3981, 4320, 3567, 3120],
                                stack: 'A',
                            },
                        ]}
                        height={250}
                        margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                        grid={{ horizontal: true }}
                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}