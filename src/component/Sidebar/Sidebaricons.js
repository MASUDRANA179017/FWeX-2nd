import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Accessibility, PersonAdd,  } from "@mui/icons-material";

const Sidebaricons = () => {
  const role = localStorage.getItem("role");
  return (
    <div className="sidebar_icons">
      

      <div className="login__btn">
        
        {role === "admin" ? (
          <div className="icon">
            <NavLink className="profile_icons" to="/deshbord">
              <AiOutlineHome />
            </NavLink>
            <NavLink className="profile_icons" to="/employee">
              <PersonAdd />
            </NavLink>
            <NavLink className="profile_icons" to="/access">
              <Accessibility />
            </NavLink>
          </div>
        ) : (
          <NavLink className="profile_icons" to="/employedeshbord">
            <AiOutlineHome />
          </NavLink>
        )}
      </div>

      <div className="login__btn">
        {role == "employer" ? (
          <NavLink className="profile_icons" to="/employee">
          <PersonAdd />
        </NavLink>
        ) : (
          <></>
        )}
      </div>


      
    </div>
  );
};

export default Sidebaricons;
