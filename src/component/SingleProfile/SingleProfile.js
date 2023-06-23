import React, { useEffect, useState } from "react";
import "./Style.css";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Tabs } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";

const Profile = () => {
  const user = useSelector((users) => users.login.loggedIn);

  const db = getDatabase();
  const [mygrps, setMygrps] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let mygrpArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().id) {
          mygrpArr.push({ ...item.val(), id: item.key });
        }
      });
    });
  }, []);

  return (
    <>
      <div className="profilepage">
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12}>
            <div className="container ">
              <div className="row d-flex justify-content-center">
                <div className="col-md-7">
                  <div className="card">
                    <Grid container>
                      <Grid item xs={4}>
                        <div className="profileimg">
                          <picture>
                            <img src={user.photoURL} alt="profilepic" />
                          </picture>
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div className="profile_text ">
                          <h2>Full Name: {user.fullname}</h2>
                          <h4> Email: {user.email}</h4>
                          <h5> Created Date: {user.createdAt}</h5>

                          <h4>Phone Number: {user.phoneNumber}</h4>
                          <div>
                            <p className="byodata">
                              Consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut
                              enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo
                              consequat.{" "}
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
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
