/* eslint-disable semi */

import { Fragment } from "react";

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
  Label
} from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" }
];
const Inventory = () => {
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
              <Input type="text" name="sku" id="sku" placeholder="SKU" />
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
                defaultChecked={false}
                label="Enable stock management at product level"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm="3" for="stock_quantity">
              Stock Quantity
            </Label>
            <Col sm="9">
              <Input
                type="text"
                name="stock_quantity"
                id="stock_quantity"
                placeholder="Amount"
              />
            </Col>
          </FormGroup>

          {/* <FormGroup row>
            <Label sm="3" for="solid_individuality">
              Allow backorders?
            </Label>
            <Col sm="9">
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={colourOptions[1]}
                name="clear"
                options={colourOptions}
                isClearable
              />
            </Col>
          </FormGroup> */}
          <FormGroup row>
            <Label sm="3" for="low_stock_threshold">
              Low stock threshold
            </Label>
            <Col sm="9">
              <Input
                type="text"
                name="low_stock_threshold"
                id="low_stock_threshold"
                placeholder="Low stock threshold"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="3" for="solid_individuality">
              Sold individually
            </Label>
            <Col sm="9">
              <CustomInput
                type="checkbox"
                id="solid_individuality"
                defaultChecked={false}
                label="Enable this to only allow one of this item to be bought in a single order"
              />
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    </>
  );
};
export default Inventory;
