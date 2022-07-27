import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Icon } from "components/Icon";
import LogoMyPharma from "assets/images/LogoMyPharma.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            id="menu-button"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? "session-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Icon name="Menu" />
          </IconButton>
          <Menu
            id="session-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Link
            to={"/products"}
            style={{
              display: "flex",
              textDecoration: "none",
              alignItems: "center",
              color: "white",
            }}
          >
            <img
              src={LogoMyPharma}
              style={{
                width: "40px",
              }}
            />
            <Typography variant="h6" color="inherit" component="div">
              Products List
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
