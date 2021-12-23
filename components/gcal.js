let gapi = window.gapi;
let CLIENT_ID =
  "749312690180-8iog9f2dgom2imn7tpv4hk8i9a1lontt.apps.googleusercontent.com";
let API_KEY = "AIzaSyAJKaii5QAKQmHCFnExd0n_oxZkmNdD7QU";
let DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

let SCOPES = "https://www.googleapis.com/auth/calendar.events";

//export a function that gets start time(date picker), location, name
export const addCalendarEvent = (startTime, address, clientName) => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });

    gapi.client.load("calendar", "v3");
    //time zone list:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    let timeZone = "Asia/Jerusalem";
    let duration = "00:30:00"; //duration of each event, here 30 minuts

    //event start time - im passing datepicker time, and making it match      //with the duration time, you can just put iso strings:
    //2020-06-28T09:00:00-07:00'

    let startDate = new Date(timeString);
    let msDuration =
      (Number(duration.split(":")[0]) * 60 * 60 +
        Number(duration.split(":")[1]) * 60 +
        Number(duration.split(":")[2])) *
      1000;
    let endDate = new Date(startDate.getTime() + msDuration);
    let isoStartDate = new Date(
      startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split(".")[0];
    let isoEndDate = new Date(
      endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split(".")[0];

    //sign in with pop up window
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        let event = {
          summary: clientName, // or event name
          start: {
            dateTime: isoStartDate,
            timeZone: timeZone,
          },
          end: {
            dateTime: isoEndDate,
            timeZone: timeZone,
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
          reminders: {
            useDefault: false,
            overrides: [{ method: "popup", minutes: 20 }],
          },
        };

        //if you need to list your events than keep it
        gapi.client.calendar.events
          .list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            const events = response.result.items;
            console.log("EVENTS: ", events);
          });

        //end of event listing

        let request = gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
        });

        request.execute((event) => {
          console.log(event);
          window.open(event.htmlLink);
        });
      });
  });
};
