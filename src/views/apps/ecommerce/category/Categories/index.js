/* eslint-disable semi */
// ** React Imports
import { Fragment, useState } from "react";

// ** Table Columns
import { data, columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { FormattedMessage } from "react-intl";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardText,
  Button,
  Input,
  Label,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import Sidebar from "./SideBar";

const CustomHeader = ({ toggleSidebar, handleFilter, searchTerm }) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0"></Col>
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
          <Button.Ripple color="primary" onClick={toggleSidebar}>
            Add New Category
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  );
};

const Categories = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected);
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Function to handle filter
  const handleFilter = val => {
    const value = val;
    let updatedData = [];
    setSearchValue(value);
    console.log(value);
    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.category_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.description.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.category_name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase());

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

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <span className="align-middle d-none d-md-inline-block">
          <FormattedMessage id="Prev" />
        </span>
      </Fragment>
    );
  };

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className="align-middle d-none d-md-inline-block">
          <FormattedMessage id="Next" />
        </span>
      </Fragment>
    );
  };

  // ** Custom Pagination Component
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={
        searchValue.length ? filteredData.length / 7 : data.length / 7 || 1
      }
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={"active"}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={
        "pagination react-paginate pagination-sm justify-content-end pr-1 mt-1"
      }
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Categories</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        subHeader
        responsive
        columns={columns}
        paginationPerPage={7}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={searchValue.length ? filteredData : data}
        subHeaderComponent={
          <CustomHeader
            toggleSidebar={toggleSidebar}
            searchTerm={searchValue}
            handleFilter={handleFilter}
          />
        }
      />

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Card>
  );
};

export default Categories;
