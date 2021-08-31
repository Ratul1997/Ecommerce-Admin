/*eslint-disable*/

import { Fragment, useState, useContext, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  CustomInput,
  Label,
  Spinner,
  Row,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { backOrdersOptions, stockOptions } from "../../addProduct/Constants";
import { findValueInArray } from "../../../../../utility/Utils";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import SidebarInventory from "./SideBar";

const ExpandableTable = ({ data, type, options }) => {
  const initialState = {
    manageStock: data.manageStock === 1 ? true : false,
    stock_threshold: data.stock_threshold,
    quantity: data.quantity,
    inventory_status:
      stockOptions[
        findValueInArray(stockOptions, data.inventory_status, "label")
      ],
    allowBackOrders:
      backOrdersOptions[
        findValueInArray(backOrdersOptions, data.allowBackOrders, "label")
      ],
  };
  const [inventory, setInventory] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ** Function to toggle sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const onSave = () => {
    const updated = {
      ...inventory,
      allowBackOrders:
        inventory.allowBackOrders !== undefined
          ? inventory.allowBackOrders.label
          : null,
      inventory_status: inventory.inventory_status.label,
      previousManageStock: data.manageStock,
    };
    onUploadData(updated);
  };

  const onUploadData = async updatedData => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().patch(
        urls.UPDATE_INVENTORIES_BY_ID + data.product_id,
        { data: updatedData }
      );
      onSuccessToast("Updated!");
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      
      setIsLoading(false);
      onErrorToast(error.data.massage);
    }
  };
  const onSidBarOpen = () => {
    toggleSidebar();
  };
  const getVariation = () => {
    const combinationsName = () => {
      let combo = "";
      for (let char of data.product_variant_combinations) {
        const id = parseInt(char);
        combo =
          combo + " " + options.filter(item => item.value === id)[0].label;
      }
      return combo;
    };
    return (
      <FormGroup row>
        <Col sm="3">
          <h5 >Variations</h5>
        </Col>
        <Col sm="9">{combinationsName()}</Col>
      </FormGroup>
    );
  };
  return (
    <div className="m-1">
      {type !== undefined && type === "variants" ? (
        getVariation()
      ) : (
        <div className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0">
          <h6 className="text-warning" onClick={onSidBarOpen}>
            <i>
              <u>Display Variations</u>
            </i>
          </h6>
        </div>
      )}
      <Fragment>
        <Form>
          <FormGroup row>
            <Label sm="3" for="manage_stock">
              Manage Stock
            </Label>
            <Col sm="9">
              <CustomInput
                type="checkbox"
                id={`manage-stock-${data.product_id}`}
                defaultChecked={inventory.manageStock}
                value={inventory.manageStock}
                onChange={e =>
                  setInventory({ ...inventory, manageStock: e.target.checked })
                }
                label="Enable stock management at product level"
              />
            </Col>
          </FormGroup>
          {inventory.manageStock && (
            <>
              <FormGroup row>
                <Label sm="3" for="stock_quantity">
                  Stock Quantity
                </Label>
                <Col sm="9">
                  <Input
                    type="number"
                    name="stock_quantity"
                    value={inventory.quantity}
                    placeholder="Amount"
                    onChange={e =>
                      setInventory({ ...inventory, quantity: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm="3" for="low_stock_threshold">
                  Low stock threshold
                </Label>
                <Col sm="9">
                  <Input
                    type="text"
                    name="low_stock_threshold"
                    value={inventory.stock_threshold}
                    placeholder="Amount"
                    onChange={e =>
                      setInventory({
                        ...inventory,
                        stock_threshold: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm="3" for="stock_status">
                  Allow backorders?
                </Label>
                <Col sm="9">
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    name="clear"
                    options={backOrdersOptions}
                    isClearable
                    value={inventory.allowBackOrders}
                    onChange={data =>
                      setInventory({ ...inventory, allowBackOrders: data })
                    }
                  />
                </Col>
              </FormGroup>
            </>
          )}
          <FormGroup row>
            <Label sm="3" for="stock_status">
              Stock status
            </Label>
            <Col sm="9">
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={stockOptions}
                isClearable
                onChange={data =>
                  setInventory({ ...inventory, inventory_status: data })
                }
                value={inventory.inventory_status}
              />
            </Col>
          </FormGroup>
        </Form>

        <div
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0"
          onClick={isLoading ? null : onSave}
        >
          <Button color="primary">
            {isLoading && <Spinner size="sm" color="white" />}
            Save
          </Button>
        </div>
      </Fragment>
      {type === undefined && (
        <SidebarInventory
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          parentProductId={data.product_id}
        />
      )}
    </div>
  );
};

export default ExpandableTable;
