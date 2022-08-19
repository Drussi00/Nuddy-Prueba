import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import classes from "../utils/classes";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      Gap={10}
    >
      <ToggleButton onChange={handleChange} sx={classes.but} value="S">
        S
      </ToggleButton>
      <ToggleButton onChange={handleChange} sx={classes.but} value="M">
        M
      </ToggleButton>
      <ToggleButton onChange={handleChange} sx={classes.but} value="L">
        L
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
