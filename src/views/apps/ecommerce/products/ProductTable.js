/* eslint-disable */
import React, { useState, forwardRef } from "react";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Badge,
  UncontrolledDropdown
} from "reactstrap";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  MoreVertical,
  Edit,
  Archive,
  Trash
} from "react-feather";
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      ref={ref}
      {...rest}
    />
    <label className="custom-control-label" onClick={onClick} />
  </div>
));

import Avatar from "@components/avatar";

// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary"
];

const status = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Professional", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" }
};
const data = [
  {
    responsive_id: "",
    id: 1,
    avatar: "10.jpg",
    full_name: "Korrie O'Crevy",
    post: "Nuclear Power Engineer",
    responsive_id: "",
    salary: "$23896.35",
    start_date: "09/23/2016",
    email: "kocrevy0@thetimes.co.uk",
    status: 2
  },
  {
    responsive_id: "",
    id: 2,
    avatar: "10.jpg",
    full_name: "Aorrie O'Crevy",
    post: "Nuclear Power Engineer",
    responsive_id: "",
    salary: "$23896.35",
    start_date: "09/23/2016",
    email: "kocrevy0@thetimes.co.uk",
    status: 1
  },
  {
    responsive_id: "",
    id: 3,
    avatar: "10.jpg",
    full_name: "Korrie O'Crevy",
    post: "Nuclear Power Engineer",
    email: "kocrevy0@thetimes.co.uk",
    responsive_id: "",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 4
  },
  {
    responsive_id: "",
    id: 4,
    avatar: "10.jpg",
    full_name: "Korrie O'Crevy",
    post: "Nuclear Power Engineer",
    email: "kocrevy0@thetimes.co.uk",
    responsive_id: "",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 3
  },
  {
    responsive_id: "",
    id: 5,
    avatar: "10.jpg",
    full_name: "Korrie O'Crevy",
    post: "Nuclear Power Engineer",
    email: "kocrevy0@thetimes.co.uk",
    responsive_id: "",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 5
  }
];
const columns = [
  {
    name: "Name",
    selector: "full_name",
    sortable: true,
    minWidth: "250px",
    cell: row => (
      <div className="d-flex align-items-center">
        {row.avatar === "" ? (
          <Avatar
            color={`light-${states[row.status]}`}
            content={row.full_name}
            initials
          />
        ) : (
          <Avatar
            img={
              require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`)
                .default
            }
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate">
            {row.full_name}
          </span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    minWidth: "250px"
  },
  {
    name: "Date",
    selector: "start_date",
    sortable: true,
    minWidth: "150px"
  },

  {
    name: "Salary",
    selector: "salary",
    sortable: true,
    minWidth: "150px"
  },
  {
    name: "Age",
    selector: "age",
    sortable: true,
    minWidth: "100px"
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    minWidth: "150px",
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    }
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: row => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pr-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={e => e.preventDefault()}
              >
                <FileText size={15} />
                <span className="align-middle ml-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={e => e.preventDefault()}
              >
                <Archive size={15} />
                <span className="align-middle ml-50">Archive</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={e => e.preventDefault()}
              >
                <Trash size={15} />
                <span className="align-middle ml-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    }
  }
];

export default function ProductTable() {
  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: "Current", color: "light-primary" },
      2: { title: "Professional", color: "light-success" },
      3: { title: "Rejected", color: "light-danger" },
      4: { title: "Resigned", color: "light-warning" },
      5: { title: "Applied", color: "light-info" }
    };

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={
        searchValue.length ? filteredData.length / 5 : data.length / 5 || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );
  return (
    <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        <CardTitle tag="h4">DataTable with Buttons</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline>
              <Share size={15} />
              <span className="align-middle ml-50">Export</span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className="w-100">
                <Printer size={15} />
                <span className="align-middle ml-50">Print</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <FileText size={15} />
                <span className="align-middle ml-50">CSV</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Grid size={15} />
                <span className="align-middle ml-50">Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File size={15} />
                <span className="align-middle ml-50">PDF</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Copy size={15} />
                <span className="align-middle ml-50">Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button className="ml-2" color="primary">
            <Plus size={15} />
            <span className="align-middle ml-50">Add Record</span>
          </Button>
        </div>
      </CardHeader>
      <Row className="justify-content-end mx-0">
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="6"
          sm="12"
        >
          <Label className="mr-1" for="search-input">
            Search
          </Label>
          <Input
            className="dataTable-filter mb-50"
            type="text"
            bsSize="sm"
            id="search-input"
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <DataTable
        noHeader
        pagination
        selectableRows
        columns={columns}
        paginationPerPage={5}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={searchValue.length ? filteredData : data}
        selectableRowsComponent={BootstrapCheckbox}
      />
    </Card>
  );
}
