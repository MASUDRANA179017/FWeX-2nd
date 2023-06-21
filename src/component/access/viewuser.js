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

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const Viewuserlist = () => {
  const [open, setOpen] = React.useState(false);

  const user = useSelector((users) => users.login.loggedIn);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const [mygrps, setMygrps] = useState([]);
  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

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
      remove(ref(db, "users/" + item.id));
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let mygrpArr = [];
      snapshot.forEach((item) => {
        if (user.uid !== item.val().adminid) {
          mygrpArr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrps(mygrpArr);
    });
  }, []);

  //   const [users, setUsers] = useState([]);
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const [rows, setRows] = useState([]);

  //   const getData = async () => {
  //     try {
  //       // *making an readable arry for the data firebase
  //       const data = ref.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setUsers(data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   useEffect(() => {
  //     getData();
  //   }, []);

  return (
    <>
      <div className="card">
        <div className="grouplist_header">
          <h2>User Lists</h2>
          <div className="group-serches-info">
            <div className="grouplist_searchBoxes">
              <AiOutlineSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <Button variant="contained" endIcon={<PersonAddAlt />}>
              <span>
                <NavLink to="/adduseracess" style={{ color: "white" }}>
                  Add User
                </NavLink>
              </span>
            </Button>
          </div>
        </div>
        <div className="grouplist_body">
          <div className="">
            <div className="">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Picture
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Agency Name
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Mail Address
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Contact No
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Address
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Nationality
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Role Name
                      </TableCell>

                      <TableCell align="center" style={{ minWidth: "100px" }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {mygrps.map((item, i) => (
                    <TableBody>
                      <TableRow hover role="checkbox" key={i} tabIndex={-1}>
                        <TableCell align="center">
                          <div className="mygrps_img">
                            <picture>
                              <img src={item.photoURL} alt="profilepic" />
                            </picture>
                          </div>
                        </TableCell>
                        <TableCell align="center">{item.companyName}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.phoneNumber}</TableCell>
                        <TableCell align="center">{item.address}</TableCell>
                        <TableCell align="center">{item.Country}</TableCell>
                        <TableCell align="center">{item.roleName}</TableCell>

                        <TableCell align="center">
                          <div>
                            <Stack direction="row" style={{ display: "flex" }}>
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
                                  display: "inline",
                                }}
                                onClick={() => removedata(item)}
                              />
                            </Stack>
                            <p>
                              {" "}
                              {/* <span>{moment().add(item.date, "days").calendar()}</span>                */}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default Viewuserlist;
