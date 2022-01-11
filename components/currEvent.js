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



  useEffect(() => {
  }, []);

  return (
    <div className="group bg-base-200 card hover:bg-opacity-70 sm:max-w-sm text-white lg:max-w-lg p-6 rounded-lg mb-10  transition duration-300 ease-in">
      <div className="group-hover:text-white">
        <div>
          {props.end === null ? (
            <p className=" text-accent font-medium  mb-1 mb-4">
              {startDay}, {startDate}
            </p>
          ) : (
            <div>
              <p className="text-accent font-medium  mb-1">
                {startDay}, {startDate} - {endDay}, {endDate}
              </p>
              <p className="text-accent font-medium inset-0 z-10">
                {duration === 1 ? (
                  <div>Duration: {duration} day</div>
                ) : (
                  <div>Duration: {duration} days</div>
                )}
              </p>
            </div>
          )}

          <h1 className="text-2xl text-white font-semibold mb-3 mt-4">
            {props.eventDesc}
          </h1>
        </div>
      </div>
      
      <div>
          <h1
            className="mt-10 transform group-hover:text-white group-hover:scale-125 transition ease-out duration-300"
          >
            {remaining == 1 ? <div>  There is {remaining} day remaining </div> : <div> There are {remaining} days remaining </div>}
            
          </h1>
      </div>
    </div>
  );
}
