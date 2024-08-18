import "./App.css";
import Navbar from "./component/Navbar/Navbar";

import { darkTheme } from "./Theme/DarkTheme";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { ThemeProvider } from "@emotion/react";

import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        {/* <Cart /> */}
        <Profile />
      </ThemeProvider>
    </div>
  );
}

export default App;
