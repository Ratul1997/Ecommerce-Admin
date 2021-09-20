/* eslint-disable */

import { Fragment, useState, useContext, useEffect } from "react";

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
} from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { ProductDataContext } from "../../..";
import { backOrdersOptions, stockOptions } from "../../../Constants";
import axiosInstance from "../../../../../../../configs/axiosInstance";
import { urls } from "../../../../../../../utility/Urls";
import { onErrorToast, onSuccessToast } from "../../../../../../common/Toaster";

const Inventory = () => {
  const { productData, setProductData, isEditable, id } =
    useContext(ProductDataContext);
  const [newManageStockStatus, setNewManageStockStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isEditable) {
      setNewManageStockStatus(productData.manageStock);
    }
  }, [isEditable, productData.manageStock]);

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      await axiosInstance().patch(urls.UPDATE_INVENTORIES_BY_ID + id, {
        data: {
          allowBackOrders: productData.allowBackOrders
            ? productData.allowBackOrders.label
            : null,
          inventory_status: productData.inventory_status
            ? productData.inventory_status.label
            : null,
          previousManageStock: productData.manageStock,
          stock_threshold: productData.stock_threshold,
          quantity: productData.quantity,
          manageStock: newManageStockStatus,
          sku: productData.sku,
        },
      });
      setIsLoading(false);
      setProductData({ ...productData, manageStock: newManageStockStatus });
      onSuccessToast("Updated!");
    } catch (error) {
      setIsLoading(false);
      if (error.status && error.status === 404) {
        onErrorToast(error.data.massage);
      } else {
        onErrorToast("Internal Server Error");
      }
    }
  };
  return (
    <>
      <Fragment>
        <div className="content-header">
          <h5 className="mb-0">Inventory</h5>
        </div>
        <Form>
          <FormGroup row>
            <Label sm="3" for="sku">
              SKU
            </Label>
            <Col sm="9">
              <Input
                type="text"
                name="sku"
                id="sku"
                placeholder="SKU"
                onChange={e =>
                  setProductData({ ...productData, sku: e.target.value })
                }
                value={productData.sku}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm="3" for="manage_stock">
              Manage Stock
            </Label>
            <Col sm="9">
              <CustomInput
                type="checkbox"
                id="manage-stock"
                checked={
                  isEditable ? newManageStockStatus : productData.manageStock
                }
                onChange={e =>
                  isEditable
                    ? setNewManageStockStatus(e.target.checked)
                    : setProductData({
                        ...productData,
                        manageStock: e.target.checked,
                      })
                }
                label="Enable stock management at product level"
              />
            </Col>
          </FormGroup>
          {((productData.manageStock && !isEditable) ||
            (newManageStockStatus && isEditable)) && (
            <>
              <FormGroup row>
                <Label sm="3" for="stock_quantity">
                  Stock Quantity
                </Label>
                <Col sm="9">
                  <Input
                    type="number"
                    name="stock_quantity"
                    id="stock_quantity"
                    value={productData.quantity}
                    placeholder="Amount"
                    onChange={e =>
                      setProductData({
                        ...productData,
                        quantity: parseInt(e.target.value),
                      })
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
                    id="low_stock_threshold"
                    value={productData.stock_threshold}
                    placeholder="Amount"
                    onChange={e =>
                      setProductData({
                        ...productData,
                        stock_threshold: parseInt(e.target.value),
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
                    onChange={data =>
                      setProductData({
                        ...productData,
                        allowBackOrders: data,
                      })
                    }
                    isClearable
                    value={productData.allowBackOrders}
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
                  setProductData({
                    ...productData,
                    inventory_status: data,
                  })
                }
                value={productData.inventory_status}
              />
            </Col>
          </FormGroup>
        </Form>
        {isEditable && (
          <Button color="primary" onClick={isLoading ? null : onUpdate}>
            {isLoading && <Spinner color="white" size="sm" />}Update
          </Button>
        )}
      </Fragment>
    </>
  );
};
export default Inventory;
