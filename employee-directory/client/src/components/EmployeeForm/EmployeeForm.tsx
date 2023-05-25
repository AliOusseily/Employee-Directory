import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Result } from "../../models/User/IUsers";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  employee: Result;
  handleOpenCloseEmployeeDiaglog: any;
  handleCreateUpdateEmployee: any;
};
export default function EmployeeForm(props: Props) {
  const {
    open,
    employee,
    handleOpenCloseEmployeeDiaglog,
    handleCreateUpdateEmployee,
  } = props;
  const [employeeModel, setEmployeeModel] = useState<Result>(employee);

  const handleChange = (event: SelectChangeEvent) => {
    employeeModel &&
      setEmployeeModel({
        ...employeeModel,
        gender: event.target.value,
      });
  };

  const setValue = (field: string, value: any) => {
    if (field === "FirstName") {
      setEmployeeModel({
        ...employeeModel,
        name: { ...employeeModel.name, first: value },
      });
    } else if (field === "LastName") {
      setEmployeeModel({
        ...employeeModel,
        name: { ...employeeModel.name, last: value },
      });
    } else {
      setEmployeeModel({ ...employeeModel, [field]: value });
    }
  };

  useEffect(() => {
    setEmployeeModel(employee);
  }, [employee]);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogTitle id="alert-dialog-title">
          {employee.id ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={employeeModel?.name?.first}
            onChange={(e: any) => setValue("FirstName", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={employeeModel?.name?.last}
            onChange={(e: any) => setValue("LastName", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={employeeModel?.email}
            onChange={(e: any) => setValue("email", e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={employeeModel?.gender}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            value={employeeModel?.phone}
            onChange={(e: any) => setValue("phone", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Cell"
            variant="outlined"
            value={employeeModel?.cell}
            onChange={(e: any) => setValue("cell", e.target.value)}
          />
        </Box>
        <DialogActions>
          <Button
            onClick={() => {
              handleOpenCloseEmployeeDiaglog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleCreateUpdateEmployee(employeeModel);
            }}
          >
            {employee.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
