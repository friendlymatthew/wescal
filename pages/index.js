import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import EventCard from "../components/eventCard";
import {
  IconButton,
  Box,
  Grid,
  Paper,
  Typography,
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

export default function Home() {
  const today = new Date();
  let dayIdx = today.getDay();

  var endmonth = today.getUTCMonth() + 1; //months from 1-12
  var endday = today.getUTCDate();
  var endyear = today.getUTCFullYear();
  let todayDate = toMonth[endmonth] + " " + endday + ", " + endyear;

  const [events, setEvents] = useState([]);

  const getAll = () => {
    axios
      .get("http://localhost:5001/api/v1/all")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getUndergrad = () => {
    axios
      .get("http://localhost:5001/api/v1/all/undergrad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getGls = () => {
    axios
      .get("http://localhost:5001/api/v1/all/gls")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getGraduate = () => {
    axios
      .get("http://localhost:5001/api/v1/all/grad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getDepartment = () => {
    axios
      .get("http://localhost:5001/api/v1/all/department")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
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
        <IconButton>
          <FingerprintIcon style={{color: "#000000", fontSize: 40 }} />
        </IconButton>
        </span>
      </section>

      <section>
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <div>
              <Typography variant="h6">Filter by</Typography>
              <Box
                align="center"
                style={{
                  maxWidth: "600px",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <Button onClick={getAll}>All</Button>
                <Button onClick={getUndergrad}>Undergrad</Button>
                <Button onClick={getGraduate}>Grad</Button>
                <Button onClick={getGls}>BLS</Button>
                <Button onClick={getDepartment}>Departments</Button>
              </Box>
            </div>

            <Typography
              variant="h6"
              style={{ marginTop: "20px", marginBottom: "0px" }}
            >
              Today is {numToDay[dayIdx]}, {todayDate}
            </Typography>

            <Typography
              variant="h6"
              style={{ marginTop: "", marginBottom: "20px" }}
            >
              Learn more about today
            </Typography>

            <React.Fragment>
              {events.map((events) => {
                return (
                  <EventCard
                    start={events.start}
                    end={events.end}
                    eventDesc={events.eventDesc}
                    url={events.url}
                    style={{ marginBottom: "30px" }}
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
