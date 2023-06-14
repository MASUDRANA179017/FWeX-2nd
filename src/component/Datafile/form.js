import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { adduservalidation } from "../../validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const AddDataForm = () => {
  const [grouptag, setGrouptag] = useState("");
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let initialvalues = {
    AgencyFullName: "",
    fullname: "",
    password: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: adduservalidation,
    onSubmit: () => {
      handleGrpCreate();
    },
  });

  // // creating groups

  // const handleGrpCreate = () => {
  //   setLoading(true);
  //   set(push(ref(db, "groups")), {
  //     groupname: formik.values.fullname,
  //     grouptag: grouptag,
  //     adminname: user.displayName,
  //     adminid: user.uid,
  //     date: `${new Date().getFullYear()} - ${
  //       new Date().getMonth() + 1
  //     } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,
  //   })
  //     .then(() => {
  //       toast.success("data add", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         navigate("/employee");
  //       }, 6500);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       if (error.message.includes("auth/email-already-in-use")) {
  //         toast.error("Email already in use", {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         setLoading(false);
  //       }
  //     });
  // };

  const handleGrpCreate = () => {
    //Form validation

    console.log(set);

    setLoading(true);
    set(push(ref(db, "employee")), {
      adminid: user.uid,
      date: `${new Date().getFullYear()} - ${
        new Date().getMonth() + 1
      } - ${new Date().getDate()} - ${new Date().getHours()} - ${new Date().getMinutes()}`,

      AgencyFullName: formik.values.AgencyFullName,
      AgencySurName: formik.values.AgencySurName,
      Gender: formik.values.Gender,
      BirthDate: formik.values.BirthDate,
    }).then(()=>{
      setLoading(false);
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
        toast.error("Check your data mistake ", {
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
      });
  };

  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="adddataform">
          <Box className="card">
            <div className="group-creattion-form">
              <h2 className="tittle">Create Your Own Groups</h2>
              <Grid container justifyContent={"center"} spacing={2}>
                <Grid item xs={5}>
                  <TextField
                    
                    id="outlined-basic"
                    name="AgencyFullName"
                    label="Agency Full Name"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.AgencyFullName}
                    margin="normal"
                  />
                  {formik.errors.AgencyFullName &&
                    formik.touched.AgencyFullName && (
                      <p className="error__message">
                        {formik.errors.AgencyFullName}
                      </p>
                    )}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="outlined-basic"
                    name="AgencySurName"
                    label="Agency Sur Name"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.AgencySurName}
                    margin="normal"
                  />
                  {formik.errors.AgencySurName &&
                    formik.touched.AgencySurName && (
                      <p className="error__message">
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
                </Grid>
                <Grid item xs={5}>
                  <TextField
                 
                    type="date"
                    name="BirthDate"
                    label="Birth Date"
                    focused
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.BirthDate}
                    margin="normal"
                  />
                  {formik.errors.BirthDate && formik.touched.BirthDate && (
                    <p className="error__message">{formik.errors.BirthDate}</p>
                  )}
                </Grid>

              </Grid>
                <div className="reg__btn" style={{margin: "auto", display: "flex"}}>
                  {loading === true ? (
                    <Button type="submit" disabled variant="contained">
                      <PulseLoader color="#fff" size={10} />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleGrpCreate}>
                      Create
                    </Button>
                  )}
                </div>
            </div>

            {/* <Button variant="contained" onClick={handleGrpCreate}>
              Create
            </Button> */}
          </Box>
        </div>
      </form>
    </>
  );
};

export default AddDataForm;
