import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import CurrEventComponent from "../components/currEvent";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import ReactGA from "react-ga";
import Footer from "../components/footer";
import Header from "../components/header";




export async function getServerSideProps() {
  const res = await fetch(
    "https://safe-lowlands-86945.herokuapp.com/api/v1/all/undergrad"
  );

  const currres = await fetch(
    "https://safe-lowlands-86945.herokuapp.com/api/v1/all/currundergrad"
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
  

  const [events, setEvents] = useState(initdata);
  const [currEvents, setCurrEvents] = useState(currdata);
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
    ReactGA.initialize("UA-216065461-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <html data-theme="dark">
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

      <div className="grid grid-cols-1 place-items-center">
        
          <Header />  

        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={12} container spacing={0}>
          <Grid item xs={12} align="center">
            <section className="shadow-xl space-x-6 rounded-3xl container bg-primary p-2 max-w-2xl">
              <div className=" dropdown dropdown-hover">
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
            <h1 className="text-primary-content font-bold text-5xl mb-5 my-10">
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
        <Grid item xs={1}></Grid>

        
      </div>
      <footer>
        <Footer />
      </footer>
    </html>
  );
}
