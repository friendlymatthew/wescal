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

  const [daysTill, setDaysTill] = useState("");

  const handleDays = () => {
    let now = new Date();
    var nowmonth = now.getUTCMonth() + 1; //months from 1-12
    var nowday = now.getUTCDate();
    var nowyear = now.getUTCFullYear();
    let nowDate = toMonth[nowmonth] + " " + nowday + ", " + nowyear;

    console.log(now.getTime());
    console.log(start.getTime());
    console.log(start.getTime() - now.getTime());

    if (startDate === nowDate) {
      setDaysTill("This event is today");
    } else if (now.getTime() > start.getTime()) {
      setDaysTill("This event has passed");
    } else {
      let diffDay = Math.ceil(Math.abs(start - now) / (1000 * 60 * 60 * 24));

      if (diffDay === 1) {
        setDaysTill(`This event starts tomorrow`);
      } else {
        setDaysTill(`This event starts in ${diffDay} days`);
      }
    }
  };

  useEffect(() => {
    handleDays();
  }, []);

  return (
    <button className="mb-14 sm:w-screen md:w-[32rem] lg:w-[32rem] rounded-lg group bg-base-200 ">
      <div className="grid grid-cols-1 place-items-start py-6 px-4 ">
        {props.end === null ? (
          <p style={{textAlign: "start"}} className="text-black text-opacity-80 font-medium">
            {startDay}, {startDate}
          </p>
        ) : (
          <div>
            <p style={{textAlign: "start"}} className="text-black text-opacity-80 font-medium  grid grid-cols-1 place-items-start mb-1">
              {startDay}, {startDate} - {endDay}, {endDate}
            </p>
            <p className="text-black text-opacity-80 font-medium grid grid-cols-1 place-items-start ">
              {duration === 1 ? (
                <div>Duration: {duration} day</div>
              ) : (
                <div>Duration: {duration} days</div>
              )}
            </p>
          </div>
        )}

        <div style={{ textAlign: "start" }}className="text-3xl font-extrabold text-black my-4 group-hover:scale-105 group-hover:translate-x-2 transition ease-in duration-300">
          {props.eventDesc}
        </div>


        <div>
          <h1 className="text-black text-opacity-80 font-medium mb-4">
            <div>{daysTill}</div>
          </h1>
        </div>
      </div>
      <div className="h-6 bg-gradient-to-r rounded-b-lg hover:bg-gradient-to-br hover:to-orange-400 from-orange-400 hover:from-rose-400 to-rose-400 transition ease-in duration-300">

      </div>
    </button>
  );
}
