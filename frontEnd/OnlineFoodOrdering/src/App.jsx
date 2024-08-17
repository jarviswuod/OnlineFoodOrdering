import "./App.css";
import Navbar from "./component/Navbar/Navbar";
// import { CssBaseline, ThemeProvider } from "@mui/material/styles";

// import { darkTheme } from "./Theme/DarkTheme";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#5a20cb",
    },
    primary_black: {
      main: "#5a20cb",
    },
    black: {
      main: "#242b2e",
    },
    background: {
      main: "#000000",
      default: "#0d0d0d",
      paper: "#0d0d0d",
    },
    textColor: {
      main: "#111111",
    },
  },
});

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
