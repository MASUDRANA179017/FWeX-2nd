import * as Yup from "yup";

export const signUp = Yup.object({
  fullname: Yup.string().min(2).max(15).required("Please enter your full name"),
  address: Yup.string().min(5).max(50).required("Please enter your address"),
  phoneNumber: Yup.string().min(5).max(50).required("Please enter Phone Number"),
  roleName: Yup.string().min(5).max(10).required("Please enter role Name"),
  Country: Yup.string().min(5).max(10).required("Please enter Country name"),
  email: Yup.string()
    .email()
    .min(8)
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "password must match"),
});
// .matches(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
//   "please use spacial charecter"
// )
export const signIn = Yup.object({
  email: Yup.string()
    .email()
    .min(8)
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
});

export const adduservalidation = Yup.object({
  AgencyFullName: Yup.string().min(4).max(15).required("please enter your Agency full name"),
  AgencySurName: Yup.string().min(4).max(15).required("please enter your Sur Name"),
  Gender: Yup.string().required("Select your Gender "),
  BirthDate: Yup.string().min(4).max(15).required("please enter Birth Date"),
  BirthPlace: Yup.string().min(4).max(15).required("please enter Birth Place"),
  Nationality: Yup.string().min(4).max(20).required("please enter Nationality"),
  PassportNo: Yup.string().min(4).max(20).required("please enter Passport No"),
  PassportIssueDate: Yup.string().min(4).max(15).required("please enter Passport Issue Date"),
  PassportPlace: Yup.string().min(4).max(15).required("please select Passport Issue Place"),
  
  // PassportExpiry: Yup.string().min(4).max(15).required("please enter Passport Issue Date"),
  JobSector: Yup.string().min(4).max(15).required("please enter Job Sector"),
  // MaritalStatus: Yup.string().min(4).max(15).required("please enter Passport Marital Status"),
  // CurrentmobileNo: Yup.string().min(4).max(15).required("please enter Current Mobile No"),
  // Docstatus: Yup.string().min(4).max(15).required("please enter Current Mobile No"),
  // CountryOrigin: Yup.string().min(4).max(15).required("please Select  CountryOrigin"),
  // RegisteredDate: Yup.string().min(4).max(15).required("please enter Registered Date"),
  // RegisteredByAgency: Yup.string().min(4).max(15).required("please enter Registered By Agency"),
  // Photo: Yup.string().min(4).max(15).required("please Input your Photo"),


})