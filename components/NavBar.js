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
    <nav className="h-auto  md:h-16 grid grid-cols-2 md:grid-cols-2 bg-white backdrop-filter items-center backdrop-blur-lg">
      <button className="text-md md:text-4xl bg-gradient-to-r hover:from-rose-400 from-orange-400 hover:to-orange-400 transition ease-in duration-300 to-rose-400 font-extrabold text-transparent bg-clip-text bg-gradient-to-br ">
        WesCalendar
      </button>
      <div className="text-base-content text-sm md:text-xl ml-0 md:ml-20 font-semibold">
        {numToDay[dayIdx]}, {todayDate}
      </div>
    </nav>
  );
}
