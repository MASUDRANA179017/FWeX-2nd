// import React, { useState } from "react";
// import "./style.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { getDatabase, push, ref, set } from "firebase/database";
// import { useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { adduservalidation } from "../../validation/Validation";
// import { ToastContainer, toast } from "react-toastify";
// import { PulseLoader } from "react-spinners";
// import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

// const AddDataForm = () => {
//   const user = useSelector((users) => users.login.loggedIn);
//   const db = getDatabase();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   let initialvalues = {
//     AgencyFullName: "",
//     AgencySurName: "",
//     Gender: "",
//     BirthDate: "",
//     BirthPlace: "",
//     Nationality: "",
//     PassportNo: "",
//     PassportIssueDate: "",
//     passportissuePlace: "",
//     passportExpiry: "",
//     JobSector: "",
//   };
//   const formik = useFormik({
//     initialValues: initialvalues,
//     validationSchema: adduservalidation,
//     onSubmit: () => {
//       handleWorkerListCreate();
//     },
//   });

//   const handleWorkerListCreate = () => {
//     //Form validation

//     setLoading(true);
//     set(push(ref(db, "employee")), {
//       adminid: user.uid,
//       date: `${new Date().getFullYear()} - ${
//         new Date().getMonth() + 1
//       } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,

//       AgencyFullName: formik.values.AgencyFullName,
//       AgencySurName: formik.values.AgencySurName,
//       Gender: formik.values.Gender,
//       BirthPlace: formik.values.BirthPlace,
//       Nationality: formik.values.Nationality,
//       PassportNo: formik.values.PassportNo,
//       PassportIssueDate: formik.values.PassportIssueDate,
//       passportissuePlace: formik.values.passportissuePlace,
//       passportExpiry: formik.values.passportExpiry,
//       JobSector: formik.values.JobSector,
//     }).then(()=>{
//       setLoading(false);
//     })
//       .then(() => {
//         toast.success("Data add successfully", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         setTimeout(() => {
//           setLoading(false);
//           navigate("/employee");
//         }, 2000);
//       })
//       .catch((error) => {
//         if (error.message) {
//           console.log(error.message);

//           toast.error("Check your data mistake ", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           setLoading(false);
//         }
//       });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <form action="" onSubmit={formik.handleSubmit}>
//         <div className="adddataform">
//           <Box className="card">
//             <div className="group-creattion-form">
//               <h2 className="tittle">Add Your Own Data</h2>
//               <Grid container justifyContent={"center"} spacing={2}>
//                 <Grid item xs={5}>
//                   <TextField

//                     id="outlined-basic"
//                     name="AgencyFullName"
//                     label="Agency Full Name"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.AgencyFullName}
//                     margin="normal"
//                   />
//                   {formik.errors.AgencyFullName &&
//                     formik.touched.AgencyFullName && (
//                       <p className="error__message">
//                         {formik.errors.AgencyFullName}
//                       </p>
//                     )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField
//                     id="outlined-basic"
//                     name="AgencySurName"
//                     label="Agency Sur Name"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.AgencySurName}
//                     margin="normal"
//                   />
//                   {formik.errors.AgencySurName &&
//                     formik.touched.AgencySurName && (
//                       <p className="error__message">
//                         {formik.errors.AgencySurName}
//                       </p>
//                     )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <FormControl sx={{ mt: 2 }} fullWidth>
//                     <InputLabel id="demo-simple-select-label">
//                       Gender
//                     </InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       value={formik.values.Gender}
//                       onChange={formik.handleChange}
//                       name="Gender"
//                       //required="true"
//                       label="Gender">
//                       <MenuItem value="">
//                         <em>None</em>
//                       </MenuItem>
//                       <MenuItem value={"Male"}>Male</MenuItem>
//                       <MenuItem value={"Female"}>Female</MenuItem>
//                     </Select>
//                     {formik.errors.Gender &&
//                       formik.touched.Gender && (
//                         <p className="errors">{formik.errors.Gender}</p>
//                       )}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="date"
//                     name="BirthDate"
//                     label="Birth Date"
//                     focused
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.BirthDate}
//                     margin="normal"
//                   />
//                   {formik.errors.BirthDate && formik.touched.BirthDate && (
//                     <p className="error__message">{formik.errors.BirthDate}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="text"
//                     name="BirthPlace"
//                     label="Birth Place"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.BirthPlace}
//                     margin="normal"
//                   />
//                   {formik.errors.BirthPlace && formik.touched.BirthPlace && (
//                     <p className="error__message">{formik.errors.BirthPlace}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="text"
//                     name="Nationality"
//                     label="Nationality"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.Nationality}
//                     margin="normal"
//                   />
//                   {formik.errors.Nationality && formik.touched.Nationality && (
//                     <p className="error__message">{formik.errors.Nationality}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="text"
//                     name="PassportNo"
//                     label="Passport No"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.PassportNo}
//                     margin="normal"
//                   />
//                   {formik.errors.PassportNo && formik.touched.PassportNo && (
//                     <p className="error__message">{formik.errors.PassportNo}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="date"
//                     name="PassportIssueDate"
//                     label="Passport Issue Date"
//                     focused
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.PassportIssueDate}
//                     margin="normal"
//                   />
//                   {formik.errors.PassportIssueDate && formik.touched.PassportIssueDate && (
//                     <p className="error__message">{formik.errors.PassportIssueDate}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="text"
//                     name="passportissuePlace"
//                     label="Passport No"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.passportissuePlace}
//                     margin="normal"
//                   />
//                   {formik.errors.passportissuePlace && formik.touched.passportissuePlace && (
//                     <p className="error__message">{formik.errors.passportissuePlace}</p>
//                   )}
//                 </Grid>
//                 <Grid item xs={5}>
//                   <TextField

//                     type="text"
//                     name="passportExpiry"
//                     label="Passport No"
//                     variant="outlined"
//                     fullWidth
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.passportExpiry}
//                     margin="normal"
//                   />
//                   {formik.errors.passportExpiry && formik.touched.passportExpiry && (
//                     <p className="error__message">{formik.errors.passportExpiry}</p>
//                   )}
//                 </Grid>

//               </Grid>
//                 <div className="reg__btn" style={{margin: "auto", display: "flex"}}>
//                   {loading === true ? (
//                     <Button type="submit" disabled variant="contained">
//                       <PulseLoader color="#fff" size={10} />
//                     </Button>
//                   ) : (
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       onClick={handleWorkerListCreate}>
//                       Create
//                     </Button>
//                   )}
//                 </div>
//             </div>

//             {/* <Button variant="contained" onClick={handleGrpCreate}>
//               Create
//             </Button> */}
//           </Box>
//         </div>
//       </form>
//     </>
//   );
// };

// export default AddDataForm;

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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { addDoc, collection } from "firebase/firestore";
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
                    Passport Place
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
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
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
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
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
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                    {formik.errors.JobSector && formik.touched.JobSector && (
                      <p className="errors">{formik.errors.JobSector}</p>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    name="PassportNo"
                    label="current mobile No"
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
                    type="text"
                    name="PassportNo"
                    label="mobile Operator"
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
                    type="text"
                    name="PassportNo"
                    label="Flights Provider"
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
                    label="Flight Departure Date"
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
                  <TextField
                    type="date"
                    name="PassportIssueDate"
                    label="Flight Arrival Date"
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
                  <TextField
                    type="text"
                    name="PassportNo"
                    label="Agency Current"
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
                    type="text"
                    name="PassportNo"
                    label="Status"
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
                    type="text"
                    name="PassportNo"
                    label="Doc Status"
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
                    label="visa Expiry Date"
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
                  <TextField
                    type="date"
                    name="PassportIssueDate"
                    label="work Permit Expiry Date"
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
                  <TextField
                    type="text"
                    name="PassportNo"
                    label="Address One"
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
                    type="text"
                    name="PassportNo"
                    label="Address Two"
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
                    type="text"
                    name="PassportNo"
                    label="State"
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
                    type="text"
                    name="PassportNo"
                    label="District"
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
                    type="text"
                    name="PassportNo"
                    label="postal code"
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
                    type="text"
                    name="PassportNo"
                    label="Country Origin"
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
                    type="text"
                    name="PassportNo"
                    label="Recruitment status"
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
                    type="text"
                    name="PassportNo"
                    label="Registered Date"
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
                    type="text"
                    name="PassportNo"
                    label="Registered By Agency"
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
                    type="text"
                    name="PassportNo"
                    label="Absconded"
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
                    type="text"
                    name="PassportNo"
                    label="Your Referral Code"
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
                    type="text"
                    name="PassportNo"
                    label="Referral Code By"
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
                    type="text"
                    name="PassportNo"
                    label="Referral Name By"
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
                    type="text"
                    name="PassportNo"
                    label="Skills"
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
                    type="text"
                    name="PassportNo"
                    label="OneCALL Mobile "
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
                    type="text"
                    name="PassportNo"
                    label="Agent Code"
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
