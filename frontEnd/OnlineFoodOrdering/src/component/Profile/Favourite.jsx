import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";

const Favourite = () => {
  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favourites</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {[1, 2, 3, 4].map((item) => (
          <RestaurantCard />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
