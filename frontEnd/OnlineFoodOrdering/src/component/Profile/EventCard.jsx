import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://cdn.pixabay.com/photo/2022/05/22/13/21/healthy-7213383_1280.jpg"
        />
        <CardContent>
          <Typography variant="h5">IndianFast Food</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Mumbai"}</p>
            <p className="text-sm text-blue-500">February 14, 2024 12:00 AM</p>
            <p className="text-sm text-red-500">February 15, 2024 12:00 AM</p>
          </div>
        </CardContent>

        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
