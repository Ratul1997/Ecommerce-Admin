/* eslint-disable */
// ** React Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ** Table Columns
import { columns } from "./columns.js";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Button, Label, Input, CustomInput, Row, Col, Card } from "reactstrap";

import { urls } from "@urls";
import { findValueInArray } from "@utils";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner.js";
import ExpandableTable from "./columns.js";

const CustomHeader = ({ handleFilter, value }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <h4>Comments</h4>
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
              placeholder="Search Tags"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Ratings = () => {
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewList, setReviewsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReviewList();
  }, []);

  const loadReviewList = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().get(urls.GET_REVIEWS);
      setReviewsList(res.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleFilter = val => {
    setValue(val);
    const value = val;
    let updatedData = [];
    if (value.length) {
      updatedData = reviewList.filter(item => {
        const startsWith =
          item.user_email.toLowerCase().startsWith(val.toLowerCase()) ||
          item.first_name.toLowerCase().startsWith(val.toLowerCase());
        const includes =
          item.user_email.toLowerCase().includes(val.toLowerCase()) ||
          item.first_name.toLowerCase().includes(val.toLowerCase());

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

  const updateCommentList = id => {
    const reviews = reviewList;

    console.log(reviews);
    const index = findValueInArray(reviews, id, "product_review_id");
    console.log(index);

    reviews[index].isApproved = reviews[index].isApproved === 1 ? 0 : 1;

    setReviewsList([...reviews]);
  };
  const CustomPagination = () => {
    return (
      <ReactPaginate
        pageCount={
          value.length ? filteredData.length / 25 : reviewList.length / 10 || 1
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
        {reviewList.length > 0 && (
          <div className="invoice-list-dataTable">
            <DataTable
              noHeader
              pagination
              subHeader
              expandOnRowClicked
              responsive
              expandableRows
              columns={columns(reviewList, setReviewsList, updateCommentList)}
              paginationPerPage={10}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              expandableRowsComponent={<ExpandableTable />}
              data={value.length ? filteredData : reviewList}
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

export default Ratings;
