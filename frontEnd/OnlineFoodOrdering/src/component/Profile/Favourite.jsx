import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favourite = ({ item }) => {
  const { auth } = useSelector((store) => store);
  console.log(auth);
  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favourites</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {auth.favorites?.map((item, key) => (
          <RestaurantCard item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
