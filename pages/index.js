import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import CurrEventComponent from "../components/currEvent";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import ReactGA from "react-ga";

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
  const [currEvents, setCurrEvents] = useState([]);
  const [audience, setAudience] = useState("");

  const getAll = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setCurrEvents([]);

    setAudience("Calendar");
  };

  const getUndergrad = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/currundergrad")
      .then((response) => {
        setCurrEvents(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/undergrad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Undergraduate Calendar");
  };

  const getGraduate = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/currgrad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/grad")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Graduate Calendar");
  };

  const getDepartment = () => {
    axios
      .get(
        "https://safe-lowlands-86945.herokuapp.com/api/v1/all/currdepartment"
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/department")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Faculty Calendar");
  };

  const getBreak = () => {
    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/breaks")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://safe-lowlands-86945.herokuapp.com/api/v1/all/currbreaks")
      .then((response) => {
        setCurrEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("When Will I Be Free?");
  };

  const getSpring2020 = () => {
    axios
      .get(
        "https://safe-lowlands-86945.herokuapp.com/api/v1/archive/spring2022"
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setCurrEvents([]);

    setAudience("Spring 2022 Academic Calendar");
  };

  useEffect(() => {
    getUndergrad();
    ReactGA.initialize("UA-216065461-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

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
                <div className="mb-10 lg:mb-4">Welcome to WesCalendar</div>
                <div>
                  Today is {numToDay[dayIdx]}, {todayDate}
                </div>
              </p>
            </span>
            <span>
              <a
                href="https://github.com/matthewkim0/wescal"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-500 transform hover:scale-125 transition ease-out duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </a>
            </span>
          </section>
        </Grid>

        <Grid item xs={12} align="center">
          <section className="shadow-xl space-x-6 rounded-3xl container border-2 bg-primary p-2 max-w-2xl">
            <div className="dropdown dropdown-hover">
              <div
                onClick={getAll}
                tabIndex="0"
                className="m-1 text-white bg-primary hover:opacity-90 font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
              >
                All
              </div>
              <ul
                tabIndex="0"
                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={getSpring2020} style={{ textAlign: "left" }}>
                    Spring 2022
                  </a>
                </li>
              </ul>
            </div>

            <button
              className="text-white bg-primary hover:opacity-90 font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
              onClick={getUndergrad}
            >
              Undergraduate
            </button>

            <button
              className="text-white bg-primary hover:opacity-90 font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
              onClick={getGraduate}
            >
              Graduate
            </button>

            <button
              className="text-white bg-primary hover:opacity-90 font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
              onClick={getDepartment}
            >
              Faculty
            </button>

            <button
              className="text-white bg-primary hover:opacity-90 font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
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
            {currEvents.map((events) => {
              return (
                <CurrEventComponent
                  key={events.eventDesc}
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

        <Grid item xs={12} align="center">
          <React.Fragment>
            {events.map((events) => {
              return (
                <EventComponent
                  key={events.eventDesc}
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

        <Grid item xs={12}>
          <footer className="p-10 footer bg-indigo-500 text-primary-content footer-center">
            <div>
              <div className="flex mb-5">
                <div className="text-white text-lg font-bold mr-4">
                  Made with
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-ping"
                  fill="currentColor"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              <p className="font-bold">WesCalendar</p>
              <p>Copyright © 2021 - All left reserved</p>
            </div>
            <div>
              <div className="grid grid-flow-col gap-4">
                <a
                  href="mailto:mkim04@wesleyan.edu"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white transform hover:scale-125 transition ease-out duration-300"
                    fill="none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/matthewkim0/wescal"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white transform hover:scale-125 transition ease-out duration-300"
                    fill="none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/watch?v=L_LUpnjgPso"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}
