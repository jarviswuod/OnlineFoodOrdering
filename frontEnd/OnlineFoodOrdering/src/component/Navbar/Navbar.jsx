import { Avatar, Badge, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { pink } from "@mui/material/colors";
import { ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="px-5 static top-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li className="logo font-semibold text-gray-300 text-2xl">Zosh Food</li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div>
          <Avatar sx={{ bgcolor: "white", color: pink.A400 }}>C</Avatar>
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
