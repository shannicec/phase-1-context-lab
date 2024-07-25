function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
    return this;
  }
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    });
    return this;
  }
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
  }
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
  }
                  