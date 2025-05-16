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
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const buttonStyles = {
    borderColor: "#ffffff",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#143D60",
      borderColor: "#ffffff",
    },
    marginLeft: "8px"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin"); // Redirect to signin page after logout
  };

  const navigateUserProfile = () => {
    navigate("/user-profile");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0F2B42",
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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {token && userId ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                  sx={buttonStyles}
                  onClick={navigateUserProfile}
                />
                <Button
                  variant="outlined"
                  startIcon={<NotificationsActiveIcon />}
                  sx={buttonStyles}
                />
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  sx={buttonStyles}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={buttonStyles}
                  onClick={navigateToSignIn}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  sx={buttonStyles}
                  onClick={navigateToSignUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}