import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const navigateUserProfile = () => {
    navigate("/user-profile");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const buttonStyles = {
    borderColor: "#143D60",
    color: "#143D60",
    "&:hover": {
      backgroundColor: "#0F2B42",
      color: "#0F2B42",
      borderColor: "#143D60",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0F2B42",
          color: "#143D60",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
            }}
            onClick={navigateToHome}
          >
            BOOKnGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 1 }}>
            {/* <Button
              variant="outlined"
              startIcon={<AccountCircleIcon />}
              sx={buttonStyles}
              onClick={navigateUserProfile}
            ></Button>
            <Button
              variant="outlined"
              startIcon={<NotificationsActiveIcon />}
              sx={buttonStyles}
            ></Button> */}

            <Button
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={buttonStyles}
            >
              <Link to="/signin">Sign In</Link>
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              sx={buttonStyles}
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
