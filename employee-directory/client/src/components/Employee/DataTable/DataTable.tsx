import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import { visuallyHidden } from "@mui/utils";
import { IUsers, Result } from "../../../models/User/IUsers";
import { IGetEmployeesRequest } from "../../../models/Employee/IGetEmployeesRequest";
import { CustomDialog } from "../../CustomDialog";
import { Avatar } from "@mui/material";

// added as static becuase the api doesnt have a total rows count
const MAX_ROW_COUNT = 100;

interface HeadCell {
  disablePadding: boolean;
  id: keyof Result;
  label: string;
  numeric: boolean;
}
// use of Styled components from Material UI.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  padding: "5px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headCells: readonly HeadCell[] = [
  {
    id: "picture",
    numeric: false,
    disablePadding: false,
    label: "Picture",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "gender",
    numeric: true,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "cell",
    numeric: true,
    disablePadding: false,
    label: "Cell",
  },
];

interface EnhancedTableProps {
  numSelected: number; // Represents the number of selected items
  // Callback function triggered when sorting is requested. It takes an event of type React.MouseEvent<unknown>
  // and a property of type keyof Result (a key of the Result interface) as parameters
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Callback function triggered when all items are selected. It takes an event of type React.ChangeEvent<HTMLInputElement> as a parameter
  rowCount: number; // Represents the total number of rows in the table
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox" style={{ background: "#ffffff" }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            style={{ background: "#ffffff" }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            style={{ background: "#ffffff" }}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  selected: readonly string[];
  handleDeleteRows: any;
  handleOpenCloseEmployeeDiaglog: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selected, handleDeleteRows, handleOpenCloseEmployeeDiaglog } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Employees
        </Typography>
      )}
      {selected.length > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                handleDeleteRows();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {selected.length === 1 && (
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleOpenCloseEmployeeDiaglog(true, selected[0]);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <Tooltip title="Add New">
            <IconButton
              onClick={() => {
                handleOpenCloseEmployeeDiaglog(true, null);
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}
type Props = {
  employees: IUsers;
  handleChangeEmployeesRequest: any;
  getEmployeesRequest: IGetEmployeesRequest;
  handleOpenCloseEmployeeDiaglog: any;
  handleDeleteEmplyees: any;
};
export default function EnhancedTable(props: Props) {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const {
    employees,
    handleChangeEmployeesRequest,
    getEmployeesRequest,
    handleOpenCloseEmployeeDiaglog,
    handleDeleteEmplyees,
  } = props;

  const { results } = employees;
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = results.map((n: any) => n.id.value);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    const request: IGetEmployeesRequest = {
      results: rowsPerPage,
      page: newPage,
    };
    handleChangeEmployeesRequest(request);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = parseInt(event.target.value, 10);
    setRowsPerPage(rows);
    setPage(0);
    const request: IGetEmployeesRequest = {
      results: rows,
      page: 0,
    };
    handleChangeEmployeesRequest(request);
  };

  const handleDeleteRows = () => {
    setOpenDialog(true);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const RenderProfileImage = (value: any) => {
    return <Avatar variant="rounded" src={value} />;
  };

  React.useEffect(() => {
    setPage(getEmployeesRequest.page);
    setRowsPerPage(getEmployeesRequest.results);
  }, [getEmployeesRequest]);

  return (
    <Box sx={{ width: "100%" }}>
      <CustomDialog
        message={`Deleting this item is irreversible. Are you sure you want to proceed?"`}
        openDialog={openDialog}
        handleOpenCloseDiaglog={setOpenDialog}
        handleDeleteEmplyees={handleDeleteEmplyees}
        selectedEmployees={selected}
        setSelectedEmployees={setSelected}
      ></CustomDialog>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          handleDeleteRows={handleDeleteRows}
          handleOpenCloseEmployeeDiaglog={handleOpenCloseEmployeeDiaglog}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={results.length}
            />
            <TableBody>
              {results.map((row: any, index) => {
                const isItemSelected = isSelected(row.id.value);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id.value)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={
                      row.id.value ??
                      `${row.name.first}${row.name.last}${row.name.title}`
                    }
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {RenderProfileImage(row.picture?.thumbnail)}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {`${row.name.first} ${row.name.last}`}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.phone}</StyledTableCell>
                    <StyledTableCell align="right">{row.cell}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={MAX_ROW_COUNT}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
