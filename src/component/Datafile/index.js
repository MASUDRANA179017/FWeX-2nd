import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

import moment from "moment/moment";
import { Delete, Edit, PersonAddAlt, Visibility, } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import Viewdata from "./view";


const EmployeeList = () => {
  const [open, setOpen] = React.useState(false);

  const user = useSelector((users) => users.login.loggedIn);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const [mygrps, setMygrps] = useState([]);

  // // creating groups
  // const handleGrpCreate = () => {
  //   set(push(ref(db, "groups")), {
  //     groupname: groupname,
  //     grouptag: grouptag,
  //     adminname: user.displayName,
  //     adminid: user.uid,
  //     date: `${new Date().getFullYear()} - ${
  //       new Date().getMonth() + 1
  //     } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
  //   }).then(() => {
  //     setOpen(false);
  //   });
  // };

  // Remove data
  const removedata = (item) => {
    set(push(ref(db, "removedata")), {
      reciverid: user.uid,
      recivername: user.displayName,
    }).then(() => {
      remove(ref(db, "employee/" + item.id));
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "employee");
    onValue(starCountRef, (snapshot) => {
      let mygrpArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid) {
          mygrpArr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrps(mygrpArr);
    });
  }, []);

  return (
    <>
      <div className="mygrps">
        <div className="grouplist_header">
          <h2>Group Lists</h2>
          <div className="group-serches-info">
            <div className="grouplist_searchBoxes">
              <AiOutlineSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <Button
              variant="contained"
              endIcon={<PersonAddAlt />}>
              <span>
                <NavLink to="/AdddataForm" style={{ color: "white" }}>
                  Add User
                </NavLink>
              </span>
            </Button>

          </div>
        </div>
        <div className="grouplist_body">
          {mygrps.map((item, i) => (
            <div className="mygrps_wrapper" key={i}>
              <div className="mygrps_img">
                <img src="/assets/avatar.png" alt="avatr" />
              </div>
              <div className="mygrps_titles">
                <h4>{item.AgencyFullName}</h4>
                <span>{item.grouptag}</span>
              </div>
              
              <div className="mygrps_date">
                <Stack spacing={2} direction="row">
                  <div >
                    <Visibility
                      style={{
                        fontSize: "20px",
                        color: "darkred",
                        cursor: "pointer",
                      }}
                      onClick={handleOpen}
                    />
                  </div>
                  <NavLink >
                    <Edit
                      style={{
                        fontSize: "20px",
                        color: "darkred",
                        cursor: "pointer",
                      }}
                      // onClick={() => {
                      //   editUser(row.id);
                      // }}
                    />
                  </NavLink>

                  <Delete
                    style={{
                      fontSize: "20px",
                      color: "darkred",
                      cursor: "pointer",
                    }}onClick={() => removedata(item)}
                    
                  />
                </Stack>
                <p> <span>{moment().add(item.date, "days").calendar()}</span></p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="modals">
          <Viewdata setOpen={setOpen} />
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="modals">
          <Viewdata setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
};

export default EmployeeList;
