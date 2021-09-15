/* eslint-disable */
// ** React Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ** Table Columns
import { columns } from "./columns";

import { useSelector, useDispatch } from "react-redux";

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
import SpinnerComponent from "@src/@core/components/spinner/Fallback-spinner";
import consoleLog from "@console";
import SidebarShipping from "./SidebarShipping";
import useToggle from "@hooks/useToggle";
import { addShippingClassList } from "./store/action";
const CustomHeader = ({ handleFilter, value, ontoggle }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <Button.Ripple color="primary" onClick={ontoggle}>
            Add Shipping Class
          </Button.Ripple>
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
              placeholder="Search Shipping Class"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Shipping = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shippingReducer.shipping);

  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shippingList, setShippingList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useToggle(false);
  const [onSelectShipping, setOnSelectShipping] = useState(null);
  const toggleSideBar = () => {
    setOpen(!open);
  };
  useEffect(() => {
    loadShippingList();
  }, []);

  useEffect(() => {
    setShippingList(shipping);
  }, [shipping]);
  const loadShippingList = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().get(urls.GET_SHIPPING_CLASS);
      setShippingList(res.data.results);
      dispatch(addShippingClassList(res.data.results));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleFilter = val => {
    setValue(val);
    const value = val;
    let updatedData = [];
    if (value.length) {
      updatedData = shippingList.filter(item => {
        const startsWith = item.shipping_class_name
          .toLowerCase()
          .startsWith(val.toLowerCase());

        const includes = item.shipping_class_name
          .toLowerCase()
          .includes(val.toLowerCase());

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
          value.length
            ? filteredData.length / 10
            : shippingList.length / 10 || 1
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

  if (isLoading) return <SpinnerComponent />;
  return (
    <div className="invoice-list-wrapper">
      <Card>
        {
          <div className="invoice-list-dataTable">
            <DataTable
              noHeader
              pagination
              subHeader
              responsive
              columns={columns(setOnSelectShipping, toggleSideBar)}
              paginationPerPage={10}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              data={value.length ? filteredData : shippingList}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  handleFilter={handleFilter}
                  ontoggle={toggleSideBar}
                />
              }
            />
            <SidebarShipping open={open} toggleSidebar={toggleSideBar} onSelectShipping={onSelectShipping} setOnSelectShipping={setOnSelectShipping}/>
          </div>
        }
      </Card>
    </div>
  );
};

export default Shipping;
