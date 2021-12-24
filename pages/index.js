import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import { Grid } from "@material-ui/core";

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

  const getSpring2020 = () => {
    axios
      .get(
        "https://safe-lowlands-86945.herokuapp.com/api/v1/archive/spring2022"
      )
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));

    setAudience("Spring 2022 Academic Calendar");
  };

  useEffect(() => {
    getUndergrad();
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
        <section className="space-x-6 rounded-3xl container border-2 bg-indigo-500 p-2 max-w-2xl">
          <div className="dropdown dropdown-hover">
            <div
              onClick={getAll}
              tabIndex="0"
              className="m-1 text-black bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded transform hover:scale-125 transition ease-out duration-300"
            >
              Archive
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
        <footer className="p-10 footer bg-neutral text-neutral-content">
          <a
            href="https://github.com/matthewkim0/wescal"
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <p>Written by Matthew Kim</p>
          </a>
          <div>
            <span className="footer-title">Social</span>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </Grid>
    </Grid>
  );
}
