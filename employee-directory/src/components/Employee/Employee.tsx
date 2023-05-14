import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import EmployeesService from "../../services/EmployeesService";
import { IGetEmployeesRequest } from "../../models/Employee/IGetEmployeesRequest";
import { IUsers } from "../../models/User/IUsers";

const employeesService = new EmployeesService();
const defaultEmployeesState = {
  results: [],
  info: {
    seed: "test-employees",
    results: 10,
    page: 1,
    version: "1.5",
  },
};
export default function Employee() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IUsers>(defaultEmployeesState);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const request: IGetEmployeesRequest = {
        page: 0,
        results: 10,
      };
      var response = await employeesService.GetEmployees(request);
      setIsLoading(false);
      setData(response);
    };
    getData();
  }, []);

  return (
    <div>{isLoading ? <div>Loading...</div> : <DataTable data={data} />}</div>
  );
}
