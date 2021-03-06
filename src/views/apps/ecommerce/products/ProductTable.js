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
  UncontrolledDropdown,
} from "reactstrap";

import { urls } from "@urls";
import consoleLog from "@console";
import axiosInstance from "@src/configs/axiosInstance";
import { Link, Redirect, useHistory } from "react-router-dom";
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
  Trash,
  Star,
  Heart,
} from "react-feather";

// ** Third Party Components
import classnames from "classnames";
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
import {
  checkImageTypeOrNot,
  checkApplicationType,
  convertTimeStampToString,
} from "../../media/files/utils/utils";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
import productServices from "../../../../services/productServices";

// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

const status = {
  1: { title: "Published", color: "light-success" },
  2: { title: "Draft", color: "light-primary" },
  3: { title: "UnPublished", color: "light-danger" },
  4: { title: "Pending", color: "light-info" },
};
const inventoryStatus = {
  "In Stock": "light-success",
  "Out Of Stock": "light-danger",
};

const CustomFileTime = ({ row }) => {
  const dates = convertTimeStampToString(row.updated_at);

  return (
    <div className="text-truncate">
      <span className="d-block  text-truncate">{dates.stringDate}</span>
    </div>
  );
};

const CustomPriceRow = ({ row }) => {
  return (
    <div className="text-truncate d-inline">
      {row.discount_price ? (
        <>
          <s className="d-block  text-truncate">{row.regular_price}</s>
          {row.discount_price}
        </>
      ) : (
        <>{row.regular_price}</>
      )}
    </div>
  );
};

const CustomFeaturedIcon = ({ row, updateProductList }) => {
  const onUpdate = async () => {
    try {
      await productServices.updateFeaturedProductById(row.product_id, {
        featured: !row.featured_product,
      });
      updateProductList(row.product_id, "Featured");
      onSuccessToast("Updated");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };

  return (
    <div className="text-truncate d-inline">
      <Link>
        {" "}
        <Star
          size={18}
          className={classnames({
            "text-warning fill-current": row.featured_product,
          })}
          onClick={onUpdate}
        />
      </Link>
    </div>
  );
};

const CustomPopularProductIcon = ({ row, updateProductList }) => {
  const onUpdate = async () => {
    try {
      await productServices.updatePopularProductById(row.product_id, {
        popular: !row.popular_product,
      });
      updateProductList(row.product_id, "Popular");
      onSuccessToast("Updated");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };

  return (
    <div className="text-truncate d-inline">
      <Link>
        <Heart
          size={18}
          className={classnames({
            "text-warning fill-current":
              row.popular_product === 0 ? false : true,
          })}
          onClick={onUpdate}
        />
      </Link>
    </div>
  );
};

const CustomCategoryRow = ({ row }) => {
  const { categories } = row;
  return (
    <div className="text-truncate d-inline">
      {categories.map(item => (
        <>
          <Badge color="light-primary" pill>
            {item.category_name}
          </Badge>
        </>
      ))}
    </div>
  );
};
const columns = updateProductList => {
  return [
    {
      name: "#",
      minWidth: "107px",
      selector: "id",
      cell: row => (
        <Link
          to={`/apps/ecommerce/product/edit/${row.product_id}`}
          target="_blank"
        >{`#${row.product_id}`}</Link>
      ),
    },

    {
      name: "Product Name",
      selector: "product_name",
      sortable: true,
      minWidth: "250px",
      // cell: row => (
      //   <>{`${row.product_name} dsfsdfsdfsdfsdfsdfsdfsdsdsdsdsdsdsdsd`}</>
      // ),
    },
    {
      name: "SKU",
      selector: "sku",
    },
    {
      name: "Last Updated",
      selector: "updated_at",
      sortable: true,
      minWidth: "100px",
      cell: row => <CustomFileTime row={row} />,
    },

    {
      name: "Price",
      selector: "regular_price",
      sortable: true,
      minWidth: "100px",
      cell: row => <CustomPriceRow row={row} />,
    },
    {
      name: "Category",
      selector: "categories",
      minWidth: "150px",
      sortable: true,
      cell: row => <CustomCategoryRow row={row} />,
    },

    {
      name: "Featured",
      selector: "featured_product",
      sortable: true,
      minWidth: "100px",
      cell: row => (
        <CustomFeaturedIcon row={row} updateProductList={updateProductList} />
      ),
    },

    {
      name: "Popular",
      selector: "popular_product",
      sortable: true,
      minWidth: "100px",
      cell: row => (
        <CustomPopularProductIcon
          row={row}
          updateProductList={updateProductList}
        />
      ),
    },
    {
      name: "Stock Status",
      selector: "inventory_status",
      sortable: true,
      minWidth: "100px",
      cell: row => {
        return (
          <>
            <Badge color={inventoryStatus[row.inventory_status]} pill>
              {row.inventory_status}
            </Badge>
          </>
        );
      },
    },
    {
      name: "Status",
      selector: "product_status_id",
      sortable: true,
      minWidth: "150px",
      cell: row => {
        return (
          <>
            <Badge color={status[row.product_status_id].color} pill>
              {status[row.product_status_id].title}
            </Badge>
          </>
        );
      },
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: row => {
        const onDelete = async () => {
          try {
            await productServices(id);
            onSuccessToast("Deleted Successfully!");
            updateProductList(row.product_id, "Deleted");
          } catch (error) {
            onErrorToast(error.data.massage);
            consoleLog(error);
          }
        };
        return (
          <div className="d-flex">
            <UncontrolledDropdown>
              <DropdownToggle className="pr-1" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="w-100" onClick={onDelete}>
                  <Trash size={15} />
                  <span className="align-middle ml-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Link
              to={`/apps/ecommerce/product/edit/${row.product_id}`}
              target="_blank"
            >
              <Edit size={15} />
            </Link>
          </div>
        );
      },
    },
  ];
};

export default function ProductTable({ products, updateProductList }) {
  const data = products;
  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const PAGE_NUMBER = 10;

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
      5: { title: "Applied", color: "light-info" },
    };

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith = item.product_name
          .toLowerCase()
          .startsWith(value.toLowerCase());
        const includes = item.product_name
          .toLowerCase()
          .includes(value.toLowerCase());

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
        searchValue.length
          ? filteredData.length / PAGE_NUMBER
          : data.length / PAGE_NUMBER || 1
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
        <CardTitle tag="h4">All Products</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          {/* <UncontrolledButtonDropdown>
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
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}

          <Link to="/apps/ecommerce/addProduct" target="_blank">
            <Button className="ml-2" color="primary">
              <Plus size={15} />
              <span className="align-middle ml-50">Add Product</span>
            </Button>
          </Link>
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
        responsive
        // selectableRows
        columns={columns(updateProductList)}
        paginationPerPage={PAGE_NUMBER}
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
