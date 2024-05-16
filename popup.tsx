import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function IndexPopup() {
  const [btnText] = useState(chrome.i18n.getMessage("settings"));

  const handleButtonClick = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  };

  return (
    <Container fixed>
      <Typography>Notice!</Typography>
      <Button variant="contained" onClick={handleButtonClick} disableElevation>
        {" "}
        {btnText}
      </Button>
    </Container>
  );
}

export default IndexPopup;
