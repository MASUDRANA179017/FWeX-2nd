import React, { useEffect, useState } from "react";
import "./Style.css";
import Grid from "@mui/material/Grid";
import { Avatar, Button } from "@mui/material";
import { Facebook, Instagram, TextFormat } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";

const AllProfile = () => {
  const user = useSelector((users) => users.login.loggedIn);

  const db = getDatabase();
  const [mygrps, setMygrps] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let mygrpArr = [];
      snapshot.forEach((item) => {
        if (user.uid !== item.val().adminid) {
          mygrpArr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrps(mygrpArr);
    });
  }, []);

  return (
    <>
      <div className="profilepage">
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <h1 style={{marginTop: "20px" }}> ALL USER PROFILE & DATA </h1>
          <Grid item xs={12}>
            {mygrps.map((item, i) => (
              <div className="container " key={i}>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-7">
                    <div className="card">
                      <Grid container>
                        
                        <Grid item xs={4}>
                          <div className="profileimg">
                            <img src="https://mui.com/static/images/avatar/2.jpg" />
                          </div>
                         
                        </Grid>
                        <Grid item xs={8}>
                          <div className="profile_text ">
                            <h2>Full Name: {item.companyName}</h2>
                            <h4> Email: {item.email}</h4>
                            <h4>Phone Number: {item.phoneNumber}</h4>
                            <div>
                              <p className="byodata">
                                Consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat.{" "}
                              </p>
                            </div>
                            <ul className="social-list">
                              <li>
                                <Facebook />
                              </li>
                              <li>
                                <Instagram />
                              </li>
                            </ul>
                            <div className="profile_buttons">
                              <Button>Message</Button>
                              <Button>Contact</Button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AllProfile;
