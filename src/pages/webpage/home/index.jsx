import { Box, Button, Container } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import "./home.css";
import TopBar from "../../../component/topbar/Topbar";
import HomeSvg from "../../../svg/HomeSvg";
import AmbasySvg from "../../../svg/Ambasy";
import RecruitmentAgentSVG from "../../../svg/RecruitmentAgent";
import EmployeeSvg from "../../../svg/Employee";
import WorkerSvg from "../../../svg/WorkerSVG";




function Homepage() {
  const post = [
    {
      userId: 1,
    },
    {
      userId: 2,
    },
  ];
  return (
    <>
      <TopBar />

      <Container>
        <Grid container>
          <Grid item xs={6} id="home">
            <Box className="Box">
              <div className="title">
                <h2 >What is FWeX</h2>
                <p>
                  FWeX is built on top of a FinTech platform which provides
                  conveniences to foreign workers & strives to take care of
                  their welfare after their arrival to Malaysia. FWeX will
                  provide a summary of correlated data views of foreign workers
                  employment, attendance data and remittance behavior in
                  relation to their location of workplace
                </p>
                <div className="btnbox">
                  <Button size="small">Read More ...</Button>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className="Image">
              <HomeSvg />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box className="Box">
              <div className="stakeholders">
                <h2>How would FWeX help stakeholders?</h2>
                <p>
                  Important for us to maintain the image and credibility of the
                  country without compromising the welfare and rights of workers
                  as recommended by the International Labour Organization.
                </p>
              </div>
            </Box>
          </Grid>

          <div className="section1">
            <Grid item xs={4}>
              <div className="Image">
                <AmbasySvg />
              </div>
            </Grid>

            <Grid item xs={8}>
              <Box className="sectionBox">
                <div className="title">
                  <h2>Regulators or Embassies</h2>
                  <p>
                    A platform for agencies to gather additional data for
                    continuous monitoring & policy enhancement. Can use the
                    system to detect likely issues in which industry and take
                    remedial action before the issue escalated. Stakeholders can
                    use the platform to reach the workers either for general
                    announcement or specific message for relevant groups of
                    workers.
                  </p>
                </div>
              </Box>
            </Grid>
          </div>
          <div className="section1">
            <Grid item xs={4}>
              <div className="Image">
                <RecruitmentAgentSVG />
              </div>
            </Grid>

            <Grid item xs={8}>
              <Box className="sectionBox">
                <div className="title">
                  <h2>Recruitment agencies</h2>
                  <p>
                    A digital platform to manage the workers database and
                    monitor status / validity of their work permit , passport
                    and work / employment history. System will provide them a
                    communication channel to reach workers and a mechanism to
                    monitor work related issues when it arises.
                  </p>
                </div>
              </Box>
            </Grid>
          </div>
          <div className="section1">
            <Grid item xs={4}>
              <div className="Image">
                <EmployeeSvg />
              </div>
            </Grid>

            <Grid item xs={8}>
              <Box className="sectionBox">
                <div className="title">
                  <h2>Employers</h2>
                  <p>
                    Provide a portal to allow employers to track FW recruitment
                    status from the origin country , starting from selection of
                    candidates , bio data of workers, interview session ,
                    medical report and flight information . Beside that , the
                    FinTech platform which is tailored to suit FW, which covers
                    mobile data bundled with prepaid Mastercard for ePayroll, e
                    remittance and attendance tracking module.
                  </p>
                </div>
              </Box>
            </Grid>
          </div>

          <Grid item xs={12}>
            <div className="ProcesService">
              <img
                src="./assetes/home/process-sercive.png"
                alt="process sercive"
              />
            </div>
          </Grid>

          <div className="section1">
            <Grid item xs={4}>
              <div className="Image">
                <WorkerSvg />
              </div>
            </Grid>

            <Grid item xs={8}>
              <Box className="sectionBox">
                <div className="title">
                  <h2>Workers</h2>
                  <p>
                    An infrastructure which will allow workers to focus on work
                    & provide a conducive environment which will bring benefits
                    to the nation’s economy.
                  </p>
                </div>
              </Box>
            </Grid>
          </div>

          <Grid>
            <div className="newspost">
              <div className="post">
                {/* <JobPage /> */}
              </div>
              <div className="post"></div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Homepage;
