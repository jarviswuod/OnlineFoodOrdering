import { Avatar, Badge, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { pink } from "@mui/material/colors";
import { Person, ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleAvaterClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin.restaurant");
    }
  };
  return (
    <div className="px-5 sticky top-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <p
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 text-2xl"
        >
          Zosh Food
        </p>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div>
          {auth.user ? (
            <Avatar
              onClick={handleAvaterClick}
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton>
            <Badge color="secondary" badgeContent={3}>
              <ShoppingCart sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
