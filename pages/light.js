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
  
  /**
   * dark mode= dracula
   * lightmode =
   * wireframe=
   * @returns
   */
  
  export default function LightPage() {
    let today = new Date();
  
    const dayIdx = today.getDay();
  
    var endmonth = today.getUTCMonth() + 1; //months from 1-12
    var endday = today.getUTCDate();
    var endyear = today.getUTCFullYear();
    let todayDate = toMonth[endmonth] + " " + endday + ", " + endyear;
  
    return (
      <div className="grid grid-cols-1 w-full place-items-center my-8 ">
        <section className="flex border-b w-full border-primary mb-3 pl-8 justify-start" >
          <div className="flex text-3xl font-bold mb-0 p-4">
            <div className="font- text-black">Wes</div>
            <div className="text-primary-content">Calendar</div>
          </div>
  
          
        </section>
  
        <section>
          <div className="px-4 text-primary-content text-2xl font-bold mt-8">
            Today is {numToDay[dayIdx]}, {todayDate}
          </div>
          
        </section>
      </div>
    );
  }
  