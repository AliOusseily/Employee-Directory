import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Dialog, DialogActions, DialogContent,FormControl,MenuItem,InputLabel,Select,SelectChangeEvent } from "@mui/material";
import { Result } from "../../models/User/IUsers";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  employee: Result | null;
  handleOpenCloseEmployeeDiaglog: any;
};
export default function EmployeeForm(props: Props) {
  const { open, employee, handleOpenCloseEmployeeDiaglog } = props;
  const [employeeData, setEmployeeData] = useState(employee);

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);


  const handleChange = (event: SelectChangeEvent) => {
    console.log("gender");
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogTitle id="alert-dialog-title">
          {employee ? "Edit Employee" : "Add New Employee"}
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
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
           <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employeeData?.gender}
            label="Gender"
            onChange={handleChange}
            >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
           </Select>
          </FormControl>          
          <TextField id="outlined-basic" label="Phone" variant="outlined" />
          <TextField id="outlined-basic" label="Cell" variant="outlined" />
        </Box>
        <DialogActions>
          <Button
            onClick={() => {
              handleOpenCloseEmployeeDiaglog(false);
            }}
          >
            Cancel
          </Button>
          <Button autoFocus>Save</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
