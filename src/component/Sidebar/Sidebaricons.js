import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { IoMdNotificationsOutline, IoMdPersonAdd } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
// import { doc, getItem,Firestore } from "firebase/firestore";
import { doc, getDoc, Firestore } from "firebase/firestore";

const Sidebaricons = () => {

  const role = (localStorage.getItem('role'));
  console.log(role);
  const showicon = "admin";


  const [showResults, setShowResults] = useState(role)
  console.log(showResults);

  return (
    <div className="sidebar_icons">
      {/* <NavLink className="profile_icons" to="/deshbord" >
        <AiOutlineHome />
      </NavLink> */}

      <div className="login__btn">
        {showicon === role ? (
          <NavLink className="profile_icons" to="/deshbord" >
            <AiOutlineHome />
          </NavLink>
        ) : (
          <NavLink className="profile_icons" to="/" >
            <AiOutlineHome />
          </NavLink>
        )}
      </div>

    
      <div className="login__btn">
        {showicon === role ? (
          <NavLink className="profile_icons" to="/addlead">
          <IoMdPersonAdd />
        </NavLink>
        ) : (
          <div className="profile_icons">
        <BiMessageAlt />
      </div>
        )}
      </div>



      {/* <div className="profile_icons">
        <BiMessageAlt />
      </div>
      <div className="profile_icons">
        <IoMdNotificationsOutline />
      </div>
      
      <div className="profile_icons">
        <BsFillGearFill />
      </div> */}
    </div>
  );
};

export default Sidebaricons;
