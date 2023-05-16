import { IGetEmployeesRequest } from "../models/Employee/IGetEmployeesRequest";
import { IUsers } from "../models/User/IUsers";
import { ApiBase } from "./API";
import env from "@beam-australia/react-env";

let appBasePath = "https://randomuser.me" ;
export interface IEmployeesService {
  GetEmployees: (request: IGetEmployeesRequest) => Promise<IUsers>;
}

class EmployeesService extends ApiBase implements IEmployeesService {
  constructor() {
    super(appBasePath);
  }

  public GetEmployees = async (request: IGetEmployeesRequest): Promise<any> => {
    const { page, results } = request;
    return this.instance.get<IUsers>(
      `/api/?page=${page}&results=${results}&seed=abc`
    );
  };

}

export default EmployeesService;
