import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/eventCard";
import {
  IconButton,
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const numToDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const toMonth = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const eventPalette = {
  1: "#3c69e7",
  2: "#B892FF",
  3: "#6E44FF",
  4: "#FFC2E2",
  5: "#0B6E4F",
  6: "#DBAD6A",
  7: "#6D72C3",
  8: "#514F59",
};


const useStyles = makeStyles({
  button: {
    color: "#000000",
    "&:hover": {
      color: "#3c69e7",
    },
  },
});


function Event({event}) {



  return (
    <div>

    </div>
  )
}


export default function Home() {
  const classes = useStyles();

  const today = new Date();
  let dayIdx = today.getDay();

  var endmonth = today.getUTCMonth() + 1; //months from 1-12
  var endday = today.getUTCDate();
  var endyear = today.getUTCFullYear();
  let todayDate = toMonth[endmonth] + " " + endday + ", " + endyear;

  const [events, setEvents] = useState([]);
  const [todayFact, setTodayFact] = useState([]);
  const [audience, setAudience] = useState("");

  const getAll = () => {
    axios
      .get("http://localhost:5001/api/v1/all")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("All Events");
  };

  const getUndergrad = () => {
    axios
      .get("http://localhost:5001/api/v1/all/undergrad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Undergraduate Events");
  };

  const getGls = () => {
    axios
      .get("http://localhost:5001/api/v1/all/gls")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("GLS Events");
  };

  const getGraduate = () => {
    axios
      .get("http://localhost:5001/api/v1/all/grad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Graduate and MA's Events");
  };

  const getDepartment = () => {
    axios
      .get("http://localhost:5001/api/v1/all/department")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Faculty Events");
  };

  const getBreak = () => {
    axios
      .get("http://localhost:5001/api/v1/all/breaks")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Breaks");
  };

  const getToday = () => {
    axios
      .get("http://history.muffinlabs.com/date")
      .then((response) => {
        setTodayFact(response.data.Events);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAll();
    getToday();
  }, []);

  return (
    <div>
      <script
        src="https://apis.google.com/js/api.js"
        type="text/javascript"
      ></script>
      <section
        style={{
          padding: "30px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <span>
          <Typography variant="h3" style={{ display: "inline-block" }}>
            Welcome to WesCal
          </Typography>
        </span>
        <span>
          <a href="https://github.com/matthewkim0/wescal" target="_blank">
            <FingerprintIcon style={{ color: "#000000", fontSize: 50 }} />
          </a>
        </span>
      </section>

      <section>
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography
              variant="h4"
              style={{ marginTop: "10px", marginBottom: "0px" }}
            >
              Today is {numToDay[dayIdx]}, {todayDate}
            </Typography>

            <Typography
              variant="h6"
              style={{
                marginTop: "",
                marginBottom: "20px",
                display: "inline-block",
              }}
            ></Typography>

            <div>
              <Box
                align="center"
                style={{
                  maxWidth: "600px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginBottom: "30px",
                }}
              >
                <Button
                  onClick={getAll}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                  className={classes.button}
                >
                  <Typography style={{ fontWeight: 600 }}>
                    All
                  </Typography>
                </Button>
                <Button
                  onClick={getUndergrad}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                  className={classes.button}
                >
                  <Typography
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Undergrad
                  </Typography>
                </Button>
                <Button
                  onClick={getGraduate}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                  className={classes.button}
                >
                  <Typography style={{ fontWeight: 600 }}>Grad</Typography>
                </Button>
                <Button
                  className={classes.button}
                  onClick={getGls}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                >
                  <Typography style={{ fontWeight: 600 }}>BLS</Typography>
                </Button>
                <Button
                  className={classes.button}
                  onClick={getDepartment}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Faculty</Typography>
                </Button>
                <Button
                  onClick={getBreak}
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                  className={classes.button}
                >
                  <Typography style={{ fontWeight: 600 }}>
                    Jail Break
                  </Typography>
                </Button>
              </Box>
            </div>

            <div style={{ justifyContent: "center" }}>
              <Typography
                variant="h4"
                style={{ fontWeight: 600, marginBottom: "10px" }}
              >
                {audience}
              </Typography>
            </div>

            <React.Fragment>
              {events.map((events) => {
                return (
                  <EventCard
                    start={events.start}
                    end={events.end}
                    eventDesc={events.eventDesc}
                    url={events.url}
                    style={{ marginBottom: "30px" }}
                    undergrad={events.undergrad}
                    gls={events.gls}
                    grad={events.grad}
                    department={events.department}
                    isBreak={events.isBreak}
                  />
                );
              })}
            </React.Fragment>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}
