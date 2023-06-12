import React, { useEffect, useState } from "react";
import "./topbar.css";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Loginusers } from "../../feature/Slice/LoginSlice";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../Modal";
import Modal from "../Modal";
import Modals from "../Modal";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";

function TopBar2() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const user = useSelector((users) => users.login.loggedIn);
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("users");
      localStorage.removeItem("role");
      dispatch(Loginusers(null));
      navigate("/login");
    });
  };

 

  //   const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  //   const navigate = useNavigate();

  const clickLogin = () => {
    if (user) {
      signOut(auth);
    } else {
      const handleLogout = () => {
        signOut(auth).then(() => {
          localStorage.removeItem("users");
          localStorage.removeItem("role");
          dispatch(Loginusers(null));
          navigate("/login");
        });
      };
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      <h1>Home</h1>
      {user && <p>Welcome, {user.displayName}</p>}
      <div className="buttons">
        <button onClick={clickLogin}>
          {user ? (
            <div className="logout" onClick={handleLogout}>
              <BiLogOut />
            </div>
          ) : (
            
            <button className="signin__text">
            <Link to="/login">Login</Link>
          </button>
            
          )}
        </button>
        {!user && <button onClick={clickSignup}>Sign Up</button>}
      </div>
    </div>
  );
}

export default TopBar2;
