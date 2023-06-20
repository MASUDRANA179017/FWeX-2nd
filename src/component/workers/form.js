

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { adduservalidation } from "../../validation/Validation";
import { Link, useNavigate } from "react-router-dom";


// import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const AddDataForm = () => {
  const user = useSelector((users) => users.login.loggedIn);
  const [loading, setLoading] = useState(false);
  const db = getDatabase();
  const navigate = useNavigate();

  let initialvalues = {
    AgencyFullName: "",
    AgencySurName: "",
    Gender: "",
    BirthPlace: "",
    Nationality: "",
    PassportNo: "",
    PassportIssueDate: "",
    passportissuePlace: "",
    passportExpiry: "",
    JobSector: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: adduservalidation,
    onSubmit: () => {
      handleWorkerListCreate();
    },
  });

  const handleWorkerListCreate = () => {
    setLoading(true);

    set(ref(db, "employee/" + user.uid), {
      AgencyFullName: formik.values.AgencyFullName,
      AgencySurName: formik.values.AgencySurName,
      Gender: formik.values.Gender,
      BirthPlace: formik.values.BirthPlace,
      Nationality: formik.values.Nationality,
      PassportNo: formik.values.PassportNo,
      PassportIssueDate: formik.values.PassportIssueDate,
      passportissuePlace: formik.values.passportissuePlace,
      passportExpiry: formik.values.passportExpiry,
      JobSector: formik.values.JobSector,
    })
      .then(() => {
        toast.success("Data add successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/employee");
        }, 2000);
      })

      .catch((error) => {
        if (error) {
          toast.error("Data add Fails ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="adddataform">
          <Box className="card">
            <div className="group-creattion-form">
              <h2 className="main_tittle">FOREIGN WORKER FORM</h2>
              <h5 className="sub_tittle">
                Please complete the registration form
              </h5>
              <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="AgencyFullName"
                    label="Agency Full Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.AgencyFullName}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {formik.errors.AgencyFullName &&
                    formik.touched.AgencyFullName && (
                      <p className="signup__error">
                        {formik.errors.AgencyFullName}
                      </p>
                    )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="AgencySurName"
                    label="Agency Sur Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.AgencySurName}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {formik.errors.AgencySurName &&
                    formik.touched.AgencySurName && (
                      <p className="signup__error">
                        {formik.errors.AgencySurName}
                      </p>
                    )}
                </Grid>

                <Grid item xs={5}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={formik.values.Gender}
                      onChange={formik.handleChange}
                      name="Gender"
                      //required="true"
                      label="Gender">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                    {formik.errors.Gender && formik.touched.Gender && (
                      <p className="errors">{formik.errors.Gender}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="BirthDate"
                    label="Birth Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.BirthDate}
                    margin="normal"
                  />
                  {formik.errors.BirthDate && (
                    <p className="signup__error">{formik.errors.BirthDate}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="BirthPlace"
                    label="Birth Place"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.BirthPlace}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {formik.errors.BirthPlace && formik.touched.BirthPlace && (
                    <p className="signup__error">{formik.errors.BirthPlace}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Nationality"
                    label="Nationality"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Nationality}
                    margin="normal"
                  />
                  {formik.errors.Nationality && formik.touched.Nationality && (
                    <p className="error__message">
                      {formik.errors.Nationality}
                    </p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="PassportNo"
                    label="Passport No"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.PassportNo}
                    margin="normal"
                  />
                  {formik.errors.PassportNo && formik.touched.PassportNo && (
                    <p className="error__message">{formik.errors.PassportNo}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="PassportIssueDate"
                    label="Passport Issue Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.PassportIssueDate}
                    margin="normal"
                  />
                  {formik.errors.PassportIssueDate && (
                    <p className="error__message">
                      {formik.errors.PassportIssueDate}
                    </p>
                  )}
                </Grid>
                
                
                <Grid item xs={5}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                    Passport Issue Place
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={formik.values.PassportPlace}
                      onChange={formik.handleChange}
                      name="PassportPlace"
                      label="Passport Place">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                      
                    </Select>
                    {formik.errors.PassportPlace && (
                      <p className="errors">{formik.errors.PassportPlace}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="PassportIssueDate"
                    label="Passport Expiry Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.PassportIssueDate}
                    margin="normal"
                  />
                  {formik.errors.PassportIssueDate && (
                    <p className="error__message">
                      {formik.errors.PassportIssueDate}
                    </p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Job Sector
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={formik.values.JobSector}
                      onChange={formik.handleChange}
                      name="JobSector"
                      label="Job Sector">
                      <MenuItem value="">
                        <em> Select Job Sector</em>
                      </MenuItem>
                      <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                      <MenuItem value={"Construction"}>Construction</MenuItem>
                      <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                      <MenuItem value={"IT"}>IT</MenuItem>
                      <MenuItem value={"Finance"}>Finance</MenuItem>
                      <MenuItem value={"Education"}>Education</MenuItem>
                      <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                      <MenuItem value={"Hospitality"}>Hospitality</MenuItem>
                      <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                      <MenuItem value={"Marketing"}>Marketing</MenuItem>
                      <MenuItem value={"Media and Communications"}>Media and Communications</MenuItem>
                      <MenuItem value={"Retail"}>Retail</MenuItem>
                      <MenuItem value={"Transportation"}>Transportation</MenuItem>
                      <MenuItem value={"Utilities"}>Utilities</MenuItem>
                    </Select>
                    {formik.errors.JobSector && formik.touched.JobSector && (
                      <p className="errors">{formik.errors.JobSector}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Marital status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={formik.values.JobSector}
                      onChange={formik.handleChange}
                      name="JobSector"
                      label="Job Sector">
                      <MenuItem value="">
                        <em>Select Status </em>
                      </MenuItem>
                      <MenuItem value={"Married"}>Married</MenuItem>
                      <MenuItem value={"Widowed"}>Widowed</MenuItem>
                      <MenuItem value={"Separated"}>Separated</MenuItem>
                      <MenuItem value={"Divorced"}>Divorced</MenuItem>
                      <MenuItem value={"Single"}>Single</MenuItem>
                    </Select>
                    {formik.errors.JobSector && formik.touched.JobSector && (
                      <p className="errors">{formik.errors.JobSector}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="CurrentmobileNo"
                    label="current mobile No"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.CurrentmobileNo}
                    margin="normal"
                  />
                  {formik.errors.CurrentmobileNo && (
                    <p className="error__message">{formik.errors.CurrentmobileNo}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="mobileOperator"
                    label="mobile Operator"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobileOperator}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="FlightsProvider"
                    label="Flights Provider"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.FlightsProvider}
                    margin="normal"
                  />
                  
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="FlightDepartureDate"
                    label="Flight Departure Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.FlightDepartureDate}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="FlightArrivalDate"
                    label="Flight Arrival Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.FlightArrivalDate}
                    margin="normal"
                  />
                  
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="AgencyCurrent"
                    label="Agency Current"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.AgencyCurrent}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Status"
                    label="Status"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.Status}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Docstatus"
                    label="Doc Status"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Docstatus}
                    margin="normal"
                  />
                  {formik.errors.Docstatus && (
                    <p className="error__message">{formik.errors.Docstatus}</p>
                  )}
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="visaExpiryDate"
                    label="visa Expiry Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.visaExpiryDate}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    name="workPermitExpiryDate"
                    label="work Permit Expiry Date"
                    variant="outlined"
                    focused
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.workPermitExpiryDate}
                    margin="normal"
                  />
                 
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="AddressOne"
                    label="Address One"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.AddressOne}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="AddressTwo"
                    label="Address Two"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.AddressTwo}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="State"
                    label="State"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.State}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="District"
                    label="District"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.District}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="postalcode"
                    label="postal code"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.postalcode}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                    Country Origin
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={formik.values.CountryOrigin}
                      onChange={formik.handleChange}
                      name="PassportPlace"
                      label="Country Origin">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                      
                    </Select>
                    {formik.errors.CountryOrigin && (
                      <p className="errors">{formik.errors.CountryOrigin}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Recruitmentstatus"
                    label="Recruitment status"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.Recruitmentstatus}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="date"
                    focused

                    name="RegisteredDate"
                    label="Registered Date"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.RegisteredDate}
                    margin="normal"
                  />
                  {formik.errors.RegisteredDate && (
                    <p className="error__message">{formik.errors.RegisteredDate}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="RegisteredByAgency"
                    label="Registered By Agency"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.RegisteredByAgency}
                    margin="normal"
                  />
                  {formik.errors.RegisteredByAgency && (
                    <p className="error__message">{formik.errors.RegisteredByAgency}</p>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Absconded"
                    label="Absconded"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                  
                    value={formik.values.Absconded}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="YourReferralCode"
                    label="Your Referral Code"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.YourReferralCode}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="ReferralCodeBy"
                    label="Referral Code By"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                   
                    value={formik.values.ReferralCodeBy}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="ReferralNameBy"
                    label="Referral Name By"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}

                    value={formik.values.ReferralNameBy}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="Skills"
                    label="Skills"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.Skills}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="OneCALLMobile"
                    label="OneCALL Mobile "
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.OneCALLMobile}
                    margin="normal"
                  />
                 
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="AgentCode"
                    label="Agent Code"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    
                    value={formik.values.AgentCode}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="file"
                    name="Photo"
                    label="Photo *"
                    variant="outlined"
                    fullWidth
                    focused
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Photo}
                    margin="normal"
                  />
                  {formik.errors.Photo && (
                    <p className="error__message">{formik.errors.Photo}</p>
                  )}
                  
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="file"
                    name="AgentCode"
                    label="Agent Code"
                    variant="outlined"
                    fullWidth
                    focused
                    onChange={formik.handleChange}
                    
                    value={formik.values.AgentCode}
                    margin="normal"
                  />
                  
                </Grid>
                <Grid item xs={5}>
                <TextField
                    type="file"
                    name="Photo"
                    label="Photo *"
                    variant="outlined"
                    fullWidth
                    focused
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Photo}
                    margin="normal"
                  />
                  {formik.errors.Photo && (
                    <p className="error__message">{formik.errors.Photo}</p>
                  )}
                  
                </Grid>
                <Grid item xs={5}>
                <TextField
                    type="file"
                    name="Photo"
                    label="Photo *"
                    variant="outlined"
                    fullWidth
                    focused
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Photo}
                    margin="normal"
                  />
                  {formik.errors.Photo && (
                    <p className="error__message">{formik.errors.Photo}</p>
                  )}
                  
                </Grid>
                
                
              </Grid>
              <div className="Adddata__btn">
                {loading === true ? (
                  <Button type="submit" disabled variant="contained">
                    <PulseLoader color="#fff" size={10} />
                  </Button>
                ) : (
                  <Button type="submit" variant="contained">
                    Create Account
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </div>
      </form>
    </>
  );
};

export default AddDataForm;
