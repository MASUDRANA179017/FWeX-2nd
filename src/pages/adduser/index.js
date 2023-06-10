import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import { db } from "../../DB/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Edit, ViewAgenda, Visibility } from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import EditUserData from "./Edituserdata";
import { async } from "@firebase/util";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    try {
      const userRef = collection(db, "users");
      const res = await getDocs(userRef);

      // *making an readable arry for the data firebase
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const editUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.value) {
        editApi(id);
      }
    });
  };

  

  const editApi = async (id) => {
    const userDoc = doc(db, "users", id);
    // await deleteDoc(userDoc);
    // console.log(userDoc);
    Swal.fire("Edit!", "Your file has been Update.", "success");
    getUsers();
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

  const [open, setOpen] = useState(false);
  const [eiditOpen, setEiditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleeiditOpen = () => setEiditOpen(true);
  const handleEditClose = () => setEiditOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}>
            User List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.AgencyFullName || rows.Status}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}></Typography>
            <Button
              // onClick={handleOpen}
              variant="contained"
              endIcon={<AddCircleIcon />}>
              <span>
                <NavLink to="/adduser" style={{ color: "white" }}>
                  {" "}
                  Add User
                </NavLink>
              </span>
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
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
                  <TableCell align="center" style={{ minWidth: "100px" }}>
                    Field
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}>
                        <TableCell align="center">{row.AgencyFullName} {row.AgencySurName}</TableCell>
                        <TableCell align="center">{row.Gender}</TableCell>
                        <TableCell align="center">
                          {row.AgencyCurrent}
                        </TableCell>
                        <TableCell align="center">{row.CurrentMobileNo}</TableCell>
                        <TableCell align="center">{row.Nationality}</TableCell>
                        <TableCell align="center">{row.Status}</TableCell>
                        <TableCell align="center">{row.JobSector}</TableCell>

                        <TableCell align="center">
                          <Stack spacing={2} direction="row">
                            <NavLink to={`/updateuser?id=${row.id}`}>
                              <Visibility
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                              />
                            </NavLink>
                            <NavLink to={`/edituser?id=${row.id}`}>
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

                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
