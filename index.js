// Your code here
function createEmployeeRecord(arrNew) {
  let newObj = {
    firstName: arrNew[0],
    familyName: arrNew[1],
    title: arrNew[2],
    payPerHour: arrNew[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return newObj;
}

function createEmployeeRecords(rows) {
  const newRows = JSON.parse(JSON.stringify(rows));

  let newArray = newRows.map((getArrays) => {
    return {
      firstName: getArrays[0],
      familyName: getArrays[1],
      title: getArrays[2],
      payPerHour: getArrays[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  });
  return newArray;
}
function createTimeInEvent(recordsArr, strArg) {
  let [date, time] = strArg.split(" ");
  let eventObj = {
    type: "TimeIn",
    date: date,
    hour: parseInt(time),
  };
  recordsArr.timeInEvents.push(eventObj);
  return recordsArr;
}
function createTimeOutEvent(recordsArr, strArg) {
  let [date, time] = strArg.split(" ");
  let eventObj = {
    type: "TimeOut",
    date: date,
    hour: parseInt(time),
  };
  recordsArr.timeOutEvents.push(eventObj);
  return recordsArr;
}

function hoursWorkedOnDate(employeeHours, date) {
  let timeInDate = employeeHours.timeInEvents.find(
    (event) => event.date === date
  );
  let timeOutDate = employeeHours.timeOutEvents.find(
    (event) => event.date === date
  );
  let hoursWorked = timeOutDate.hour / 100 - timeInDate.hour / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(recordsArr, strArg) {
  let hours = hoursWorkedOnDate(recordsArr, strArg);
  let wages = hours * recordsArr.payPerHour;
  return wages;
}

function allWagesFor(employeeRec) {
  let allDates = employeeRec.timeInEvents.map((event) => event.date);
  let totalWages = allDates.reduce((accumTotal, date) => {
    return accumTotal + wagesEarnedOnDate(employeeRec, date);
  }, 0);
  return totalWages;
}
function calculatePayroll(employeeRec) {
  let totalPayRoll = employeeRec.reduce((total, employeInd) => {
    return total + allWagesFor(employeInd);
  }, 0);
  return totalPayRoll;
}
