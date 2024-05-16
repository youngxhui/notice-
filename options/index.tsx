import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BaseSettingComponent from "~components/base";
import AboutComponent from "~components/about/about";
import "./style.css";

function OptionsPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="基本设置" value="1" />
            {/* <Tab label="高级设置" value="2" /> */}
            <Tab label="关于" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BaseSettingComponent></BaseSettingComponent>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">
          <AboutComponent />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default OptionsPage;
