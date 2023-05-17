import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell,{ tableCellClasses } from "@mui/material/TableCell";
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

// added as static becuase the api doesnt have a total rows count
const MAX_ROW_COUNT = 100;
type Order = "asc" | "desc";

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
    id: "name",
    numeric: false,
    disablePadding: true,
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
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Result) => void;
  // Callback function triggered when sorting is requested. It takes an event of type React.MouseEvent<unknown>
  // and a property of type keyof Result (a key of the Result interface) as parameters
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Callback function triggered when all items are selected. It takes an event of type React.ChangeEvent<HTMLInputElement> as a parameter
  order: Order; // Represents the sorting order ('asc' or 'desc')
  orderBy: string; // Represents the property by which the table should be sorted
  rowCount: number; // Represents the total number of rows in the table
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Result) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteRows: any;
  handleOpenCloseEmployeeDiaglog: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDeleteRows, handleOpenCloseEmployeeDiaglog } =
    props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
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
      {numSelected > 0 ? (
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
          {numSelected === 1 && (
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleOpenCloseEmployeeDiaglog(true);
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
                handleOpenCloseEmployeeDiaglog(true);
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
};
export default function EnhancedTable(props: Props) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Result>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Result
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const {
    employees,
    handleChangeEmployeesRequest,
    getEmployeesRequest,
    handleOpenCloseEmployeeDiaglog,
  } = props;

  const { results } = employees;
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = results.map((n: any) => n.name.first);
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

  React.useEffect(() => {
    setPage(getEmployeesRequest.page);
    setRowsPerPage(getEmployeesRequest.results);
  }, [getEmployeesRequest]);

  return (
    <Box sx={{ width: "100%" }}>
      <CustomDialog
        message={`Employees To Delete : ${selected.join(" ,")}`}
        openDialog={openDialog}
        handleOpenCloseDiaglog={setOpenDialog}
      ></CustomDialog>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
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
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={results.length}
            />
            <TableBody>
              {results.map((row: any, index) => {
                const isItemSelected = isSelected(row.name.first);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.name.first)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name.first}
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
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name.first}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.gender}</StyledTableCell>
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
