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
  ViewList,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
// import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
// import { useDispatch } from "react-redux";
import { Loginusers } from "../../feature/Slice/LoginSlice";
// import { Loginusers } from "../../feature/slice/userSlice";
// add topbar 2 theke add kora
import React, { useEffect, useState } from "react";
import "./topbar.css";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
// import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
// import { Loginusers } from "../../feature/Slice/LoginSlice";
// import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../Modal";
import Modal from "../Modal";
import Modals from "../Modal";
// import { ListItemIcon, MenuItem } from "@mui/material";
// import { Logout } from "@mui/icons-material";

export const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState();
  const navigate = useNavigate;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = getAuth();
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("users");
      dispatch(Loginusers(null));
      navigate("/");
    });
  };

  // topbar 2 theke use

  // const auth = getAuth();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const user = useSelector((users) => users.login.loggedIn);
  // const handleLogout = () => {
  //   signOut(auth).then(() => {
  //     localStorage.removeItem("users");
  //     localStorage.removeItem("role");
  //     dispatch(Loginusers(null));
  //     navigate("/login");
  //   });
  // };

  //   const { currentUser } = useContext(AuthContext);
  // const [username, setUsername] = useState("");
  //   const navigate = useNavigate();



  // const clickSignup = () => {
  //   navigate("/signup");
  // };

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

            {user ? (
              <div onClick={handleClick}>
              <MenuItem className="loginitem">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Account
              </MenuItem>
            </div>
            ) : (
              <button className="signin">
                <Link to="/login">Login</Link>
              </button>
            )}

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
                <div className="LoginSection">
                  <div className="username">
                    {user && <p>Welcome, {user.displayName}</p>}
                  </div>
                  <div className="buttons">
                    <div onClick={handleClick}>
                      {user ? (
                        <NavLink
                          className="menutop"
                          to="/deshbord"
                          onClick={handleClose}>
                          <MenuItem>
                            <ViewList>
                              <Settings fontSize="small" />
                            </ViewList>
                            Deshbord
                          </MenuItem>
                        </NavLink>
                      ) : (
                        <button className="signin">
                          <Link to="/login"></Link>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                
                  {/* <div className="logout" onClick={handleLogout}>
                    <BiLogOut />
                  </div> */}
                
              </Menu>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopBar;
