import { Box, useToast } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../DB/firebaseConfig";
import {
  FormControl,
  Grid,
  Button,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UpdateUser = () => {
  const [users, setusers] = useState([]);
  const toast = useToast();
  console.table(users);

  // todo: update the user
  const Updateuser = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      const temp = window.prompt("Please Re-enter the user_name");
      await updateDoc(userRef, { AgencyName: temp });
      getData();

      // * optional
      toast({
        title: "user Updated",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  // const urlsearchParams = new URLSearchParams(window.location.search);
  // if (urlsearchParams.has("id")) {
  //   const id = urlsearchParams.get("id");
  //   //Updateuser(id);
  // }

  // * TO get the data from database
  const getData = async () => {
    try {
      let id = 0;
      const urlsearchParams = new URLSearchParams(window.location.search);
      if (urlsearchParams.has("id")) {
        id = urlsearchParams.get("id");
        //Updateuser(id);
      }
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      // const usersRef = collection(db, "users/"+id);

      // const res = await getDocs(usersRef);

      // * making an readable array for the data
      // const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log(data);
      setusers([docSnap.data()]); //* storing the data into state
    } catch (error) {
      // console.log("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setusers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [toggle, setToggle] = useState(1);
  function updateToggle(id) {
    setToggle(id);
  }

  return (
    <>
      <Box>
        {users.map((user) => (
          <div key={user.id} className="profilepage">
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item xs={12}>
                <div className="container ">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                      <div className="card">
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent={"center"}
                            alignItems={"center"}>
                            <div className="editprofileimg">
                              <img src={user.Photo} />
                              <h2>
                                {user.AgencyFullName} {user.AgencySurName}
                              </h2>
                              <h5>Passport No: {user.PassportNo}</h5>
                              <h5>Nationality: {user.Nationality}</h5>
                              <h5>passport Expiry: {user.passportExpiry}</h5>
                              <Button
                                onClick={() => updateToggle(1)}
                                variant="contained">
                                Bio Data
                              </Button>
                              <Button
                                onClick={() => updateToggle(2)}
                                variant="contained">
                                Medical Report
                              </Button>
                              <Button
                                onClick={() => updateToggle(3)}
                                variant="contained">
                                Flight
                              </Button>
                            </div>
                          </Grid>
                          <div
                            className={
                              toggle === 1 ? "show-content" : "content"
                            }>
                            <Grid item xs={12} alignItems={"center"} justifyContent={"center"} width={"100%"}>
                              <TableContainer component={Paper} xs={12} alignItems={"center"} justifyContent={"center"} width={"20%"}>
                                <Table
                                  aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Title</TableCell>
                                      <TableCell>Value</TableCell>
                                      <TableCell>Title</TableCell>
                                      <TableCell>Value</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>Name:</TableCell>
                                      <TableCell>
                                        {user.AgencyFullName}
                                      </TableCell>
                                      <TableCell>Surname:</TableCell>
                                      <TableCell>
                                        {user.AgencySurName}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Gender:</TableCell>
                                      <TableCell>{user.Gender}</TableCell>
                                      <TableCell>Birth Date:</TableCell>
                                      <TableCell>{user.BirthDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Birth Place:</TableCell>
                                      <TableCell>{user.BirthPlace}</TableCell>
                                      <TableCell>Nationality:</TableCell>
                                      <TableCell>{user.Nationality}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Marital Status: </TableCell>
                                      <TableCell>
                                        {user.MaritalStatus}
                                      </TableCell>
                                      <TableCell>Country:</TableCell>
                                      <TableCell>
                                        {user.CountryOrigin}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Passport: </TableCell>
                                      <TableCell>{user.PassportNo}</TableCell>
                                      <TableCell>
                                        Passport Issue Place:
                                      </TableCell>
                                      <TableCell>
                                        {user.passportExpiry}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        Passport Issue Date:{" "}
                                      </TableCell>
                                      <TableCell>
                                        {user.PassportIssueDate}
                                      </TableCell>
                                      <TableCell>Passport Expiry:</TableCell>
                                      <TableCell>
                                        {user.AgencyFullName}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Job Sector : </TableCell>
                                      <TableCell>{user.JobSector}</TableCell>
                                      <TableCell>Current Agency:</TableCell>
                                      <TableCell>
                                        {user.AgencyCurrent}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Address: </TableCell>
                                      <TableCell>{user.Address1}</TableCell>
                                      <TableCell>Current Mobile No:</TableCell>
                                      <TableCell>{user.CurrentMobileNo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Status:</TableCell>
                                      <TableCell>{user.Status}</TableCell>
                                      <TableCell>Registered Date:</TableCell>
                                      <TableCell>{user.RegisteredDate}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              {/* <Grid
                                item
                                xs={12}
                                container
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <Grid
                                  item
                                  xs={6}
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                                  <div className="profile_text ">
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Name: {user.AgencyFullName}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Surname : {user.AgencySurName}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Gender: {user.Gender}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Birth Date: {user.BirthDate}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Birth Place: {user.BirthPlace}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Nationality: {user.Nationality}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Mobile: {user.CurrentMobileNo}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Marital Status : {user.MaritalStatus}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Country : {user.CountryOrigin}
                                    </div>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                                  <div className="profile_text ">
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Passport: {user.PassportNo}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Passport Issue Date :{" "}
                                      {user.PassportIssueDate}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Passport Expiry : {user.AgencyFullName}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Passport Issue Place :{" "}
                                      {user.passportExpiry}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Job Sector : {user.JobSector}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Current Agency : {user.AgencyCurrent}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Status : {user.Status}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Registered Date : {user.RegisteredDate}
                                    </div>
                                    <div sx={{ m: 1, width: "45%" }}>
                                      Passport : {user.Passport}
                                    </div>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                                  <div className="profile_buttons">
                                    <Button>Message</Button>
                                    <Button>Contact</Button>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                                  <div className="profile_buttons">
                                    <ul className="social-list">
                                      <li>
                                        <Facebook />
                                      </li>
                                      <li>
                                        <Instagram />
                                      </li>
                                    </ul>
                                  </div>
                                </Grid>
                              </Grid> */}
                            </Grid>
                          </div>
                          <div
                            className={
                              toggle === 2 ? "show-content" : "content"
                            }>
                            <div className="medicalreport">
                              <img
                                src="./assetes/medicalreport/medical.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className={
                              toggle === 3 ? "show-content" : "content"
                            }>
                            <div className="flight">
                              <img src="./assetes/flight/flight.jpg" alt="" />
                            </div>
                          </div>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
    </>
  );
};

export default UpdateUser;
