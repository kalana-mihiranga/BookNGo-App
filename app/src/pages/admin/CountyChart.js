// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useDrawingArea } from '@mui/x-charts/hooks';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// // import { useEffect, useState } from "react";
// import axios from "axios";


// // import {
// //     IndiaFlag,
// //     UsaFlag,
// //     BrazilFlag,
// //     GlobeFlag,
// // } from './CountyIcon';


// const data = [
//     { label: 'India', value: 50000 },
//     { label: 'USA', value: 35000 },
//     { label: 'Brazil', value: 10000 },
//     { label: 'Other', value: 5000 },
// ];

// const countries = [
//     {
//         name: 'USA',
//         value: 50,
//         color: 'hsl(220, 25%, 45%)',
//     },
//     {
//         name: 'India',
//         value: 35,
//         color: 'hsl(220, 25%, 65%)',
//     },

//     {
//         name: 'Brazil',
//         value: 10,
//         color: 'hsl(220, 25%, 30%)',
//     },
//     {
//         name: 'Other',
//         value: 5,
//         color: 'hsl(220, 25%, 20%)',
//     },
// ];

// const StyledText = styled('text', {
//     shouldForwardProp: (prop) => prop !== 'variant',
// })(({ theme }) => ({
//     textAnchor: 'middle',
//     dominantBaseline: 'central',
//     fill: (theme.vars || theme).palette.text.secondary,
//     variants: [
//         {
//             props: {
//                 variant: 'primary',
//             },
//             style: {
//                 fontSize: theme.typography.h5.fontSize,
//             },
//         },
//         {
//             props: ({ variant }) => variant !== 'primary',
//             style: {
//                 fontSize: theme.typography.body2.fontSize,
//             },
//         },
//         {
//             props: {
//                 variant: 'primary',
//             },
//             style: {
//                 fontWeight: theme.typography.h5.fontWeight,
//             },
//         },
//         {
//             props: ({ variant }) => variant !== 'primary',
//             style: {
//                 fontWeight: theme.typography.body2.fontWeight,
//             },
//         },
//     ],
// }));

// function PieCenterLabel({ primaryText, secondaryText }) {
//     const { width, height, left, top } = useDrawingArea();
//     const primaryY = top + height / 2 - 10;
//     const secondaryY = primaryY + 24;
//     const [total, setTotal] = React.useState(0);
//     const [eventData, setEventData] = React.useState([]);
//     const [countries, setCountries] = React.useState([]);

//     // const [eventData, setEventData] = useState([]);
//     // const [total, setTotal] = useState(0);


//     React.useEffect(() => {
//         const fetchCountryStats = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/admin/event/country-count");
//                 const raw = res.data.data;

//                 const totalEvents = raw.reduce((sum, item) => sum + item.count, 0);
//                 setTotal(totalEvents);

//                 const dynamicData = raw.map((item, index) => ({
//                     name: item.country,
//                     value: Math.round((item.count / totalEvents) * 100),
//                     color: colors[index % colors.length],
//                 }));

//                 setCountries(dynamicData);
//                 setEventData(
//                     raw.map((item) => ({
//                         label: item.country,
//                         value: item.count,
//                     }))
//                 );
//             } catch (err) {
//                 console.error("Failed to fetch country event data", err);
//             }
//         };

//         fetchCountryStats();
//     }, []);

//     return (
//         <React.Fragment>
//             <StyledText variant="primary" x={left + width / 2} y={primaryY}>
//                 {primaryText}
//             </StyledText>
//             <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
//                 {secondaryText}
//             </StyledText>
//         </React.Fragment>
//     );
// }

// PieCenterLabel.propTypes = {
//     primaryText: PropTypes.string.isRequired,
//     secondaryText: PropTypes.string.isRequired,
// };

// const colors = [
//     'hsl(220, 20%, 65%)',
//     'hsl(220, 20%, 42%)',
//     'hsl(220, 20%, 35%)',
//     'hsl(220, 20%, 25%)',
// ];

// export default function CuntryChart() {
//         return (
//             <div className='county-chart'>
//                 <Card
//                     variant="outlined"
//                     sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
//                 >
//                     <CardContent>
//                         <Typography component="h2" variant="subtitle2">
//                             Event by country
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <PieChart
//                                 colors={colors}
//                                 margin={{
//                                     left: 80,
//                                     right: 80,
//                                     top: 80,
//                                     bottom: 80,
//                                 }}
//                                 series={[
//                                     {
//                                         data,
//                                         innerRadius: 75,
//                                         outerRadius: 100,
//                                         paddingAngle: 0,
//                                         highlightScope: { faded: 'global', highlighted: 'item' },
//                                     },
//                                 ]}
//                                 height={260}
//                                 width={260}
//                                 slotProps={{
//                                     legend: { hidden: true },
//                                 }}
//                             >
//                                 <PieCenterLabel primaryText="98.5K" secondaryText="Total" />
//                             </PieChart>
//                         </Box>
//                         {countries.map((country, index) => (
//                             <Stack
//                                 key={index}
//                                 direction="row"
//                                 sx={{ alignItems: 'center', gap: 2, pb: 2 }}
//                             >
//                                 {/* {country.flag} */}
//                                 <Stack sx={{ gap: 1, flexGrow: 1 }}>
//                                     <Stack
//                                         direction="row"
//                                         sx={{
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             gap: 2,
//                                         }}
//                                     >
//                                         <Typography variant="body2" sx={{ fontWeight: '500' }}>
//                                             {country.name}
//                                         </Typography>
//                                         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                                             {country.value}%
//                                         </Typography>
//                                     </Stack>
//                                     <LinearProgress
//                                         variant="determinate"
//                                         aria-label="Number of users by country"
//                                         value={country.value}
//                                         sx={{
//                                             [`& .${linearProgressClasses.bar}`]: {
//                                                 backgroundColor: country.color,
//                                             },
//                                         }}
//                                     />
//                                 </Stack>
//                             </Stack>
//                         ))}
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     }

import * as React from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const colors = [
    'hsl(220, 20%, 65%)',
    'hsl(220, 20%, 42%)',
    'hsl(220, 20%, 35%)',
    'hsl(220, 20%, 25%)',
];

const StyledText = styled('text')(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: theme.palette.text.secondary,
    fontWeight: 'bold',
}));

function PieCenterLabel({ primaryText, secondaryText }) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <>
            <StyledText x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </>
    );
}

export default function CuntryChart() {
    const [total, setTotal] = React.useState(0);
    const [eventData, setEventData] = React.useState([]);
    const [countries, setCountries] = React.useState([]);

    React.useEffect(() => {
        const fetchCountryStats = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/event/country-count");
                const raw = res.data.data;

                const totalEvents = raw.reduce((sum, item) => sum + item.count, 0);
                setTotal(totalEvents);

                const dynamicData = raw.map((item, index) => ({
                    name: item.country,
                    value: Math.round((item.count / totalEvents) * 100),
                    color: colors[index % colors.length],
                }));

                setCountries(dynamicData);

                setEventData(
                    raw.map((item) => ({
                        label: item.country,
                        value: item.count,
                    }))
                );
            } catch (err) {
                console.error("Failed to fetch country event data", err);
            }
        };

        fetchCountryStats();
    }, []);

    return (
        <div className='county-chart'>
            <Card
                variant="outlined"
                sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
            >
                <CardContent>
                    <Typography component="h2" variant="subtitle2">
                        <h5 className="name-of-tile text-muted text-uppercase large fw-semibold mb-1 text-center">
                            Event by country
                        </h5>

                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PieChart
                            colors={colors}
                            margin={{
                                left: 80,
                                right: 80,
                                top: 80,
                                bottom: 80,
                            }}
                            series={[
                                {
                                    data: eventData,
                                    innerRadius: 75,
                                    outerRadius: 100,
                                    paddingAngle: 0,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                },
                            ]}
                            height={260}
                            width={260}
                            slotProps={{
                                legend: { hidden: true },
                            }}
                        >
                            <PieCenterLabel primaryText={`${total}`} secondaryText="Total" />
                        </PieChart>
                    </Box>
                    {countries.map((country, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
                        >
                            <Stack sx={{ gap: 1, flexGrow: 1 }}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                        {country.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {country.value}%
                                    </Typography>
                                </Stack>
                                <LinearProgress
                                    variant="determinate"
                                    aria-label="Number of users by country"
                                    value={country.value}
                                    sx={{
                                        [`& .${linearProgressClasses.bar}`]: {
                                            backgroundColor: country.color,
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
