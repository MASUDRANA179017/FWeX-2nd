import React, { useState } from "react";
import "./style.css";
import Sidebaricons from "./Sidebaricons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Loginusers } from "../../feature/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import Modals from "../Modal";


const Sidebar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const user = useSelector((users) => users.login.loggedIn);
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("users");
      dispatch(Loginusers(null));
      navigate("/login");
    });
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div className="profile_details">
            <div className="profile_picture" onClick={handleOpen}>
              <picture>
                <img src={user.photoURL} alt="profilepic" />
              </picture>
              <div className="profile_opverlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <h4>{user.displayName}</h4>
          </div>
          <div className="profiles_icons">
            <Sidebaricons />
          </div>
          <div className="logout" onClick={handleLogout}>
            <BiLogOut />
          </div>
        </div>
      </div>
      <Modals open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;