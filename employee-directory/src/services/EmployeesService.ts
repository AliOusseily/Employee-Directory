import { IGetEmployeesRequest } from "../models/Employee/IGetEmployeesRequest";
import { IUsers } from "../models/User/IUsers";
import { ApiBase } from "./API";
import env from "@beam-australia/react-env";

let appBasePath = "https://randomuser.me";

// Define the interface for the EmployeesService
export interface IEmployeesService {
  GetEmployees: (request: IGetEmployeesRequest) => Promise<IUsers>;
}

// Implement the EmployeesService class and extend the ApiBase class
class EmployeesService extends ApiBase implements IEmployeesService {
  constructor() {
    super(appBasePath);
  }

  // Implementation of the GetEmployees method from the IEmployeesService interface
  public GetEmployees = async (request: IGetEmployeesRequest): Promise<any> => {
    const { page, results } = request;
  
    // Construct the URL with query parameters for pagination
    const url = `/api/?page=${page}&results=${results}&seed=abc`;

    // Make a GET request to the specified API endpoint with the constructed URL
    return this.instance.get<IUsers>(url);
  };
}

export default EmployeesService;
