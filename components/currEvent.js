import React, { useState, useEffect } from "react";

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

export default function EventCard(props) {
  var start = new Date(Date.parse(props.start));
  let startDay = numToDay[start.getDay()];
  var startmonth = start.getUTCMonth() + 1; //months from 1-12
  var startday = start.getUTCDate();
  var startyear = start.getUTCFullYear();
  let startDate = toMonth[startmonth] + " " + startday + ", " + startyear;

  let end = new Date(Date.parse(props.end));
  let endDay = numToDay[end.getDay()];
  var endmonth = end.getUTCMonth() + 1; //months from 1-12
  var endday = end.getUTCDate();
  var endyear = end.getUTCFullYear();
  let endDate = toMonth[endmonth] + " " + endday + ", " + endyear;

  let duration = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
  let remaining = Math.ceil(Math.abs(end - new Date()) / (1000 * 60 * 60 * 24));

  useEffect(() => {}, []);

  return (
    <button className="mb-10 sm:w-screen md:w-[32rem] lg:w-[32rem] grid grid-cols-1 place-items-start rounded-lg group bg-gradient-to-br hover:bg-gradient-to-br hover:to-orange-400 from-orange-400 hover:from-rose-400 to-rose-400 transition ease-in duration-300 p-4 ">
      
      
      {props.end === null ? (
        <p className="text-black text-opacity-80 font-medium  mb-1 mb-4">
          {startDay}, {startDate}
        </p>
      ) : (
        <div >
          <p className="text-black text-opacity-80 font-medium  mb-1">
            {startDay}, {startDate} - {endDay}, {endDate}
          </p>
          <p className="text-black text-opacity-80 font-medium grid grid-cols-1 place-items-start ">
            {duration === 1 ? (
              <div className="">Duration: {duration} day</div>
            ) : (
              <div className="">Duration: {duration} days</div>
            )}
          </p>
        </div>
      )}

      <h1 className="text-3xl font-extrabold text-black mt-6 group-hover:scale-125 group-hover:translate-x-6 transition ease-in duration-300">
        {props.eventDesc}
      </h1>
      <div className="text-lg text-black text-opacity-0 group-hover:text-opacity-80 transition duration-300 ease-in-out my-2 group-hover:my-6">
        This event is currently happening
      </div>

      <h1 className="text-black text-opacity-80 font-medium mb-4">
        {remaining == 1 ? (
          <div> There is {remaining} day remaining </div>
        ) : (
          <div> There are {remaining} days remaining </div>
        )}
      </h1>
      
      
    </button>
  );
}
