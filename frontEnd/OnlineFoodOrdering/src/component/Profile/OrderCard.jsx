import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707904777/ufillbuz6lzjilw0rrc3.jpg"
          alt=""
        />
        <div>
          <p>Biryani</p>
          <p>$399</p>
        </div>
        <div>
          <Button className="cursor-not-allowed">Completed</Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
