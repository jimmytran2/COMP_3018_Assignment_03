# Debugging Analysis

## Scenario 1: employee Schema Validation

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
- the validateRequest middleware is called with employeeSchema being passed to it. the data is given to the validate function as well as the schema
- **Behavior:** [Describe what happens at this point in the program]
- a request is made to create an employee. the validate middleware is called. This is where the middleware "compares"
- the data provided to create an employee, against the schema that is made. the validate function is called, where it checks for errors.
- In this case there was errors, so it goes to the if block, where it throws errors.

### Analysis

- Something i learned in this scenario is how the validation middleware works and how it treats errors in the data provided, when the data provided does not pass the employeeSchema i made.
- Something that occurred that i did not expect, was that when i provided a field that, wasnt
  part of the schema, like for example "birthday", i got an error message that wasnt part of the schema. "\"birthday\" is not allowed". Im guessing this is something that is built in Joi for
  when someone adds a field that isnt expected in the schema.
- i think that if i were to improve the code, i would add different schemas for different services/requests. For example, an updateEmployeeSchema, that way, someone updating an employee could would
  be validated against different "criteria"
- This helped me understand the functionality of middleware, and how schemas work

## Scenario 2: [Title of the Scenario]

- **Breakpoint Location:** [File and line number]
- **Objective:** [What you are investigating or trying to understand]

### Debugger Observations

- **Variable States:** [List key variables and their values]
- **Call Stack:** [Summarize the function sequence leading to the breakpoint]
- **Behavior:** [Describe what happens at this point in the program]

### Analysis

- What did you learn from this scenario?
- Did you observe any unexpected behavior? If so, what might be the cause?
- Are there areas for improvement or refactoring in this part of the code?
- How does this enhance your understanding of the overall project?

## Scenario 3: [Title of the Scenario]

- **Breakpoint Location:** [File and line number]
- **Objective:** [What you are investigating or trying to understand]

### Debugger Observations

- **Variable States:** [List key variables and their values]
- **Call Stack:** [Summarize the function sequence leading to the breakpoint]
- **Behavior:** [Describe what happens at this point in the program]

### Analysis

- What did you learn from this scenario?
- Did you observe any unexpected behavior? If so, what might be the cause?
- Are there areas for improvement or refactoring in this part of the code?
- How does this enhance your understanding of the overall project?
