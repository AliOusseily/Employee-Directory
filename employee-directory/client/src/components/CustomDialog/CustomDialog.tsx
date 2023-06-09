import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  message: string;
  openDialog: boolean;
  handleOpenCloseDiaglog: any;
  handleDeleteEmplyees: any;
  selectedEmployees: readonly string[];
  setSelectedEmployees: any;
};

// Component for displaying an alert dialog
export default function AlertDialog(props: Props) {
  const [open, setOpen] = React.useState(false);
  const {
    openDialog,
    handleOpenCloseDiaglog,
    message,
    handleDeleteEmplyees,
    selectedEmployees,
    setSelectedEmployees,
  } = props;

  const handleClose = () => {
    setOpen(false);
    handleOpenCloseDiaglog(false);
    handleDeleteEmplyees(selectedEmployees);
    setSelectedEmployees([]);
  };

  // Update the open state when the openDialog prop changes
  React.useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
