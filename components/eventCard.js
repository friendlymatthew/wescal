import React, { useState, useEffect } from "react";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

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

const eventPalette = {
  1: "#3c69e7",
  2: "#B892FF",
  3: "#6E44FF",
  4: "#FFC2E2",
  5: "#0B6E4F",
  6: "#DBAD6A",
  7: "#6D72C3",
  8: "#514F59",
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

  let randColor = Math.floor(Math.random() * (8 - 1) + 1);

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
    handleDays();
  }, []);

  return (
    <Box>
      <Paper
        style={{
          border: "1px solid black",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            align="left"
            style={{ paddingLeft: "20px", paddingTop: "20px" }}
          >
            {props.end === null ? (
              <Typography variant="h6">
                {startDay}, {startDate}
              </Typography>
            ) : (
              <Typography variant="h6" style={{}}>
                <div>
                  {startDay}, {startDate} - {endDay}, {endDate}
                </div>
                {duration === 1 ? (
                  <div>Duration: {duration} day</div>
                ) : (
                  <div>Duration: {duration} days</div>
                )}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} align="center" style={{ padding: "20px" }}>
            <Typography
              variant="h6"
              style={{
                fontWeight: 600,
              }}
            >
              {props.eventDesc}
            </Typography>

            <br />
            <div
              style={{
                display: "flex",
                justifyItems: "space-between"
              }}
            >
              {props.undergrad ? (
                <Chip
                  label="undergrads"
                  style={{ marginLeft: "0.25px", marginRight: "0.25px" }}
                ></Chip>
              ) : (
                <></>
              )}
              {props.gls ? (
                <Chip
                  label="gls"
                  style={{ marginLeft: "0.25px", marginRight: "0.25px" }}
                ></Chip>
              ) : (
                <></>
              )}
              {props.grad ? (
                <Chip
                  label="grads"
                  style={{ marginLeft: "0.25px", marginRight: "0.25px" }}
                ></Chip>
              ) : (
                <></>
              )}
              {props.department ? (
                <Chip
                  label="faculty"
                  style={{ marginLeft: "0.25px", marginRight: "0.25px" }}
                ></Chip>
              ) : (
                <></>
              )}
              {props.isBreak ? (
                <Chip
                  label="break"
                  style={{ marginLeft: "0.25px", marginRight: "0.25px" }}
                ></Chip>
              ) : (
                <></>
              )}
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            align="left"
            style={{
              backgroundColor: eventPalette[randColor],
              padding: "10px 20px 10px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <span>
              <Button
                style={{ textTransform: "none"}}
                startIcon={
                  <QueryBuilderIcon
                    style={{ fontSize: "30px"  }}
                  />
                }
              >
                <Typography variant="h6" style={{ fontWeight: 500 }}>{daysTill}</Typography>
              </Button>
            </span>
            <span>
              <Button>
                <ReportProblemIcon style={{ fontSize: 40 }} />
              </Button>
            </span>


          </Grid>


        </Grid>
      </Paper>
    </Box>
  );
}
