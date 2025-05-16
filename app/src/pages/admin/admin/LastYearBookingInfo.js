// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Chip from '@mui/material/Chip';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { useTheme } from '@mui/material/styles';
// import "../../styles/admin/LastYearBookingInfo.css";

// export default function PageViewsBarChart() {
//     const theme = useTheme();
//     const colorPalette = [
//         (theme.vars || theme).palette.primary.dark,
//         (theme.vars || theme).palette.primary.main,
//         (theme.vars || theme).palette.primary.light,
//     ];

//     return (
//         <div className='last-year-booking-containere'>
//             <Card variant="outlined" sx={{ width: '100%' }}>
//                 <CardContent>
//                     <Typography component="h2" variant="subtitle2" gutterBottom>
//                         Last year booking information
//                     </Typography>
//                     <Stack sx={{ justifyContent: 'space-between' }}>

//                     </Stack>
//                     <BarChart
//                         borderRadius={8}
//                         colors={colorPalette}
//                         xAxis={[
//                             {
//                                 scaleType: 'band',
//                                 categoryGapRatio: 0.5,
//                                 data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//                             },
//                         ]}
//                         series={[
//                             {
//                                 id: 'page-views',
//                                 label: 'Total booking (Last year)',
//                                 data: [2234, 3872, 2998, 4125, 3357, 2789, 2998, 3567, 4123, 3890, 3102, 2784],
//                                 stack: 'A',
//                             },
//                             {
//                                 id: 'downloads',
//                                 label: 'Total booking (This year)',
//                                 data: [3098, 4215, 2384, 2101, 4752, 3593, 2384, 3201, 4102, 3758, 2900, 2567],
//                                 stack: 'A',
//                             },
//                             {
//                                 id: 'conversions',
//                                 label: 'New tourist (This year)',
//                                 data: [4051, 2275, 3129, 4693, 3904, 2038, 2275, 3452, 3981, 4320, 3567, 3120],
//                                 stack: 'A',
//                             },
//                         ]}
//                         height={250}
//                         margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
//                         grid={{ horizontal: true }}
//                         slotProps={{
//                             legend: {
//                                 hidden: true,
//                             },
//                         }}
//                     />
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import "../../styles/admin/LastYearBookingInfo.css";

export default function PageViewsBarChart() {
    const theme = useTheme();
    const colorPalette = [
        theme.palette.primary.dark,
        theme.palette.primary.main,
        theme.palette.primary.light,
    ];

    const [lastYearBookings, setLastYearBookings] = useState([]);
    const [thisYearBookings, setThisYearBookings] = useState([]);
    const [newTouristsThisYear, setNewTouristsThisYear] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/booking-stats');
                const data = res.data.data;
                setLastYearBookings(data.lastYearBookings);
                setThisYearBookings(data.thisYearBookings);
                setNewTouristsThisYear(data.newTouristsThisYear);
            } catch (err) {
                console.error('Failed to fetch booking stats', err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className='last-year-booking-containere'>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        <h5 className="name-of-tile text-muted text-uppercase  fw-semibold mb-1 text-start ps-5">
                            Annual Booking and Tourist Trends
                        </h5>

                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}></Stack>
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
                                id: 'last-year-bookings',
                                label: 'Total booking (Last year)',
                                data: lastYearBookings,
                                stack: 'A',
                            },
                            {
                                id: 'this-year-bookings',
                                label: 'Total booking (This year)',
                                data: thisYearBookings,
                                stack: 'A',
                            },
                            {
                                id: 'new-tourists-this-year',
                                label: 'New tourist (This year)',
                                data: newTouristsThisYear,
                                stack: 'A',
                            },
                        ]}
                        height={250}
                        margin={{ left: 50, right: 0, top: 60, bottom: 20 }}
                        grid={{ horizontal: true }}
                        slotProps={{
                            legend: {
                                hidden: false,
                                labelStyle: {
                                    fontSize: 10,
                                },
                            },

                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}