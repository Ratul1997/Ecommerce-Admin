/* eslint-disable */
// ** React Imports
import { useState, useEffect } from "react";
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
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import CardTitle from "reactstrap/lib/CardTitle";
import invoiceServices from "../../../../services/invoiceServices";

const CustomHeader = ({ handleFilter, value }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <Button.Ripple
            tag={Link}
            to="/apps/invoice/add"
            color="primary"
            target="_blank"
          >
            Add Invoice
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
              placeholder="Search Invoice"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const InvoiceList = () => {
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInvoiceList();
  }, []);

  const loadInvoiceList = async () => {
    setIsLoading(true);
    try {
      const res = await invoiceServices.getInvoices();
      setInvoiceList(res.data.results);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilter = val => {
    setValue(val);
    const value = val;
    let updatedData = [];
    if (value.length) {
      updatedData = invoiceList.filter(item => {
        const startsWith =
          item.customer_name.toLowerCase().startsWith(val.toLowerCase()) ||
          item.invoice_id
            .toString()
            .toLowerCase()
            .startsWith(val.toLowerCase());

        const includes =
          item.customer_name.toLowerCase().includes(val.toLowerCase()) ||
          item.invoice_id.toString().includes(val.toLowerCase());

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
          value.length ? filteredData.length / 10 : invoiceList.length / 10 || 1
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
        <CardTitle className="mt-2 ml-2">Invoices</CardTitle>
        {
          <div className="invoice-list-dataTable">
            <DataTable
              noHeader
              pagination
              subHeader
              responsive
              columns={columns(invoiceList, setInvoiceList)}
              paginationPerPage={10}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              data={value.length ? filteredData : invoiceList}
              subHeaderComponent={
                <CustomHeader value={value} handleFilter={handleFilter} />
              }
            />
          </div>
        }
      </Card>
    </div>
  );
};

export default InvoiceList;
