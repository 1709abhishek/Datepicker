import React from "react";
import moment from "moment";
import { showDays } from "./ShowDays";

const DatePicker = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const [date, setDate] = React.useState("");
  const [days, setDays] = React.useState("");
  const [arr, setArr] = React.useState([]);
  const zeroPad = (value, length) => `${value}`.padStart(length, "0");
  const getMonthFirstDay = (month, year) => {
    return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
  };
  const [firstDay, setFirstDay] = React.useState("");

  const datesCalculator = (dateCurr, ind) => {
    setDate(dateCurr);
    setDays(
      moment(dateCurr.split(" ")[1] + "-" + ind, "YYYY-MM").daysInMonth()
    );
    console.log(
      "*******",
      dateCurr.split(" ")[0] + "-" + dateCurr.split(" ")[1],
      moment(dateCurr.split(" ")[1] + "-" + ind, "YYYY-MM").daysInMonth()
    );
    setFirstDay(getMonthFirstDay(ind, dateCurr.split(" ")[1]));

    console.log(firstDay);
  };

  const handlePreviousDate = (date) => {
    let flag = false;
    let ind = 0;
    months.map((ele, index) => {
      if (ele === date.split(" ")[0]) {
        ind = index;
      }
    });
    if (ind === 0) {
      ind = 12;
      flag = true;
      console.log("&&&&&&", Number(date.split(" ")[1]) - 1);
      setDate(months[ind - 1] + " " + (Number(date.split(" ")[1]) - 1));
    }
    // setDate(months[ind - 1] + " " + date.split(" ")[1]);
    datesCalculator(months[ind - 1] + " " + date.split(" ")[1], ind);
    if (flag) {
      setDate(months[ind - 1] + " " + (Number(date.split(" ")[1]) - 1));
    }
  };

  const handleNextDate = (date) => {
    let flag = false;
    let ind = 0;
    months.map((ele, index) => {
      if (ele === date.split(" ")[0]) {
        ind = index;
      }
    });
    if (ind === 11) {
      ind = -1;
      flag = true;
      console.log("&&&&&&", Number(date.split(" ")[1]) - 1);
      setDate(months[ind - 1] + " " + (Number(date.split(" ")[1]) + 1));
    }
    // setDate(months[ind + 1] + " " + date.split(" ")[1]);
    datesCalculator(months[ind + 1] + " " + date.split(" ")[1], ind + 2);
    if (flag) {
      setDate(months[ind + 1] + " " + (Number(date.split(" ")[1]) + 1));
    }
  };

  React.useEffect(() => {
    const dateCurr = new Date();
    console.log(dateCurr);
    let ind = 0;
    months.map((ele, index) => {
      if (ele === date.split(" ")[0]) {
        ind = index + 1;
      }
    });
    datesCalculator(
      months[Number(dateCurr.getMonth())] + " " + dateCurr.getFullYear(),
      ind
    );
  }, []);

  React.useEffect(() => {
    console.log(date);
    let arrTemp = [];
    let counter = firstDay - 1;
    let res = [];
    for (var i = 0; i < days; i++) {
      // console.log(i);
      let temp = firstDay - 1;
      if (i === 0) {
        while (temp > 0) {
          arrTemp.push(0);
          temp--;
        }
      }

      if (counter !== 0 && counter % 7 === 0) {
        console.log("oh yeah", arrTemp);
        res.push(arrTemp);
        arrTemp = [];
      }

      arrTemp.push(i + 1);

      if (i + 1 === days) {
        // console.log("i+1", days);
        console.log("yes");
        while (arrTemp.length < 7) {
          arrTemp.push(0);
        }
        console.log(arrTemp);
      }

      if (i + 1 === days) {
        console.log("oh yeah", arrTemp);
        res.push(arrTemp);
        arrTemp = [];
      }

      counter++;
    }
    console.log(res);
    setArr(res);
  }, [date, firstDay, days]);

  return (
    <div className="outerBox">
      <div className="titleBar">
        <div className="navigator">
          <button
            className="leftArrow"
            onClick={() => handlePreviousDate(date)}
          ></button>
          <span className="showDate">{date}</span>
          <button
            className="rightArrow"
            onClick={() => handleNextDate(date)}
          ></button>
        </div>
      </div>
      <div>
        <table>
          <thead className="greyColor" bgcolor="lightgrey">
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          <tbody>
            {arr.length !== 0 &&
              arr.map((ele) => {
                // console.log(arr);
                return (
                  <tr>
                    {ele.map((element) =>
                      element === 0 ? <td></td> : <td>{element}</td>
                    )}
                  </tr>
                );
              })}
            {/* return (<div>
                {this.state.people.map((person, index) => (
                    <p key={index}>Hello, {person.name} from {person.country}!</p>
                ))}
                </div>); */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatePicker;
