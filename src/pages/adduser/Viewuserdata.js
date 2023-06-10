import React from "react";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

const Viewuserdata = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </div>
      </Box>
      <div value="1">Item One</div>
      <div value="2">Item Two</div>
      <div value="3">Item Three</div>
    </div>
  );
};

export default Viewuserdata;
