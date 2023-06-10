import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Logout,
  Settings,
  PersonAdd,
  Phone,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Loginusers } from "../../feature/Slice/LoginSlice";
// import { Loginusers } from "../../feature/slice/userSlice";

export const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState();
  const navigate = useNavigate
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = getAuth();
  const dispatch = useDispatch()
  const handleLogout =()=>{
    signOut(auth).then(()=>{
      localStorage.removeItem("users")
      dispatch(Loginusers(null))
      navigate ("/login")
    })
  }

  return (
    <div className="topbarContainer">
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={2}>
          <NavLink className="sideline" to="/">
            <MenuItem className="sidebarListItem">
              <span className="logo">FWeX</span>
            </MenuItem>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <div className="topbarLinks">
            <NavLink className="menutop" to="/" onClick={handleClose}>
              <MenuItem>Home</MenuItem>
            </NavLink>
            <NavLink className="menutop" to="/about" onClick={handleClose}>
              <MenuItem>about</MenuItem>
            </NavLink>
           
          </div>
        </Grid>
        {/* <Grid item xs={3}>
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="Search for Passport details"
            />
          </div>
        </Grid> */}
        <Grid item xs={2}>
          <div className="topbarIcons">
            {/* <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div> */}
            <div onClick={handleClick}>
              
              <MenuItem className="loginitem">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Account
              </MenuItem>
            </div>

            <div className="profileSetting">
              
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                className="rana"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                
                <NavLink className="menutop" to="/deshbord" onClick={handleClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Agent login
                  </MenuItem>
                </NavLink>
                <NavLink className="menutop" to="/deshbord" onClick={handleClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Employer login
                  </MenuItem>
                </NavLink>
                <NavLink className="menutop" to="/deshbord" onClick={handleClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Employee
                  </MenuItem>
                </NavLink>
                
              </Menu>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopBar;
