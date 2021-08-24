/* eslint-disable */
// ** React Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Button, Label, Input, CustomInput, Row, Col, Card } from "reactstrap";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SideBarImage from "./SideBar";

const CustomHeader = ({ handleFilter, value }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          {/* <Button.Ripple
            tag={Link}
            to="/apps/invoice/add"
            color="primary"
            target="_blank"
          >
            Add Record
          </Button.Ripple> */}
          <h4>Pre Orders</h4>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <Label for="search-invoice">Search</Label>
            <Input
              id="search-invoice"
              className="ml-50 mr-2 w-100"
              type="text"
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder="Search Orders"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const PreOrders = () => {
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    loadorderList();
  }, []);

  const loadorderList = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_PRE_ORDERS);
      setOrderList(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const onPreviewPreOrder = index => () => {
    setOrderId(index);

    toggleSidebar();
  };

  const onCloseSideBar = () => {
    toggleSidebar();
  };

  const handleFilter = val => {
    setValue(val);
    const value = val;
    let updatedData = [];
    if (value.length) {
      updatedData = orderList.filter(item => {
        const startsWith =
          item.user_email.toLowerCase().startsWith(val.toLowerCase()) ||
          item.product_name.toLowerCase().startsWith(val.toLowerCase()) ||
          item.user_phoneNumber.toLowerCase().startsWith(val.toLowerCase()) ||
          item.id.toString().toLowerCase().startsWith(val.toLowerCase());

        const includes =
          item.product_name.toLowerCase().startsWith(val.toLowerCase()) ||
          item.user_phoneNumber.toLowerCase().startsWith(val.toLowerCase()) ||
          item.user_email.toLowerCase().startsWith(val.toLowerCase()) ||
          item.id.toString().includes(val.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setValue(value);
    }
  };
  const handlePagination = page => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    return (
      <ReactPaginate
        pageCount={
          value.length ? filteredData.length / 25 : orderList.length / 10 || 1
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

  console.log(orderId);
  return (
    <div className="invoice-list-wrapper">
      <Card>
        {orderList.length > 0 && (
          <div className="invoice-list-dataTable">
            <DataTable
              noHeader
              pagination
              subHeader
              responsive
              columns={columns(orderList, setOrderList, onPreviewPreOrder)}
              paginationPerPage={10}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              data={value.length ? filteredData : orderList}
              subHeaderComponent={
                <CustomHeader value={value} handleFilter={handleFilter} />
              }
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default PreOrders;
