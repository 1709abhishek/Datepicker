import React from "react";

export const showDays = (element, days, ele) => {
  console.log("xxx");
  let counter = 7;
  if (element === 1 && days !== 0) {
    counter = 7 - days;
  }
  if (element === 1 && counter === 7) {
    console.log("hola");
    while (counter > 0) {
      counter--;
      return <td>xxxx</td>;
    }
  }
  if (element === 1 && counter !== 7) {
    for (let i = 1; i <= days; i++) {
      return <td></td>;
    }
  }

  return null;
};
