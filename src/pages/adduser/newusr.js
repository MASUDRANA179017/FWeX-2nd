import React from "react";
import "./user.css"
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { adduser } from "../../validation/validation";

const onSubmit =()=>{
    console.log("Submited data");
}

const Newusr = () => {
  const {values, errors, touched, handleBlur,initialValues, handleChange} = useFormik({
    initialValues: {
      email: "",
      age: "",
      name: "",
    },
    validationSchema: adduser,
    onSubmit,
  });

  console.log(errors);

  return (
    <div>
      <h1>My Form</h1>
      <form autoComplete="off">
        <label htmlFor= "name">Name</label>
        <input
        value={values.name}
        onChange={handleChange}
        id="name"
        type="text"
        placeholder="Enter your Name"
        onBlur={handleBlur}
        className={errors.name && touched.name ? "input data" : ""}
        />
        {errors.name && touched.name &&<p className="errors">{errors.name}</p>}
      </form>
    </div>
  );
};

export default Newusr;
