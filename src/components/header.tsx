import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Icon } from "components/Icon";
import LogoMyPharma from "assets/images/LogoMyPharma.png";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon name="Menu" />
          </IconButton>
          <img
            src={LogoMyPharma}
            style={{
              width: "40px",
            }}
          />
          <Typography variant="h6" color="inherit" component="div">
            Products List
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
