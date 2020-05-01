import {exp} from "react-native-reanimated";

export default class DateShift {

  constructor() {
    this.today = new Date();
  }
}

// console.log(getLastDayOfLastYear().toDateString());
// today.setDate(new Date().getDate());


// _isLeapYear(today);
// console.log(_isLeapYear(new Date(today.setFullYear('2000'))));
// console.log(_isLeapYear(new Date(today.setFullYear('2001'))));
// console.log(_isLeapYear(new Date(today.setFullYear('2016'))));
// console.log(_isLeapYear(new Date(today.setFullYear('2024'))));
// console.log(_isLeapYear(new Date(today.setFullYear('2022'))));
// console.log(_isLeapYear(new Date(today.setFullYear('1904'))));


// The year 2000 is a leap year
// The year 2001 is not a leap year
// The year 2016 is a leap year
// The year 2024 is a leap year
// The year 2022 is not a leap year
// The year 1904 is a leap year



function _isLeapYear(date){
  const year = date.getFullYear();
  if (year % 4 === 0 && year % 100 !== 0  ) {
    return  true
  } else {
    return year % 400 === 0;
  }
}

function _getDaysOfMonth(date) {
  const month = date.getMonth();
  switch (month) {
    case 1:
      if (_isLeapYear(date)){
        return 29
      }else {
        return 28
      }
    case 3:
      return 30;
    case 5:
      return 30;
    case 8:
      return 30;
    case 10:
      return 30;
    default:
      return 31
  }
}

export function yesterday() {
  const date= new Date();
  date.setDate( date.getDate() - 1 );
  return date
}

export function firstDayOfThisWeek() {
  const date= new Date();
  date.setDate(date.getDate() - date.getDay() + 1);
  return date;
}

export function lastDayOfThisWeek() {
  const date= new Date();
  date.setDate(date.getDate() - date.getDay() + 7);
  return date;
}

export function firstDayOfLastWeek() {
  const date= new Date();
  date.setDate(date.getDate() - (date.getDay() + 6));
  return date;
}

export function lastDayOfLastWeek() {
  const date= new Date();
  date.setDate(date.getDate() - date.getDay());
  return date;
}

export function firstDayOfThisMonth() {
  const date= new Date();
  date.setDate(1);
  return date;
}

export function lastDayOfThisMonth() {
  const date= new Date();
  const daysOfMonth =  _getDaysOfMonth(date);
  date.setDate(daysOfMonth);
  return date;
}

export function firstDayOfLastMonth() {
  const date= new Date();
  date.setMonth(date.getMonth()-1, 1);
  return date;
}

export function lastDayOfLastMonth() {
  const date= new Date();
  date.setMonth(date.getMonth() - 1);
  const daysOfMonth =  _getDaysOfMonth(date);
  date.setDate(daysOfMonth);
  return date;
}

export function firstDayOfThisYear() {
  const date= new Date();
  date.setMonth(0,1);
  return date;
}

export function lastDayOfThisYear() {
  const date= new Date();
  date.setMonth(11, 31);
  return date;
}

export function firstDayOfLastYear() {
  const date= new Date();
  const lastYear = date.getFullYear() - 1;
  date.setFullYear(lastYear, 0, 1);
  return date;
}

export function lastDayOfLastYear() {
  const date= new Date();
  const lastYear = date.getFullYear() - 1;
  date.setFullYear(lastYear, 11, 31);
  return date;
}
