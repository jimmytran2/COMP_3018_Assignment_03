# Debugging Analysis

## Scenario 2: Request Headers

- **Breakpoint Location:** branchController.ts - line 45
- **Objective:** Understand the headers that are being applied to API requests

### Debugger Observations

- **Variable States:**
  - headers = (a variable i created to store the headers from the getHeaders() method)
    - access-control-allow-origin = "\*";
    - content=security-policy = "default-src 'self';base-url ...
    - cross-origin-opener-policy = 'same-origin'
    - cross-origin-resource-policy = 'same-origin'
    - .....
- **Call Stack:**
  - Once the server has started, the env variables and db are loaded. A API request is made to the getAllBranches route, which calls the respective controller. The controller calls the respective service. A response is recieved, where I use the getHeaders method on the "res" to view the headers that have been attached.
- **Behavior:**
  - The getAllBranches API request has been made, and headers have been attached. They are stored in the "headers" constant i defined which uses the getHeaders() method. The response has a response code and formatted success response containing all the branches retrieved.

### Analysis

- What did you learn from this scenario?
  - I learned all the headers that are actually attached to the outgoing response. Their names and what values they are set to. As for what they all do i am not entirely sure, will require further research.
- Did you observe any unexpected behavior? If so, what might be the cause?
  - Something unexpected i observed was the header: access-control-allow-origin = "\*". From some googling, this means any domain is allowed to access the API. Since I havent changed any of the configurations for packages, that means these are the default settings. This makes the API more vulnerable, since anyone can access it. Fortunately this API doesnt hold incredibly sensitive information, and there isnt really any harm that can done from accessing it, I just was not expecting that to be the default setting. I was expecting the default setting to maybe only allow THIS source to access it initially. If this API DID have sensitive info, that could be dangerous.
- Are there areas for improvement or refactoring in this part of the code?
  - As for areas of improvement, the current implementation of helmet for this api just uses the default configuration. There is likely a way i could change the configuration to whatever suites the API (or any future API) best.

## Scenario 3: Environment Variables

- **Breakpoint Location:** firebaseConfig.ts - line 27
- **Objective:** Trying to check if environment variables are properly set and retrieved

### Debugger Observations

- **Variable States:**
  - FIREBASE_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@comp-3018-assignment-3.iam.gserviceaccount.com"
  - FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----......."
  - FIREBASE_PROJECT_ID = "comp-3018-assignment-3"
- **Call Stack:**
  - The server starts, which starts server.ts, which server loads app. When app.ts is called, the environment variables are loaded "dotenv.config()" which then the routes for branches and employees are loaded, through the controllers and services, is where firestore is loaded which uses the environment variables.
- **Behavior:**
  - At this point in the program, the environment varibles we set in .env are retrieved, and passed to a ServiceAccount type where it uses the credentials to initialize an app if one has not already been initialized. Otherwise, if an app already has been initialized, it just passes that existing app.

### Analysis

- What did you learn from this scenario?
  - I learned the flow/sequence of events that occurs when the server starts and firestore tries to load using the environment variables that we set
- Did you observe any unexpected behavior? If so, what might be the cause?
  - There was no unexpected behavior, the environment variables loaded properly and the rest of the application functioned properly.
- Are there areas for improvement or refactoring in this part of the code?
  - If i were to improve this code, I could add some validation to the environment variables, so that it checks if the environment varibles provided follow the correct format to be even used. We already check if the variables exist in the if block (which we throw an error for), but we dont check formatting or type.
- How does this enhance your understanding of the overall project?
  - As i mentioned, it made more clear as the flow of what happens whenever i type "npm start", and the application starts. This also made it more clear to me as to how someone else can use this application for themselves. They can just clone this repo, and set the .env to their own credentials.
