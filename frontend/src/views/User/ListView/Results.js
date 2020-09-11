import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Search as SearchIcon
} from "react-feather";
import { USER_STATUS, ROUTE_PATH } from "src/constants";

const getInitials = (name = "") => name
  .replace(/\s+/, " ")
  .split(" ")
  .slice(0, 2)
  .map(v => v && v[0].toUpperCase())
  .join("");

const tabs = Object.keys(USER_STATUS).map(key => ({
  value : USER_STATUS[key],
  label : key
}));

const sortOptions = [
  {
    value : "createdAt|desc",
    label : "Created At (newest first)"
  },
  {
    value : "createdAt|asc",
    label : "Created At (oldest first)"
  },
];

const applyFilters = (customers, query, filters) => customers.filter((customer) => {
  let matches = true;

  if (query) {
    const properties = ["email", "firstName", "lastName"];
    let containsQuery = false;

    properties.forEach((property) => {
      if (customer[property].toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
      }
    });

    if (!containsQuery) {
      matches = false;
    }
  }

  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    if (value && customer[key] !== value) {
      matches = false;
    }
  });

  return matches;
});

const applyPagination = (customers, page, limit) => customers.slice(page * limit, page * limit + limit);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split("|");
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const orderResult = comparator(a[0], b[0]);

    if (orderResult !== 0) return orderResult;

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

const useStyles = makeStyles(theme => ({
  root       : {},
  queryField : {
    width: 500
  },
  bulkOperations: {
    position: "relative"
  },
  bulkActions: {
    paddingLeft     : 4,
    paddingRight    : 4,
    marginTop       : 6,
    position        : "absolute",
    width           : "100%",
    zIndex          : 2,
    backgroundColor : theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height      : 42,
    width       : 42,
    marginRight : theme.spacing(1)
  }
}));

const Results = ({
  className,
  customers,
  ...rest
}) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(USER_STATUS.ACTIVE);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: USER_STATUS.ACTIVE,
  });

  const handleTabsChange = (event, value) => {
    setFilters({
      ...filters,
      status: value,
    });
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredCustomers = applyFilters(customers, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search users"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Created
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map(customer => (
                <TableRow
                  hover
                  key={customer._id}
                >
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        className={classes.avatar}
                      >
                        {getInitials(`${customer.firstName} ${customer.lastName}`)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to={`${ROUTE_PATH.USERS_EDIT}/${customer._id}`}
                          variant="h6"
                        >
                          { `${customer.firstName} ${customer.lastName}` }
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {customer.email}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.createdAt}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      to={`${ROUTE_PATH.USERS_EDIT}/${customer._id}`}
                    >
                      <SvgIcon fontSize="small">
                        <EditIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredCustomers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className : PropTypes.string,
  customers : PropTypes.array.isRequired
};

export default Results;
