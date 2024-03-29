import React from "react";
import SignUp from "./pages/registration";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/login";

import RootLayout from "./component/Rootlayout";
import Notloggedinuser from "./Privaterouter/Notloggedinuser";
import Loggedinuser from "./Privaterouter/Loggedinuser";
import Forgotpassword from "./pages/forgotpassword";
import Addusers from "./pages/adduser/adduser";
import EditUserdata from "./pages/adduser/Edituserdata";
import UsersTable from "./pages/adduser";
import UpdateUser from "./pages/adduser/UpdateUser";
import Deshbord from "./pages/Deshbord";
import Homepage from "./pages/webpage/home";
import About from "./pages/webpage/about";
import AddAccess from "./component/access";
import EmployeDeshbord from "./pages/Deshbord/employee";
import EmployeeList from "./component/workers";
import AdddataForm from "./component/workers/form";
import Useraddform from "./component/access/Useraddform";
import AllProfile from "./component/AllProfile/AllProfile";
import SingleProfilePage from "./component/SingleProfile";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route element={<Loggedinuser />}>
          <Route element={<RootLayout />}>
            <Route path="/deshbord" element={<Deshbord />}></Route>
            <Route path="/allprofile" element={<AllProfile />}></Route>
            <Route path="/singleprofile" element={<SingleProfilePage />}></Route>
            <Route path="/userlist" element={<UsersTable />} />
            <Route path="/adduser" element={<Addusers />} />
            <Route path="/edituser" element={<EditUserdata />} />
            <Route path="/addlead" element={<UsersTable />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/access" element={<AddAccess />} />
            <Route path="/employedeshbord" element={<EmployeDeshbord />} />
            <Route path="/employee" element={<EmployeeList />} />
            <Route path="/Adddataform" element={<AdddataForm />} />
            <Route path="/adduseracess" element={<Useraddform />} />
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
