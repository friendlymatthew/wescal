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

const numToDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default function NavigationBar() {
  let today = new Date();
  const dayIdx = today.getDay();

  var endmonth = today.getUTCMonth() + 1; //months from 1-12
  var endday = today.getUTCDate();
  var endyear = today.getUTCFullYear();
  let todayDate = toMonth[endmonth] + " " + endday + ", " + endyear;

  return (
    <nav className="grid sm:grid-rows-2 md:grid-rows-1 lg:grid-rows-1 bg-white backdrop-filter backdrop-blur-lg min-w-md">
      <div className="flex flex-wrap items-center justify-around h-16">
        <button className="text-4xl  bg-gradient-to-r hover:from-rose-400 from-orange-400 hover:to-orange-400 transition ease-in duration-300 to-rose-400 font-extrabold text-transparent bg-clip-text bg-gradient-to-br ">
          WesCalendar
        </button>
        <div className="text-base-content text-xl font-semibold">
          {numToDay[dayIdx]}, {todayDate}
        </div>
      </div>
    </nav>
  );
}
