// Your code here

    
function createEmployeeRecord(array) {    
    let newObj = {}
    
        newObj.firstName = array[0]
        newObj.familyName = array[1]
        newObj.title = array[2]
        newObj.payPerHour = array[3]
        newObj.timeInEvents = []
        newObj.timeOutEvents = []
  return newObj  
}

function createEmployeeRecords(arrays) {
 let arrayOfEmployee = []

    for(let array of arrays){
        let employeeObject = createEmployeeRecord(array)
        arrayOfEmployee.push(employeeObject)
    }
     return arrayOfEmployee
}

function createTimeInEvent (record , date) {
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(date.slice(-4)),
        date: date.slice (0, 10)
    }
 record.timeInEvents.push(timeInObj)
     return record
}

function createTimeOutEvent (record , date) {
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(date.slice(-4)),
        date: date.slice (0, 10)
    }
 record.timeOutEvents.push(timeOutObj)
     return record
}

function hoursWorkedOnDate(record ,date){
 let inTime = record.timeInEvents.find(time => {
    if (time.date === date) {
        return true
    }
 }).hour
 let outTime = record.timeOutEvents.find(time => {
    if (time.date === date) {
        return true
    }
 }).hour
  let difference = outTime - inTime
  return difference/100
}


function wagesEarnedOnDate(record ,date){
    let hours = hoursWorkedOnDate (record ,date)
    return hours*record.payPerHour
}

function allWagesFor (employeeRecordObject){
 return employeeRecordObject.timeInEvents.reduce((accumulator ,currentValue) =>{
  return accumulator + wagesEarnedOnDate(employeeRecordObject , currentValue.date)
 }, 0 )
}
 
function calculatePayroll (arrayOfEmployeeRecords){
   return arrayOfEmployeeRecords.reduce((accumulator ,currentValue) =>{
        return accumulator + allWagesFor (currentValue)
    }, 0 )
}