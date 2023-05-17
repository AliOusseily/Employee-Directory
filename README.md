# Employee-Directory
## Prerequisites

Before running the application, ensure that you have the following installed on your machine:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Getting Started

cd employee-directory

- npm install
- npm start

This command will start the development server and automatically open the app in your default browser. If the browser doesn't open automatically, you can visit http://localhost:3000 manually.

## Employee Directory Web Application documentation.
# List of technologies, frameworks, and libraries utilized in the application.

I chose to build the employee directory web application using React with TypeScript, leveraging my existing experience in this technology stack. Given the time constraints caused by my current workload, I prioritized utilizing React and TypeScript, as opposed to exploring React Native, in order to deliver a production-quality solution and applying best practices within the given timeframe.

Libraries : Material UI 

# High-level overview of the application's architecture.
i designed the infrastucture as follows: 
assets => to have the images and logos needed for the implementation and the common css properties
components =>  the "components" folder is a common directory where you store your reusable UI components.
constants => can be used to store all constants variables that could be shared among the whole project.
hoc => A higher-order component is a design pattern, it takes a component as input(children) and returns a new component with additional capabilities. it helps in code reusability and organization 
Mocks => it's not being used in my code, but this folder can help us save dummy data if needed any place in the project (ex: for unit testing).
models => a folder containing all the interfaces of the DTO that i'll be using in my application 
services => it has an API file implementing an abstract base class ApiBase responsible for making API interactions using the Axios library and HANDLING REQUEST RESPONSE AND ERRORS , it's also used for us not to create an AxiosInstance everytime we needed it, we just need to extend that class and pass the url in the constructor. 

Implemented the usage of react hooks useState and useEffect.

for example UseEffect was used in Employye.tsx as follows : 

1- The employeesService.GetEmployees function is called asynchronously with the getEmployeesRequest object as an argument. It waits for the response to be resolved using the await keyword.

Once the response is obtained, the setIsLoading function is called again with false to indicate that the data fetching is complete.

The setEmployees function is called with the received response object, updating the state of the component with the new data.

Finally, the getData function is invoked immediately to fetch data when the component mounts or when the value of getEmployeesRequest changes. The latter is specified in the dependency array [getEmployeesRequest].

useState was used for pagination that has a page and a result (skip, take) whenever i do a request inside the employee this state will get updated.

# Summary of the project and the implemented features.
i faced several challanges during my implementation starting with the creation of the component and dealing with the api, also using react hooks in the suitable cases where i need them.

# Features Implemented : 
•	Setup instructions and notes on how you built the application and how to Run it.
•   Ability to display employees by department, title, location, etc.
•   Creative use of animation
•   Paginated lists
•   Forms for creating, updating, and deleting employees.

# Possible future improvements or features.
create a login page and expand the design and split into more pages to get to use routes.
Ability to search for employees i didn't have enough time to do it but i can discuss it.
add validations and creating and editing an existing employee (empty fields, illegal arguments ...);
handling exceptions in different places of the code. 
having it more responsive.

References
