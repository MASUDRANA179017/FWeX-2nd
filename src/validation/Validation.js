import * as Yup from "yup";

export const signUp = Yup.object({
  fullname: Yup.string().min(2).max(15).required("Please enter your full name"),
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
  BirthDate: Yup.string().min(4).max(15).required("please enter your Birth Date"),
  // Date: Yup.string().min(4).max(15).required("please enter Date"),
  // BirthPlace: Yup.string().min(4).max(15).required("Select your Birth Place"),
  // Nationality: Yup.string().min(4).max(15).required("Select Your Nationality"),
  // PassportNo: Yup.string().min(4).max(15).required("please enter your Passport No"),
  // PassportIssueDate: Yup.string().min(4).max(15).required("please Select your Passport Issue Date"),
  // passportissuePlace: Yup.string().min(4).max(15).required("Select your passport issue Place"),
  // passportExpiry: Yup.string().required("Select your Passport Expiry Date"),
  // JobSector: Yup.string().min(2).max(15).required("Select your Job Sector"),
  // MaritalStatus: Yup.string().required("Select your Status"),
  // CurrentMobileNo: Yup.string().min(4).max(15).required("please enter your Current Mobile No"),
  // MobileOperator: Yup.string().required("please Enter your Operator Name"),
  // FlightsProvider: Yup.string().min(4).max(15).required("please enter your Flights Provider Name"),
  // FlightDepartureDate: Yup.string().required("Select Flight Departure Date"),
  // FlightArrivalDate: Yup.string().required("Select Flight Arrival Date"),
  // AgencyCurrent: Yup.string().min(4).max(25).required("please enter your Agency name"),
  // Status: Yup.string().required("please Select user Status"),
  // DocStatus: Yup.string().min(4).max(15).required("please Select Doc Status"),
  // VisaExpiryDate: Yup.string().min(4).max(15).required("Select your Visa Expiry Date"),
  // WorkPermitExpiryDate: Yup.string().min(4).max(15).required("please Select your Work Permit Expiry Date"),
  // Address1: Yup.string().min(4).max(15).required("please enter your Address"),
  // District: Yup.string().min(4).max(15).required("please enter your District name"),
  // Skills: Yup.string().min(4).max(15).required("please enter your Skills"),

})