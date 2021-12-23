import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import {
  Grid,
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



export default function Home() {

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
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("All Events");
  };

  const getUndergrad = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/undergrad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Undergraduate Events");
  };

  const getGls = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/gls")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("GLS Events");
  };

  const getGraduate = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/grad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Graduate and MA's Events");
  };

  const getDepartment = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/department")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Faculty Events");
  };

  const getBreak = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/breaks")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("When Will I Be Free?");
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
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <section
          className="pl-10 py-10 pr-10"
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <span>
            <p className="text-indigo-500 text-3xl font-bold mb-0">
              <div className="mb-1">Welcome to WesCal</div>
              <div>
                Today is {numToDay[dayIdx]}, {todayDate}
              </div>
            </p>
          </span>
          <span>
            <a href="https://github.com/matthewkim0/wescal" target="_blank" rel="noreferrer">
              <FingerprintIcon style={{ color: "#000000", fontSize: 50 }} />
            </a>
          </span>
        </section>
      </Grid>

      <Grid item xs={12} align="center">
        <section className="space-x-6 rounded-3xl container border-2 bg-indigo-500 p-2 max-w-2xl">
          <button
            className=" text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            onClick={getAll}
          >
            All
          </button>

          <button
            className="text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            onClick={getUndergrad}
          >
            Undergraduate
          </button>

          <button
            className="text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            onClick={getGraduate}
          >
            Graduate
          </button>

          <button
            className="text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            onClick={getDepartment}
          >
            Faculty
          </button>

          <button
            className="text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            onClick={getBreak}
          >
            Break
          </button>
        </section>
        <h1 className="text-indigo-500 font-bold text-5xl mb-5 my-10">
            {audience}
        </h1>
      </Grid>

      <Grid item xs={12} align="center">
        <React.Fragment>
          {events.map((events) => {
            return (
              <EventComponent
                start={events.start}
                end={events.end}
                eventDesc={events.eventDesc}
                url={events.url}
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
  );
}
