# Debugging Analysis

## Scenario 1: employee Schema failed validation

- **Breakpoint Location:** validate.ts - line 60
- **Objective:** Try to understand how the validating middleware behaves, when running into data that doesnt pass validation

### Debugger Observations

- **Variable States:** data: contains data inputted, that is to be validated
- Note: this data was modified to purposely fail validation
- {
  "name": 1,
  "department": "",
  "email": "mscott@rrcacademiccom",
  "phone": "1231231231123123",
  "branch": 5,
  "birthday": "yes"
  }
  error: contains all the error message for each field that failed validation
  details: (6) details concerning why the each field didnt pass
- **Call Stack:** api request is made to create an employee, the route is called, but before the controller is called,
  the validateRequest middleware is called with employeeSchema being passed to it. the data is given to the validate function as well as the schema
- **Behavior:** a request is made to create an employee. the validate middleware is called. This is where the middleware "compares"
  the data provided to create an employee, against the schema that was made. the validate function is called, where it checks for errors.
  In this case there was errors, so it goes to the if block, where it throws errors.

### Analysis

- Something i learned in this scenario is how the validation middleware works and how it treats errors in the data provided, when the
  data provided does not pass the employeeSchema i made.
- Something that occurred that i did not expect, was that when i provided a field that, wasnt
  part of the schema, like for example "birthday", i got an error message that wasnt part of the schema. "\"birthday\" is not allowed".
  Im guessing this is something that is built in Joi for when someone adds a field that isnt expected in the schema.
- i think that if i were to improve the code, i would add different schemas for different services/requests. For example,
  an updateEmployeeSchema, that way, someone updating an employee could would
  be validated against different "criteria"
- This helped me understand the functionality of middleware, and how schemas work

## Scenario 2: errorHandler middleware format error

- **Breakpoint Location:** errorHandler.ts - line 63
- **Objective:** understand how the errorhandler middleware handles making the error messages

### Debugger Observations

- **Variable States:** err.code, err.name, err.statusCode, err.message
- **Call Stack:** an api request was made to get a branch with a specific ID, in this scenario, the ID does not exist.
  The controller is called, which calls the respective service, where an error is thrown since the ID does exist.
  The error handling middleware checks if the error is of a certain type, in this case ServiceError, and formats
  the error message.
- **Behavior:** At this point in the program, an error was encountered and was thrown, which is now being handled
  by the error handling middleware. The if block checks if the error thrown is one of the types, which it is. It
  then formats the error message according to the errorResponse model.

### Analysis

- From this scenario I learned about the behavior of the error handling middleware when it recieves and error to be formatted,
  and what variables it keeps track of.
- Some unexpected behavior that i observed was that when an error was found, and I used the debugger to step into, and step over
  to navigate through, the request actually threw the RepositoryError inside firestoreRepository.ts, before moving on to
  throw the ServiceError in the branchService.ts
- Im not sure about refactoring the code, but this scenario and the unexpected behavior makes me wonder if having the
  getBranchById service (this includes the rest of the services too) wrapped in a try-catch is even necessary since the repository
  will just catch the error instead, and throw a RepositoryError.

## Scenario 3: getAllBranches

- **Breakpoint Location:** branchServices.ts - line 58
- **Objective:** how the getAllBranches service interacts with the firestoreRepo, and how a successResponse done

### Debugger Observations

- **Variable States:**
- data = (3) - contains the 3 branches with their info
- successResponse message and status
- **Call Stack:** an api request is made to retrieve all branches in the database. the controller calls the service, which calls
  the repository layer. The repo returns the data to the service. On a successful retrieve the controller takes the branches, which
  is returned to the client in a formatted success response.
- **Behavior:** At this point, the function has retrieved all branches from the firestore snapshot, and returned the data
  as a Branch, and the controller has resolved the data in JSON formatted successResponse

### Analysis

- From this debugging scenario i learned more indepth as to the order/sequence of different parts of the program such as the services, controllers, and
  middleware, in the event of a request that was made that does NOT result in an error, but rather a success.
- There was no unexpected behavior, I was just able to get a clearer idea as to the order/sequence of how things worked.
- How does this enhance your understanding of the overall project?
  Understanding how the different parts interact and handle the data. It clarified the flow from request, route, middleware and controllers, and services.
- Understanding more clearly the flow of the program will allow me to better pin point where an issue is occuring, and allow me to debug more effectively.
