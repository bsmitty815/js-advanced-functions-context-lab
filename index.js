/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(info) {
    // returns the values of info
    return {firstName: info[0], familyName: info[1], title: info[2], payPerHour: info[3], timeInEvents: [], timeOutEvents: []};
}
function createEmployeeRecords(employees) {
    //uses map method to go through all the values in an array
return employees.map(employee => {
    return createEmployeeRecord(employee)
})
}

function createTimeInEvent(time) {  
    let newRecord = {
        type: 'TimeIn',
        hour: parseInt(time.split(" ")[1], 10), //splits the string to an array and gets 1 index. use parseInt to turn from a string
        date: time.split(" ")[0] //splits the string to an array and gets 0 index
    }
    this.timeInEvents = [...this.timeInEvents, newRecord];
    return this;
}

function createTimeOutEvent(time) {
    let newRecord = {
        type: 'TimeOut',
        hour: parseInt(time.split(" ")[1], 10), //splits the string to an array and gets 1 index. use parseInt to turn from a string
        date: time.split(" ")[0] //splits the string to an array and gets 0 index
    }
    this.timeOutEvents = [...this.timeOutEvents, newRecord];
    return this;
}

function hoursWorkedOnDate(time) {
    const result1 = this.timeInEvents.filter(tie => tie.date === time); // filter method will filter to the right value
    const result2 = this.timeOutEvents.filter(toe => toe.date === time);
    return (result2[0].hour - result1[0].hour) / 100;
}

function wagesEarnedOnDate(date) {
    const result2 = hoursWorkedOnDate.call(this, date) // passing through the employee hours
    return result2 * this.payPerHour 
}

function allWagesFor() {
    const everyDateWorked = this.timeInEvents.map(event => event.date); // map through the array to get the date inside timeInEvents
    const totalWages = everyDateWorked.reduce(function(acc, val) {  // use the reduce method to go through the variable which 
        //acc + val;                                               gets all the dates and then adds them all up     
        return acc + wagesEarnedOnDate.call(this, val)         //returning the results
    }, 0);
        return totalWages;  //returning the new variable
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(element => element.firstName === firstName)
     //find goes through the recrods and has the element find the firstName and if it equals
     //the firstName argument it returns it
}

function calculatePayroll(employeeRecords) {
    let allEmployeeWages = 0;               // set the anitial value before adding all the employees up
    for (let i = 0; i < employeeRecords.length; i++) {  //create a for loop to go through all the employees
        allEmployeeWages += allWagesFor.call(employeeRecords[i]) // now add the employee wages to the initial value
    }    //allEmployeeWages goes on the left becuse when you are seeting it eqyal to something it has to be set equal on the left
    return allEmployeeWages;
}
