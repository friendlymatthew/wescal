import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import CurrEventComponent from "../components/currEvent";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import ReactGA from "react-ga";
import Footer from "../components/footer"

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

export async function getServerSideProps() {
  const res = await fetch(
    "https://safe-lowlands-86945.herokuapp.com/api/v1/all/undergrad"
  );

  const currres = await fetch(
    "https://safe-lowlands-86945.herokuapp.com/api/v1/all/undergrad"
  );

  const initdata = await res.json();
  const currdata = await currres.json();

  return {
    props: {
      initdata,
      currdata,
    },
  };

}

export default function Home({ initdata, currdata }) {
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

  const datastring = JSON.stringify(currdata);

  useEffect(() => {
    setEvents(initdata)
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

        <Grid item xs={1} md={0}></Grid>
        <Grid item xs={10} md={12} container spacing={0}>
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
        </Grid>
        <Grid item xs={1} md={12}></Grid>

        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}
