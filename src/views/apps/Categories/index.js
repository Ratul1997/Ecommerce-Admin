/* eslint-disable */
// ** React Imports
import { Fragment, useRef, useState } from "react";
import { Edit2, Plus, Trash } from "react-feather";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { FormattedMessage } from "react-intl";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import Sidebar from "./SideBar";
import axios from "axios";
import { removeItemInBlogCategory } from "../../apps/blog/store/actions";
import { removeItemInCategory } from "../../apps/ecommerce/store/actions";
import { urls } from "@urls";
import { toast } from "react-toastify";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../common/Toaster";
import { findValueInArray } from "@utils";
import blogServices from "../../../services/blogServices";
import productServices from "../../../services/productServices";
import {useLocation} from 'react-router-dom';

const Categories = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editModal, setEditModal] = useState(false);
  let categoryRef = useRef();

  let location = useLocation()
  const prevPath = location.pathname;

  const dispatch = useDispatch();
  const store = useSelector(store => prevPath === "/apps/ecommerce/category" ? store.ecommerce: store.blog);
  const { categories } = store;

  console.log(prevPath)
  const services = prevPath === "/apps/ecommerce/category" ? productServices : blogServices;
  const remove_category_action = prevPath === "/apps/ecommerce/category" ? removeItemInCategory : removeItemInBlogCategory;

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected);
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Function to toggle sidebar
  const toggleEditSidebar = () => setEditModal(!editModal);

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);
    if (value.length) {
      updatedData = categories.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.description.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
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
        searchValue.length
          ? filteredData.length / 25
          : categories.length / 25 || 1
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

  const onDelete = category => async e => {
    e.preventDefault();

    try {
      const url = urls.REMOVE_A_CATEGORY + category.category_id;
      const res = await services.removeCategory(category.category_id);
      dispatch(remove_category_action(category));
      onSuccessToast("Successfully removed.");
    } catch (error) {
      onErrorToast(error.data.massage);
      // alert("Something Went Wrong");
    }
  };

  const onEdit = category => async e => {
    setSelectedCategory(category);
    categoryRef = category;
    toggleSidebar();
  };

  const CustomRows = ({ category }) => {
    return (
      <>
        <Button.Ripple
          className="btn-icon rounded-circle mr-50"
          color="primary"
          onClick={onEdit(category)}
        >
          <Edit2 size={13} />
        </Button.Ripple>
        <Button.Ripple
          className="btn-icon rounded-circle"
          color="warning"
          onClick={onDelete(category)}
        >
          <Trash size={13} />
        </Button.Ripple>
      </>
    );
  };

  const getParentCategory = id => {
    if (id === null) return "--";
    const index = findValueInArray(categories, id, "category_id");
    return index > -1 ? categories[index]["name"] : "";
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      minWidth: "10px",
    },
    {
      name: "Parent Category",
      selector: "parent_category",
      sortable: true,
      minWidth: "10px",
      cell: row => {
        return <>{getParentCategory(row.parent_id)}</>;
      },
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      minWidth: "50px",
    },
    {
      name: "Count",
      selector: "count",
      sortable: true,
      minWidth: "50px",
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: row => <CustomRows category={row} />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        {
          prevPath === "/apps/ecommerce/category" ? 
          <CardTitle tag="h4">Product Categories</CardTitle> :
          <CardTitle tag="h4">Blog Categories</CardTitle>
        }
        <div className="d-flex mt-md-0 mt-1">
          <Button className="ml-2" color="primary" onClick={toggleSidebar}>
            <Plus size={15} />
            <span className="align-middle ml-50">Add Category</span>
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
        subHeader
        responsive
        columns={columns}
        paginationPerPage={25}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={searchValue.length ? filteredData : categories}
      />
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedCategory={selectedCategory}
        getParentCategory={getParentCategory}
        categoryRef={categoryRef}
        services={services}
        prevPath={prevPath}
        categories={categories}
      />
    </Card>
  );
};

export default Categories;
