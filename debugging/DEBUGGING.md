# Debugging Analysis

## Scenario 1: newEmployee creation

- **Breakpoint Location:** employeeServices.ts - line 43
- **Objective:** Check if the newEmployee being created is assigned the correct property values, before being pushed to the array of employees

### Debugger Observations

- **Variable States:** newEmployee: contains data from request {id: 1, name: jimmy, position: manager, department: finance,
  email: jimmy@gmail.com, phone: 123-123-1234, branch: 1} - employees: [{35}]
- **Call Stack:** api request is made, sent to router, which sends to controller, which then sends to services, where the business logic
  is performed. For this scenario, the service being called is createEmployee. The newEmployee is assigned the new values provided
- **Behavior:** a request is made to create a new employee. the createEmployee service is called.
  This is where a newEmployee object is created with - the provided values and it is given a
  unique employee id before it is pushed to the employees array. the new employee is then returned

### Analysis

- I learned how the data from the api request is taken to the service (employeeService.ts) and processed. In
- this case processed to create a new employee.
- No, there was no unexpected behavior
- If i were to improve this part of the code, i would add some sort of validation that makes sure when a new employee
- is created, they cant assign them an ID themselves, rather it should be automatically generated.
- This helped me understand the flow of the api requests when they are made. Also made me more wary of when there i user input
- that there shouldnt be.

## Scenario 2: updating branches

- **Breakpoint Location:** branchServices.ts - line 85
- **Objective:** Check if the branch being updated is the correct branch, and the correct properties are assigned

### Debugger Observations

- **Variable States:** branches[index]: contains data about branch with, in this case id 1, being selected {address: string, id: 1,
  name: "string", phone: "string"} - branches: [{10}]
- **Call Stack:** api request is made, sent to router, which sends to controller, which then sends to services, where the business logic
  is performed. For this scenario, the service being called is updateBranch. Branch data that shouldnt be passed is deleted, and anything
  that does pass is stored in safeBranchData. safeBranchData is then used to update the branch
- **Behavior:** a request is made to uodate a branch. the updateBranch service is called.
  This is where an ezisting branch object is updated - the "safe" branch data is used to update the old branch data. the new
  branch with updated data is then returned

### Analysis

- I learned that when updating a branch, (and i assume updating an employee as well), you are able make it
- so you cant update certain properties. This is useful when you want to keep people from changing properties they shouldnt be able to
- The unexpected behavior was that i was able to add new properties to a branch object that werent in the type.
- If i were to improve this part of the code, i would add some validation, filtering, or cleaning of data that comes in when
- updating any branches (or employees).

## Scenario 3: getting employees by department

- **Breakpoint Location:** employeeServices.ts - line 160
- **Objective:** Checking how the departments behave when they are being compared to the provided department parameter

### Debugger Observations

- **Variable States:** employee = {id: 1, name: Alice Johnson...}
  return value: false
  employee = {id: 5, name: Linda Martinez}
  return value: true
- **Call Stack:**
- **Behavior:** In this scenario, the function has checked if the department provided exists in the first place. It has, so it
  filters through the employees for any employee that has a matching department with the department parameter provided.
  If it matches, it adds it to my employeesInDaprtment array. After filtering, if there is no employees in the department,
  an error is thrown. Otherwise, if there are employeesInDepartment, it is returned

### Analysis

- In this scenarion i learned how to use the filter method. usually i would use a for loop, but i
- have been experimenting and looking into other methods that function similarily or even "better".
- No unexpected behavior was observed.
- Not sure how i could improve this code. Maybe some sort of validation or error handling i am missing but dont realize.
