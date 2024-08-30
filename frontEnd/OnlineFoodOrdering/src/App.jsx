import "./App.css";
import Navbar from "./component/Navbar/Navbar";

import { darkTheme } from "./Theme/DarkTheme";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { ThemeProvider } from "@emotion/react";

import { CssBaseline } from "@mui/material";
import CustomerRouter from "./Routers/CustomerRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Authentication/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CustomerRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
