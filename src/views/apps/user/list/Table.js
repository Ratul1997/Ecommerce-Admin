/* eslint-disable  */
// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Columns
import { columns } from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
} from "reactstrap";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import { roleOptions } from "../userConstants";

// ** Table Header
const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  currentRole,
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <h4>Users</h4>
            {/* <Label for="rows-per-page">Show</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={currentRole}
              onChange={data => {
                setCurrentRole(data);
                dispatch(
                  getData({
                    page: currentPage,
                    perPage: rowsPerPage,
                    role: data.value,
                    currentPlan: currentPlan.value,
                    status: currentStatus.value,
                    q: searchTerm,
                  })
                );
              }}
            /> */}
            {/* <Label for="rows-per-page">Entries</Label> */}
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
          {/* <Button.Ripple color="primary" onClick={toggleSidebar}>
            Add New User
          </Button.Ripple> */}
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_USERS);
      setUsers(res.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      
    }
  };

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val);
    const value = val;
    let updatedData = [];
    if (value.length) {
      updatedData = users.filter(item => {
        const startsWith =
          item.first_name.toLowerCase().startsWith(val.toLowerCase()) ||
          item.phone_number.toLowerCase().startsWith(val.toLowerCase()) ||
          item.email.toLowerCase().startsWith(val.toLowerCase()) ||
          item.id.toString().toLowerCase().startsWith(val.toLowerCase());

        const includes =
          item.first_name.toLowerCase().includes(val.toLowerCase()) ||
          item.phone_number.toLowerCase().includes(val.toLowerCase()) ||
          item.email.toLowerCase().includes(val.toLowerCase()) ||
          item.id.toString().includes(val.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchTerm(value);
    }
  };

  const handlePagination = page => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    return (
      <ReactPaginate
        pageCount={
          searchTerm.length ? filteredData.length / 10 : users.length / 10 || 1
        }
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        activeClassName="active"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }
  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4"></Col>
            <Col className="my-md-0 my-1" md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={data => {
                  setCurrentPlan(data);
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                      q: searchTerm,
                    })
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                      status: data.value,
                      q: searchTerm,
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card>
        <DataTable
          paginationPerPage={10}
          paginationDefaultPage={currentPage}
          noHeader
          pagination
          subHeader
          responsive
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationPerPage={10}
          paginationComponent={CustomPagination}
          data={searchTerm.length ? filteredData : users}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
              currentRole={currentRole}
            />
          }
        />
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default UsersList;
