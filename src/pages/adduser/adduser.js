import React, { useEffect, useState } from "react";
import "./user.css";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  selectClasses,
} from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../DB/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

import { adduservalidation } from "../../validation/Validation";
import { PulseLoader } from "react-spinners";

import { useFormik } from "formik";



const Addusers = () => {
  const [loading, setLoading] = useState(false);

  let initialValues = {
    AgencyFullName: "",
    AgencySurName: "",
    Gender: "",
    BirthDate: "",
    BirthPlace: "",
    Nationality: "",
    PassportNo: "",
    PassportIssueDate: "",
    passportissuePlace: "",
    passportExpiry: "",
    JobSector: "",
    MaritalStatus: "",
    CurrentMobileNo: "",
    MobileOperator: "",
    FlightsProvider: "",
    FlightDepartureDate: "",
    FlightArrivalDate: "",
    AgencyCurrent: "",
    Status: "",
    DocStatus: "",
    VisaExpiryDate: "",
    WorkPermitExpiryDate: "",
    Address1: "",
    Address2: "",
    State: "",
    District: "",
    PostalCode: "",
    CountryOrigin: "",
    RecrutmentStatus: "",
    RegisteredDate: "",
    RegisteredByAgency: "",
    Absconded: "",
    YourReferralCode: "",
    ReferralCodeBy: "",
    ReferralNameBy: "",
    Skills: "",
    OneCALLMobile: "",
    AgentCode: "",
    AgentName: "",
    Photo: "",
    FlightTickets: "",
    Passport: "",
    MedicalReport: "",
  };
    // * initial State;
    const [user, setUser] = useState(initialValues);
    const navigate = useNavigate();
    const handleChange = "";

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: adduservalidation,
    onSubmit: () => {
      adduser();
    },
    handleChange: (e) => {
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },

  });
// console.log("formik data");
//   console.log(formik);

  // const { values, errors, touched, handleBlur, initialValues } = useFormik({
  //   initialState,
  //   validationSchema: adduser,
  // });



  // const addUsers =()=>{
  //   setLoading(true)
  //   initialValues(
  //     formik.values.AgencyFullName,
      
  //   )
  //   .then((setUser) => {
  //     navigate("/login")
  //   })
  //   .catch((error) => {
  //     if(error.message.includes("auth/email-already-in-use")){
  //       toast.error('Email Already in use', {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   });
  // }

  //* add new user into Firebase Database;
  const adduser = async () => {
    setLoading(true);
    try {
      
      // console.log(formik);
      const userRef = collection(db, "users");
      await addDoc(userRef, formik.values);
      // tost Optional
      toast.success("user add in database ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUser(initialValues);
      setLoading(false);
      navigate("/userlist");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // * to Update state with user-Details
  // const handleChange = (e) => {
  //   setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  return (
    <>
      <div className="headertext" align="center">
        <h2>FOREIGN WORKER FORM</h2>
        <h5>Please Change and Update Data</h5>
      </div>
      <ToastContainer />
      <div className="user">
        <Grid container>
          <Grid
            className="addusrform"
            style={{ padding: "20px 20px" }}
            item
            xs={12}>
            <form onSubmit={formik.handleSubmit}>
              

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                label="SurName"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Full Name</InputLabel>
                <OutlinedInput
                  type="text"
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  name="AgencyFullName"
                  onChange={formik.handleChange}
                  value={formik.values.AgencyFullName}
                  // required="true"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>


          
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                label="SurName"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Sur Name</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="AgencySurName"
                  onChange={formik.handleChange}
                  value={formik.values.AgencySurName}
                  //required="true"
                  label="Sur Name"
                />
                {formik.errors.AgencySurName &&
                  formik.touched.AgencySurName && (
                    <p className="errors">{formik.errors.AgencySurName}</p>
                  )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.Gender}
                  onChange={formik.handleChange}
                  name="Gender"
                  //required="true"
                  label="AgGendere">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{
                  m: 1,
                  width: "45%",
                 
                }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                {/* <label htmlFor="component-outlined">Date</label> */}
                <InputLabel htmlFor="component-outlined">
                  Date of Birth
                </InputLabel>
                <OutlinedInput
                  type="new.date"
                  id="component-outlined"
                  name="BirthDate"
                  onChange={formik.handleChange}
                  value={formik.values.BirthDate}
                  autoFocus="true"
                  //required="true"
                  // data-shrink="true"
                  label="Date of Birth"
                />
                {formik.errors.BirthDate &&
                  formik.touched.BirthDate && (
                    <p className="errors">{formik.errors.BirthDate}</p>
                  )}
              </FormControl>

              

              {/* <FormControl
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
                  onChange={formik.handleChange}
                  value={user.BirthDate}
                  required="true"
                  label="date of Birth"
                  defaultValue="01/01/2000"
                />
                {formik.errors.BirthDate &&
                formik.touched.BirthDate && (
                  <p className="errors">{formik.errors.BirthDate}</p>
                )}
              </FormControl> */}

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Birth Place
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={formik.handleChange}
                  value={formik.values.BirthPlace}
                  name="BirthPlace"
                  //required="true"
                  label="AgGendere">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                  <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                  <MenuItem value={"Afghanistan"}>Afghanistan</MenuItem>
                  <MenuItem value={"Albania"}>Albania</MenuItem>
                </Select>
                {formik.errors.BirthPlace &&
                  formik.touched.BirthPlace && (
                    <p className="errors">{formik.errors.BirthPlace}</p>
                  )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Nationality
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.Nationality}
                  onChange={formik.handleChange}
                  name="Nationality"
                  //required="true"
                  label="Nationality">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                  <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                  <MenuItem value={"Afghanistan"}>Afghanistan</MenuItem>
                  <MenuItem value={"Albania"}>Albania</MenuItem>
                </Select>
                {formik.errors.Nationality &&
                  formik.touched.Nationality && (
                    <p className="errors">{formik.errors.Nationality}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Passport No
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="PassportNo"
                  onChange={formik.handleChange}
                  value={formik.values.PassportNo}
                  //required="true"
                  label="Passport No"
                  defaultValue="01/01/2000"
                />
                {formik.errors.PassportNo &&
                  formik.touched.PassportNo && (
                    <p className="errors">{formik.errors.PassportNo}</p>
                  )}
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
                  type="date"
                  id="component-outlined"
                  name="PassportIssueDate"
                  onChange={formik.handleChange}
                  value={formik.values.PassportIssueDate}
                  //required="true"
                  data-shrink="true"
                  label="Passport Issue Date"
                  renderInput={(params) => <TextField {...params} />}
                />
                {formik.errors.PassportIssueDate &&
                  formik.touched.PassportIssueDate && (
                    <p className="errors">{formik.errors.PassportIssueDate}</p>
                  )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  passport issue Place
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.passportissuePlace}
                  onChange={formik.handleChange}
                  name="passportissuePlace"
                  //required="true"
                  label="passport issue Place">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                  <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                  <MenuItem value={"Afghanistan"}>Afghanistan</MenuItem>
                  <MenuItem value={"Albania"}>Albania</MenuItem>
                </Select>
                {formik.errors.passportissuePlace &&
                  formik.touched.passportissuePlace && (
                    <p className="errors">{formik.errors.passportissuePlace}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  passport Expiry
                </InputLabel>
                <OutlinedInput
                  type="date"
                  id="component-outlined"
                  name="passportExpiry"
                  onChange={formik.handleChange}
                  value={formik.values.passportExpiry}
                  //required="true"
                  label="passport Expiry"
                />
                {formik.errors.passportExpiry &&
                  formik.touched.passportExpiry && (
                    <p className="errors">{formik.errors.passportExpiry}</p>
                  )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">JobSector</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.JobSector}
                  onChange={formik.handleChange}
                  name="JobSector"
                  //required="true"
                  label="JobSector">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                  <MenuItem value={"Construction"}>Construction</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Finance"}>Finance</MenuItem>
                  <MenuItem value={"Education"}>Education</MenuItem>
                  <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                  <MenuItem value={"Hospitality"}>Hospitality</MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                  <MenuItem value={"Media and Communication"}>
                    Media and Communication
                  </MenuItem>
                  <MenuItem value={"Retail"}>Retail</MenuItem>
                  <MenuItem value={"Transportation"}>Transportation</MenuItem>
                  <MenuItem value={"Utilities"}>Utilities</MenuItem>
                  <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                </Select>
                {formik.errors.JobSector &&
                  formik.touched.JobSector && (
                    <p className="errors">{formik.errors.JobSector}</p>
                  )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  MaritalStatus
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.MaritalStatus}
                  onChange={formik.handleChange}
                  name="MaritalStatus"
                  //required="true"
                  label="Marital Status">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Married"}>Married</MenuItem>
                  <MenuItem value={"Widowed"}>Widowed</MenuItem>
                  <MenuItem value={"Separate"}>Separate</MenuItem>
                  <MenuItem value={"Divorce"}>Divorce</MenuItem>
                  <MenuItem value={"Single"}>Single</MenuItem>
                </Select>
                {formik.errors.MaritalStatus &&
                  formik.touched.MaritalStatus && (
                    <p className="errors">{formik.errors.MaritalStatus}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Current Mobile No
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="CurrentMobileNo"
                  onChange={formik.handleChange}
                  value={formik.values.CurrentMobileNo}
                  //required="true"
                  label="Current Mobile No"
                />
                {formik.errors.CurrentMobileNo &&
                  formik.touched.CurrentMobileNo && (
                    <p className="errors">{formik.errors.CurrentMobileNo}</p>
                  )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Mobile Operator
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.MobileOperator}
                  onChange={formik.handleChange}
                  name="MobileOperator"
                  label="Marital Status">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Operator1"}>Operator 1</MenuItem>
                  <MenuItem value={"Operator2"}>Operator2</MenuItem>
                  <MenuItem value={"Operator3"}>Operator3</MenuItem>
                  <MenuItem value={"Operator4"}>Operator4</MenuItem>
                  <MenuItem value={"Operator5"}>Operator5</MenuItem>
                </Select>
                {formik.errors.MobileOperator &&
                  formik.touched.MobileOperator && (
                    <p className="errors">{formik.errors.MobileOperator}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Flights Provider
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="FlightsProvider"
                  onChange={formik.handleChange}
                  value={formik.values.FlightsProvider}
                  //required="true"
                  label="Flights Provider"
                />
                {formik.errors.FlightsProvider &&
                  formik.touched.FlightsProvider && (
                    <p className="errors">{formik.errors.FlightsProvider}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Flight Departure Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  id="component-outlined"
                  name="FlightDepartureDate"
                  onChange={formik.handleChange}
                  value={formik.values.FlightDepartureDate}
                  //required="true"
                  label="Flight Departure Date"
                />
                {formik.errors.FlightDepartureDate &&
                  formik.touched.FlightDepartureDate && (
                    <p className="errors">{formik.errors.FlightDepartureDate}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Flight Arrival Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  id="component-outlined"
                  name="FlightArrivalDate"
                  onChange={formik.handleChange}
                  value={formik.values.FlightArrivalDate}
                  //required="true"
                  label="Flight Arrival Date"
                />
                {formik.errors.FlightArrivalDate &&
                  formik.touched.FlightArrivalDate && (
                    <p className="errors">{formik.errors.FlightArrivalDate}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Agency Current
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="AgencyCurrent"
                  onChange={formik.handleChange}
                  value={formik.values.AgencyCurrent}
                  //required="true"
                  label="Flight Arrival Date"
                />
                {formik.errors.AgencyCurrent &&
                  formik.touched.AgencyCurrent && (
                    <p className="errors">{formik.errors.AgencyCurrent}</p>
                  )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.Status}
                  onChange={formik.handleChange}
                  name="Status"
                  label="Status">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                </Select>
                {formik.errors.Status &&
                  formik.touched.Status && (
                    <p className="errors">{formik.errors.Status}</p>
                  )}
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  StaDoc Statustus
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="StaDocStatustus"
                  onChange={formik.handleChange}
                  value={formik.values.StaDocStatustus}
                  // required="true"
                  label="Flight Arrival Date"
                />
                {formik.errors.StaDocStatustus &&
                  formik.touched.StaDocStatustus && (
                    <p className="errors">{formik.errors.StaDocStatustus}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Visa Expiry Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  id="component-outlined"
                  name="VisaExpiryDate"
                  onChange={formik.handleChange}
                  value={formik.values.VisaExpiryDate}
                  // required="true"
                  label="Visa Expiry Date"
                />
                {formik.errors.VisaExpiryDate &&
                  formik.touched.VisaExpiryDate && (
                    <p className="errors">{formik.errors.VisaExpiryDate}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Work Permit Expiry Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  id="component-outlined"
                  name="WorkPermitExpiryDate"
                  onChange={formik.handleChange}
                  value={formik.values.WorkPermitExpiryDate}
                  // required="true"
                  label="Work Permit Expiry Date"
                />
                {formik.errors.WorkPermitExpiryDate &&
                  formik.touched.WorkPermitExpiryDate && (
                    <p className="errors">{formik.errors.WorkPermitExpiryDate}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Address One
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="Address1"
                  onChange={formik.handleChange}
                  value={formik.values.Address1}
                  // required="true"
                  label="Address One"
                />
                {formik.errors.Address1 &&
                  formik.touched.Address1 && (
                    <p className="errors">{formik.errors.Address1}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Address two
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="Address2"
                  onChange={formik.handleChange}
                  value={formik.values.Address2}
                  label=" Address two"
                />
                
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">State</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="State"
                  onChange={formik.handleChange}
                  value={formik.values.State}
                  label=" State"
                />
                
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">District</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="District"
                  onChange={formik.handleChange}
                  value={formik.values.District}
                  label="District"
                />
                {formik.errors.District &&
                  formik.touched.District && (
                    <p className="errors">{formik.errors.District}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">PostalCode</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="PostalCode"
                  onChange={formik.handleChange}
                  value={formik.values.PostalCode}
                  label="PostalCode"
                />
                
              </FormControl>

              <FormControl sx={{ m: 1, width: "45%" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Country Origin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.CountryOrigin}
                  onChange={formik.handleChange}
                  name="CountryOrigin"
                  
                  label="AgGendere">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                  <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                  <MenuItem value={"Afghanistan"}>Afghanistan</MenuItem>
                  <MenuItem value={"Albania"}>Albania</MenuItem>
                </Select>
                
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Recrutment Status
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="RecrutmentStatus"
                  onChange={formik.handleChange}
                  value={formik.values.RecrutmentStatus}
                  label="Recrutment Status"
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
                  type="date"
                  id="component-outlined"
                  name="RegisteredDate"
                  onChange={formik.handleChange}
                  value={formik.values.RegisteredDate}
                  label="Registered Date"
                />
                {formik.errors.Date &&
                  formik.touched.Date && (
                    <p className="errors">{formik.errors.Date}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Registered By Agency
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="RegisteredByAgency"
                  onChange={formik.handleChange}
                  value={formik.values.RegisteredByAgency}
                  label="Registered By Agency"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Absconded</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="Absconded"
                  onChange={formik.handleChange}
                  value={formik.values.Absconded}
                  label="Absconded"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Your Referral Code
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="YourReferralCode"
                  onChange={formik.handleChange}
                  value={formik.values.YourReferralCode}
                  label="Your Referral Code"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Your Referral Code By
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="ReferralCodeBy"
                  onChange={formik.handleChange}
                  value={formik.values.ReferralCodeBy}
                  label="Your Referral Code By"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  Referral Name By
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="ReferralNameBy"
                  onChange={formik.handleChange}
                  value={formik.values.ReferralNameBy}
                  label="Referral Name By"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Skills</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="Skills"
                  onChange={formik.handleChange}
                  value={formik.values.Skills}
                  label="Skills"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">
                  OneCALL Mobile
                </InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="OneCALLMobile"
                  onChange={formik.handleChange}
                  value={formik.values.OneCALLMobile}
                  label="OneCALL Mobile"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Agent Code</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="AgentCode"
                  onChange={formik.handleChange}
                  value={formik.values.AgentCode}
                  label="Agent Code"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Agent Name</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="AgentName"
                  onChange={formik.handleChange}
                  value={formik.values.AgentName}
                  label="Agent Name"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                id="outlined-basic"
                variant="outlined">
                <InputLabel htmlFor="component-outlined">Photo url</InputLabel>
                <OutlinedInput
                  type="text"
                  id="component-outlined"
                  name="Photo"
                  onChange={formik.handleChange}
                  value={formik.values.Photo}
                  label="Agent Name"
                />
                {formik.errors.AgencyFullName &&
                  formik.touched.AgencyFullName && (
                    <p className="errors">{formik.errors.AgencyFullName}</p>
                  )}
              </FormControl>

              {/* <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Photo
                </InputLabel>
                <Input
                  type="file"
                  placeholder="Photo"
                  name="Photo"
                  onChange={handleChange}
                  value={user.Photo}
                  border="1px"
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Flight Tickets
                </InputLabel>
                <Input
                  type="file"
                  placeholder=" Flight Tickets  "
                  name="FlightTickets"
                  onChange={handleChange}
                  value={user.FlightTickets}
                  border="1px"
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Passport
                </InputLabel>
                <Input
                  type="file"
                  placeholder="Passport"
                  name="Passport"
                  onChange={handleChange}
                  value={user.Passport}
                  border="1px"
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "45%" }}
                fullWidth
                variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Medical Report
                </InputLabel>
                <Input
                  type="file"
                  placeholder="Medical Report "
                  name="MedicalReport"
                  onChange={handleChange}
                  value={user.MedicalReport}
                  border="1px"
                />
              </FormControl> */}

              <div className="reg-btn">
                {loading ? (
                  <Button type="submit" disabled variant="contained" >
                    <PulseLoader
                      baground-color="#0000"
                      color="#fff"
                      size={5}
                    />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={formik.Addusers}
                    >
                    Submit Data
                  </Button>
                )}
              </div>

              
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Addusers;
