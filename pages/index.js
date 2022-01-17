import React, { useEffect, useState } from "react";
import axios from "axios";
import EventComponent from "../components/event";
import CurrEventComponent from "../components/currEvent";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import ReactGA from "react-ga";
import Footer from "../components/footer";
import TopBar from "../components/topBar";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

export async function getStaticProps() {
  const currdepartmentfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/currdepartment"
  );

  const departmentfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/department"
  );

  const spring2022fetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/archive/spring2022"
  );

  const breaksfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/breaks"
  );

  const currbreaksfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/currbreaks"
  );

  const undergradfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/undergrad"
  );

  const currundergradfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/currundergrad"
  );

  const gradfetch = await fetch("https://wescal.herokuapp.com/api/v1/all/grad");

  const currgradfetch = await fetch(
    "https://wescal.herokuapp.com/api/v1/all/currgrad"
  );

  const allfetch = await fetch("https://wescal.herokuapp.com/api/v1/all");

  const currdepartment = await currdepartmentfetch.json();
  const department = await departmentfetch.json();
  const spring2022 = await spring2022fetch.json();
  const breaks = await breaksfetch.json();
  const currbreaks = await currbreaksfetch.json();
  const undergrad = await undergradfetch.json();
  const currundergrad = await currundergradfetch.json();
  const grad = await gradfetch.json();
  const currgrad = await currgradfetch.json();
  const all = await allfetch.json();

  return {
    props: {
      currdepartment,
      department,
      spring2022,
      breaks,
      currbreaks,
      undergrad,
      currundergrad,
      grad,
      currgrad,
      all,
    },
  };
}

export default function Home({
  currdepartment,
  department,
  spring2022,
  breaks,
  currbreaks,
  undergrad,
  currundergrad,
  grad,
  currgrad,
  all,
}) {
  const [events, setEvents] = useState(undergrad);
  const [currEvents, setCurrEvents] = useState(currundergrad);
  const [audience, setAudience] = useState("");

  const handleAll = () => {
    setEvents(all);
    setCurrEvents([]);
    setAudience("All Events");
  };

  const handleUndergrad = () => {
    setEvents(undergrad);
    setCurrEvents(currundergrad);
    setAudience("Undergraduate Events");
  };

  const handleGrad = () => {
    setEvents(grad);
    setCurrEvents(currgrad);
    setAudience("Graduate Events");
  };

  const handleFaculty = () => {
    setEvents(department);
    setCurrEvents(currdepartment);
    setAudience("Faculty Events");
  };

  const handleBreaks = () => {
    setCurrEvents(currbreaks);
    setEvents(breaks);
    setAudience("When will I be free");
  };

  useEffect(() => {
    ReactGA.initialize("UA-216065461-1");
    setAudience("Undergraduate Events");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <html className="bg-brand">
      <TopBar />
      <header className="sticky top-0 z-10">
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
        <NavBar />
        <section className="h-12 grid grid-cols-1 transition bg-white ease-in duration-300 place-items-center">
          <div className="flex flex-wrap space-xs-1 md:space-x-10 lg:space-x-16 sm:justify-center">
            <button
              value="all"
              onClick={handleAll}
              className="p-1 md:p-2 text-sm md:text-lg text-blue-500 md:bg-gradient-to-tl md:from-blue-500 to-blue-600 transition ease-in duration-300 hover:font-semibold hover:scale-105 font-medium md:text-transparent bg-clip-text bg-gradient-to-br"
            >
              All
            </button>
            <button
              onClick={handleUndergrad}
              className="p-1 md:p-2 text-sm md:text-lg text-blue-500 md:bg-gradient-to-tl md:from-blue-500 to-blue-600 transition ease-in duration-300 hover:font-semibold hover:scale-105 font-medium md:text-transparent bg-clip-text bg-gradient-to-br"
            >
              Undergraduate
            </button>
            <button
              onClick={handleGrad}
              className="p-1 md:p-2 text-sm md:text-lg text-blue-500 md:bg-gradient-to-tl md:from-blue-500 to-blue-600 transition ease-in duration-300 hover:font-semibold hover:scale-105 font-medium md:text-transparent bg-clip-text bg-gradient-to-br"
            >
              Graduate
            </button>
            <button
              onClick={handleFaculty}
              className="p-1 md:p-2 text-sm md:text-lg text-blue-500 md:bg-gradient-to-tl md:from-blue-500 to-blue-600 transition ease-in duration-300 hover:font-semibold hover:scale-105 font-medium md:text-transparent bg-clip-text bg-gradient-to-br"
            >
              Faculty
            </button>
            <button
              onClick={handleBreaks}
              className="p-1 md:p-2 text-sm md:text-lg text-blue-500 md:bg-gradient-to-tl md:from-blue-500 to-blue-600 transition ease-in duration-300 hover:font-semibold hover:scale-105 font-medium md:text-transparent bg-clip-text bg-gradient-to-br"
            >
              Breaks
            </button>
          </div>
        </section>
      </header>

      <main className="relative bg-base-100 grid grid-cols-1 place-items-center px-2 ">
        <div
          id="title"
          className="text-4xl pt-12 pb-6 text-black font-bold text-center"
        >
          {audience}
        </div>

        <div className="grid grid-cols-1 place-items-center">
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
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </html>
  );
}
