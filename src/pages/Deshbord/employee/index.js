import React from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import EmpListing from "./EmpListing";
import BarChart from "../../../component/charts/overview/barchart";
import Ranaapexchart from "../../../component/charts/overview/Ranaapexcharts";
import AddDataForm from "../../../component/Datafile/form";

const EmployeDeshbord = () => {
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
          <Grid item xs={6}>
            <Ranaapexchart />
          </Grid>
          <Grid item xs={6}>
            <BarChart />
          </Grid>
          {/* <Grid item xs={12}>
            <AddDataForm />
          </Grid> */}

         
        </Grid>
      </div>

    </>
  );
};

export default EmployeDeshbord;
