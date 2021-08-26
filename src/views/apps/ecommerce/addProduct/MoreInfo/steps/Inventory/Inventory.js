/* eslint-disable */

import { Fragment, useState, useContext } from "react";

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
} from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { ProductDataContext } from "../../..";
import { backOrdersOptions,stockOptions } from "../../../Constants";

const Inventory = () => {
  const { productData, setProductData } = useContext(ProductDataContext);

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
                defaultChecked={productData.manageStock}
                onChange={e =>
                  setProductData({
                    ...productData,
                    manageStock: e.target.checked,
                  })
                }
                label="Enable stock management at product level"
              />
            </Col>
          </FormGroup>
          {productData.manageStock && (
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
      </Fragment>
    </>
  );
};
export default Inventory;
