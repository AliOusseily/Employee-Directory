import React from "react";
import "./header.scss";
import { Button, Typography } from "@mui/material";
type Props = {};

export default function Header({}: Props) {
  const handleAddNewEmployee = () => {
    alert("add employee");
  };
  return (
    <div className="container">
      <div className="title">
        <Typography variant="h5" gutterBottom>
          Employees
        </Typography>
      </div>
      <div className="actions">
        <Button
          variant="outlined"
          onClick={() => {
            handleAddNewEmployee();
          }}
        >
          Add Employee
        </Button>
      </div>
    </div>
  );
}
