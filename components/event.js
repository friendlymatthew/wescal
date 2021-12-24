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
  const [hglass, setHGlass] = useState(false);

  const handleDays = () => {
    setHGlass(!hglass);
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
    setHGlass(false);
  }, []);

  return (
    <div
      onClick={handleDays}
      className=" border-2 border-gray-200 border-opacity-60 max-w-lg p-6 bg-white rounded-lg mb-10 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in"
    >
      <div>
        {props.end === null ? (
          <p className="text-base font-medium text-indigo-400 mb-1 mb-4">
            {startDay}, {startDate}
          </p>
        ) : (
          <div>
            <p className="text-base font-medium text-indigo-400 mb-1">
              {startDay}, {startDate} - {endDay}, {endDate}
            </p>
            <p className="text-base font-medium text-indigo-400 inset-0 z-10">
              {duration === 1 ? (
                <div>Duration: {duration} day</div>
              ) : (
                <div>Duration: {duration} days</div>
              )}
            </p>
          </div>
        )}

        <h1 className="text-2xl font-semibold mb-3 mt-4">{props.eventDesc}</h1>

        {hglass ? 
        
        <h1 className="mt-8 transform hover:scale-125 transition ease-out duration-300">
            {daysTill}
        </h1> :
        <> </>}
      </div>
    </div>
  );
}
