import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { signUp } from "../../validation/Validation";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners";
import { getDatabase, push, ref, set } from "firebase/database";

const Useraddform = () => {
  const [passShow, setPassShow] = useState("password");
  const [confirmpassShow, setConfirmpassShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();

  const handleHideShow = () => {
    if (passShow === "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };
  const handleConfirmHideShow = () => {
    if (confirmpassShow === "password") {
      setConfirmpassShow("text");
    } else {
      setConfirmpassShow("password");
    }
  };

  let initialvalues = {
    email: "",
    fullname: "",
    address: "",
    password: "",
    phoneNumber: "",
    Country: "",
    roleName: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: signUp,
    onSubmit: () => {
      createUser();
    },
  });

  const createUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    ).then( ({ user }) => {
        //TODO: add role
      //   const role = {
      //     uid:user.uid,
      //     roleName: 'noRole'
      //   }
        
      // const userRef = collection(db, "roles");
      // addDoc(userRef, role);

        updateProfile(auth.currentUser, {
          displayName: formik.values.fullname,
        }).then(() => {
          setLoading(true);
          sendEmailVerification(auth.currentUser).then(() => {
            set(ref(db, "users/" + user.uid), {
              companyName: user.displayName,
              email: user.email,
              address: formik.values.address,
              phoneNumber: formik.values.phoneNumber,
              Country: formik.values.Country,
              roleName: formik.values.roleName,
            }).then(() => {
              toast.success("Email has sent", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
              setTimeout(() => {
                navigate("/access");
              }, 6500);
              setLoading(false);
            });
          });
        });
        // setLoading(true);
        // sendEmailVerification(auth.currentUser).then(() => {
        //   set(ref(db, "users"), {
        //     username: formik.values.name,
        //     email: formik.values.email,
        //   });
        //   toast.success("Email has sent", {
        //     position: "top-center",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });
        // });
        // navigate("/login");
        // setLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("Email already in use", {
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
      <div className="signup__form">
        <h1 className="signup__title">Get started with easily register</h1>
        <h4 className="signup__subtitle">Free register and you can enjoy it</h4>
        <ToastContainer />
        <form action="" onSubmit={formik.handleSubmit}>
          <TextField
            type="email"
            id="outlined-basic"
            name="email"
            label="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="signup__error">{formik.errors.email}</p>
          )}
          <TextField
            type="text"
            id="outlined-basic"
            name="fullname"
            label=" Compay Name "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullname}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <p className="signup__error">{formik.errors.fullname}</p>
          )}
          <TextField
            type="text"
            id="outlined-basic"
            name="address"
            label="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.address && formik.touched.address && (
            <p className="signup__error">{formik.errors.address}</p>
          )}
          <TextField
            type="text"
            id="outlined-basic"
            name="phoneNumber"
            label="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className="signup__error">{formik.errors.phoneNumber}</p>
          )}
          <TextField
            type="text"
            id="outlined-basic"
            name="Country"
            label="Country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Country}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.Country && formik.touched.Country && (
            <p className="signup__error">{formik.errors.Country}</p>
          )}
          <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Role Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.roleName}
                      name="roleName"
                      //required="true"
                      label="Role Name">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"agent"}>Agent</MenuItem>
                      <MenuItem value={"employee"}>Employee</MenuItem>
                    </Select>
                    {formik.errors.roleName &&
                      formik.touched.roleName && (
                        <p className="errors">{formik.errors.roleName}</p>
                      )}
                  </FormControl>
          {/* <TextField
            type="text"
            id="outlined-basic"
            name="roleName"
            label="role Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.roleName}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {formik.errors.roleName && formik.touched.roleName && (
            <p className="signup__error">{formik.errors.roleName}</p>
          )} */}
          <div className="password__field">
            <TextField
              type={passShow}
              id="outlined-basic"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <IconButton aria-label="" onClick={handleHideShow}>
              {passShow === "password" ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="signup__error">{formik.errors.password}</p>
          )}
          <div className="password__field">
            <TextField
              type={confirmpassShow}
              id="outlined-basic"
              name="confirm_password"
              label="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <IconButton aria-label="" onClick={handleConfirmHideShow}>
              {confirmpassShow === "password" ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </div>
          {formik.errors.confirm_password &&
            formik.touched.confirm_password && (
              <p className="signup__error">{formik.errors.confirm_password}</p>
            )}
          <div className="reg__btn">
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
          
        </form>
      </div>
    </>
  );
};

export default Useraddform;
