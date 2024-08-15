import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import Checkbox from "@mui/material/Checkbox";

const demo = [
  { category: "Nuts & seeds", ingredients: ["Cashews"] },
  { category: "Protein", ingredients: ["Ground beef", "Bacon strips"] },
  { category: "Bread", ingredients: ["Hamburger buns"] },
  { category: "Vegetable", ingredients: ["Leffuce", "Tomato slices", "Onion"] },
  { category: "Condiment", ingredients: ["Ketchup"] },
];

const MenuCard = () => {
  const handleCheckBoxChange = (value) => console.log(value);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/no8xfzdhsrdy4ezmcczr.jpg"
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">Burger</p>
              <p>$4.99</p>
              <p className="text-gray-400">Nice Food</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form action="">
          <div className="flex gap-5 flex-wrap">
            {demo.map((item, key) => (
              <div key={key}>
                <p>{item.category}</p>
                <FormGroup>
                  {item.ingredients.map((item, key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox onChange={() => handleCheckBoxChange(item)} />
                      }
                      label={item}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={true} type="submit">
              {true ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
