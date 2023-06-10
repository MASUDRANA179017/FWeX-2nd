import React from "react";
import Ranaapexchart from "../../charts/overview/Ranaapexcharts";
import BarChart from "../../charts/overview/barchart";
import EmpListing from "../../../pages/Deshbord/EmpListing";
import { Grid } from "@mui/material";

const UserDashboard = () => {
  return (
    <>
      <div className="pagebox">
        <Grid container>
          <Grid item xs={4}>
            <EmpListing name="Total FW Registered Under Agency" number="2000" />
          </Grid>
          <Grid item xs={4}>
            <EmpListing name="Total Departure" number="500" />
          </Grid>
          <Grid item xs={4}>
            <EmpListing name="Total Arrived in Malaysia" number="50000" />
          </Grid>
          <Grid item xs={12}>
            <BarChart />
          </Grid>
          <Grid item xs={6}>
            <Ranaapexchart />
          </Grid>
          <Grid item xs={6}>
            <Ranaapexchart />
          </Grid>
        </Grid>

      
      </div>
    </>
  );
};

export default UserDashboard;
