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
import { Delete, Edit, PersonAddAlt, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import Viewdata from "./view";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const EmployeeList = () => {
  const [open, setOpen] = React.useState(false);

  const user = useSelector((users) => users.login.loggedIn);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const [mygrps, setMygrps] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const getData = async () => {
    try {
      // *making an readable arry for the data firebase
      const data = ref.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
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

            <Button variant="contained" endIcon={<PersonAddAlt />}>
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
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Agency Name
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Gender
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Current Agency
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Contact No
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Nationality
                        </TableCell>

                        <TableCell align="center" style={{ minWidth: "100px" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item.code}>
                        <TableCell align="center">
                          {item.AgencyFullName} {item.AgencySurName}
                        </TableCell>
                        <TableCell align="center">{item.Gender}</TableCell>
                        <TableCell align="center">
                          {item.AgencyCurrent}
                        </TableCell>
                        <TableCell align="center">
                          {item.CurrentMobileNo}
                        </TableCell>
                        <TableCell align="center">{item.Nationality}</TableCell>
                        <TableCell align="center">{item.Status}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <div className="mygrps_date">
                <Stack spacing={2} direction="row">
                  <div>
                    <Visibility
                      style={{
                        fontSize: "20px",
                        color: "darkred",
                        cursor: "pointer",
                      }}
                      onClick={handleOpen}
                    />
                  </div>
                  <NavLink>
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
                    }}
                    onClick={() => removedata(item)}
                  />
                </Stack>
                <p>
                  {" "}
                  <span>{moment().add(item.date, "days").calendar()}</span>
                </p>
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
