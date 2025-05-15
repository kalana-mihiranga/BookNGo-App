export const logout = (navigate, enqueueSnackbar = null) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");

  if (enqueueSnackbar) {
    enqueueSnackbar("You have been logged out.", { variant: "info" });
  }

  navigate("/signin");
};

//how to use logout
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
// import { logout } from "../utils/logout";

// const ExampleComponent = () => {
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleLogout = () => {
//     logout(navigate, enqueueSnackbar);
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };
