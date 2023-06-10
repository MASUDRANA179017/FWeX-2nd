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

const EditUserdata = () => {
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
      console.log("error: ", error);
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
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setusers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
                              <Button variant="contained">Bio Data</Button>
                              <Button variant="contained">
                                Medical Report
                              </Button>
                              <Button variant="contained">Flight</Button>
                            </div>
                          </Grid>
                          <Grid item xs={12} alignItems={"center"}>
                           

                            <div className="profile_text ">
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Name:
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="AgencyFullName"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.AgencyFullName}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Surname
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="AgencyCurrent"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.AgencyCurrent}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Gender
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={user.Gender}
                                  onChange={handleChange}
                                  name="Gender"
                                  label="AgGendere">
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={"Male"}>Male</MenuItem>
                                  <MenuItem value={"Female"}>Female</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  date of Birth
                                </InputLabel>
                                <OutlinedInput
                                  type="date"
                                  id="component-outlined"
                                  name="BirthDate"
                                  onChange={handleChange}
                                  value={user.BirthDate}
                                  label="date of Birth"
                                  defaultValue="01/01/2000"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Birth Place
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="BirthPlace"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.BirthPlace}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Nationality
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="Nationality"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.Nationality}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Mobile
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="CurrentMobileNo"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.CurrentMobileNo}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Marital Status
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="MaritalStatus"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.MaritalStatus}
                                  label="Marital Status"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Country
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="CountryOrigin"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.CountryOrigin}
                                  label="Country Origin"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Passport
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="PassportNo"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.PassportNo}
                                  label="Passport No"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Passport Issue Date
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="PassportIssueDate"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.PassportIssueDate}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Passport Expiry
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="passportExpiry"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.passportExpiry}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Passport Issue Place
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="passportissuePlace"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.passportissuePlace}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Job Sector
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="JobSector"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.JobSector}
                                  label="Job Sector"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Current Agency
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="AgencyCurrent"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.AgencyCurrent}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Status
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="Status"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.Status}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, width: "45%" }}
                                fullWidth
                                id="outlined-basic"
                                variant="outlined">
                                <InputLabel htmlFor="component-outlined">
                                  Registered Date
                                </InputLabel>
                                <OutlinedInput
                                  type="text"
                                  id="component-outlined"
                                  name="RegisteredDate"
                                  onChange={handleChange}
                                  // value={user.AgencyCurrent}
                                  defaultValue={user.RegisteredDate}
                                  label="Flight Arrival Date"
                                />
                              </FormControl>
                            </div>
                            <Grid
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
                                alignItems={"center"}></Grid>
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
                            </Grid>
                          </Grid>
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

export default EditUserdata;
