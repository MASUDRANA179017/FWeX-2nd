import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";

const Viewdata = ({worker}) => {
  const user = useSelector((users) => users.login.loggedIn);

  const [toggle, setToggle] = useState(1);
  function updateToggle(id) {
    setToggle(id);
  }


 

  return (
    <>
      <div className="profilepage">
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
                        className={toggle === 1 ? "show-content" : "content"}>
                        <Grid
                          item
                          xs={12}
                          alignItems={"center"}
                          justifyContent={"center"}
                          width={"100%"}>
                          <TableContainer
                            component={Paper}
                            xs={12}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"20%"}>
                            <Table aria-label="simple table">
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
                                  <TableCell>{worker.AgencyFullName}</TableCell>
                                  <TableCell>Surname:</TableCell>
                                  <TableCell>{worker.AgencySurName}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Gender:</TableCell>
                                  <TableCell>{worker.Gender}</TableCell>
                                  <TableCell>Birth Date:</TableCell>
                                  <TableCell>{worker.BirthDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Birth Place:</TableCell>
                                  <TableCell>{worker.BirthPlace}</TableCell>
                                  <TableCell>Nationality:</TableCell>
                                  <TableCell>{worker.Nationality}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Marital Status: </TableCell>
                                  <TableCell>{worker.MaritalStatus}</TableCell>
                                  <TableCell>Country:</TableCell>
                                  <TableCell>{worker.CountryOrigin}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Passport: </TableCell>
                                  <TableCell>{worker.PassportNo}</TableCell>
                                  <TableCell>Passport Issue Place:</TableCell>
                                  <TableCell>{worker.passportExpiry}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Passport Issue Date: </TableCell>
                                  <TableCell>
                                    {worker.PassportIssueDate}
                                  </TableCell>
                                  <TableCell>Passport Expiry:</TableCell>
                                  <TableCell>{worker.AgencyFullName}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Job Sector : </TableCell>
                                  <TableCell>{worker.JobSector}</TableCell>
                                  <TableCell>Current Agency:</TableCell>
                                  <TableCell>{worker.AgencyCurrent}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Address: </TableCell>
                                  <TableCell>{worker.Address1}</TableCell>
                                  <TableCell>Current Mobile No:</TableCell>
                                  <TableCell>{worker.CurrentMobileNo}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Status:</TableCell>
                                  <TableCell>{worker.Status}</TableCell>
                                  <TableCell>Registered Date:</TableCell>
                                  <TableCell>{worker.RegisteredDate}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </div>
                      <div
                        className={toggle === 2 ? "show-content" : "content"}>
                        <div className="medicalreport">
                          <img
                            src="./assetes/medicalreport/medical.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className={toggle === 3 ? "show-content" : "content"}>
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
    </>
  );
};

export default Viewdata;
