import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import EmployeesService, {
  IEmployeesService,
} from "../../services/EmployeesService";
import { IGetEmployeesRequest } from "../../models/Employee/IGetEmployeesRequest";
import { IUsers } from "../../models/User/IUsers";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { EmployeeForm } from "../EmployeeForm";

const employeesService = new EmployeesService();
const defaultEmployeesState = {
  results: [],
  info: {
    seed: "test-employees",
    results: 10,
    page: 0,
    version: "1.5",
  },
};
const defaultEmployeesRequest = {
  page: 0,
  results: 10,
};
export default function Employee() {
  const [isLoading, setIsLoading] = useState(false);
  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);

  const [employees, setEmployees] = useState<IUsers>(defaultEmployeesState);
  const [getEmployeesRequest, setGetEmployeesRequest] =
    useState<IGetEmployeesRequest>(defaultEmployeesRequest);

  const handleChangeEmployeesRequest = (
    employeesRequest: IGetEmployeesRequest
  ) => {
    setGetEmployeesRequest(employeesRequest);
  };
  const handleOpenCloseEmployeeDiaglog = (open: boolean) => {
    setOpenEmployeeDialog(open);
  };
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      var response = await employeesService.GetEmployees(getEmployeesRequest);
      setIsLoading(false);
      setEmployees(response);
    };
    getData();
  }, [getEmployeesRequest]);
  return (
    <div>
      <EmployeeForm
        open={openEmployeeDialog}
        employee={null}
        handleOpenCloseEmployeeDiaglog={handleOpenCloseEmployeeDiaglog}
      ></EmployeeForm>
      <Dialog
        open={isLoading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Loading ...
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <DataTable
        employees={employees}
        handleChangeEmployeesRequest={handleChangeEmployeesRequest}
        getEmployeesRequest={getEmployeesRequest}
        handleOpenCloseEmployeeDiaglog={handleOpenCloseEmployeeDiaglog}
      />
    </div>
  );
}
