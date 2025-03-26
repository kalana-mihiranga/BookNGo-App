import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

export default function Footer() {
  const PRIMARY_COLOR = '#f0f0f0';
  const TEXT_COLOR = '#333';
  const ICON_COLOR = '#555'

  const linkStyles = {
    color: TEXT_COLOR,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  };

  return (
    <Box component="footer" sx={{ backgroundColor: PRIMARY_COLOR, py: 4 }}>
      <Grid container justifyContent="space-around" alignItems="flex-start" sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: TEXT_COLOR }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: TEXT_COLOR }}>
            <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1, color: ICON_COLOR }} /> 123 Main Street, City, Country
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: TEXT_COLOR }}>
            <EmailIcon sx={{ verticalAlign: 'middle', mr: 1, color: ICON_COLOR }} /> info@example.com
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: TEXT_COLOR }}>
            <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1, color: ICON_COLOR }} /> +1 123 456 7890
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: TEXT_COLOR }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" sx={linkStyles}>
              <FacebookIcon sx={{color:ICON_COLOR}}/>
            </Link>
            <Link href="#" sx={linkStyles}>
              <TwitterIcon sx={{color:ICON_COLOR}}/>
            </Link>
            <Link href="#" sx={linkStyles}>
              <InstagramIcon sx={{color:ICON_COLOR}}/>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: TEXT_COLOR }}>
            © {new Date().getFullYear()} BookNGO. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}