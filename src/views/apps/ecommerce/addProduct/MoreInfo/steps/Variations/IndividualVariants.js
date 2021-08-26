/* eslint-disable */
import React, { useMemo, Fragment, useState, useContext } from "react";
import AppCollapse from "@components/app-collapse";
import {
  Col,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import { Trash2, X } from "react-feather";
import { selectThemeColors } from "@utils";
import image from "@src/assets/images/icons/image.png";
import Select from "react-select";
import { urls } from "@urls";
import { ProductDataContext } from "../../..";
import { backOrdersOptions, stockOptions } from "../../../Constants";

export default function IndividualVariants({
  item,
  getOptions,
  index,
  onChange,
  toggleSidebar,
  onRemove,
}) {
  const { isEditable, id } = useContext(ProductDataContext);
  const {
    combinations,
    sku,
    discount_price,
    quantity,
    featured_img,
    manageStock,
    stock_threshold,
    allowBackOrders,
    inventory_status,
  } = item;

  const getOptionName = useMemo(() => {
    let combo = "";
    for (let char of combinations) {
      const id = parseInt(char);
      combo =
        combo + " " + getOptions.filter(item => item.value === id)[0].label;
    }
    return combo;
  }, [combinations]);
  const renderTitle = () => {
    return (
      <Row>
        <Col>
          <Label>Combinations:</Label>
        </Col>
        <Col>
          <Label>{getOptionName}</Label>
        </Col>
      </Row>
    );
  };
  const renderContent = () => {
    return (
      <Fragment>
        <Row className="justify-content-end mx-0">
          {!isEditable && <Trash2 color="red" onClick={onRemove(index)} />}
        </Row>
        <Row>
          <Col sm="6">
            <div>
              <img
                className="rounded m-1"
                src={
                  featured_img
                    ? urls.UPLOADED_LINK + featured_img.file_name
                    : image
                }
                onClick={isEditable ? null : onChange(index, "image")}
                alt="featured img"
                width="100"
                height="100"
              />
            </div>
          </Col>
          <Col sm="6">
            <FormGroup className="mb-2">
              <Label>SKU</Label>
              <Input
                onChange={onChange(index)}
                value={sku || ""}
                name="sku"
              disabled={isEditable}
              />
            </FormGroup>
            <CustomInput
              type="checkbox"
              defaultChecked={false}
              id={`manage-stock-${index}`}
              name={`manageStock`}
              value={manageStock}
              label="Manage Stock?"
              onChange={onChange(index)}
              disabled={isEditable}
              defaultChecked={manageStock}
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col sm="6">
            <FormGroup className="mb-2">
              <Label>Regular Price</Label>
              <Input
                onChange={onChange(index)}
                name="regular_price"
                value={item.regular_price}
                type="number"
                disabled={isEditable}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup className="mb-2">
              <Label>Selling Price</Label>
              <Input
                type="number"
                onChange={onChange(index)}
                name={`discount_price`}
                disabled={isEditable}
                value={discount_price}
              />
            </FormGroup>
          </Col>
        </Row>
        {manageStock && (
          <>
            <Row>
              <Col sm="6">
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  onChange={onChange(index)}
                  name={`quantity`}
                  placeholder="Amount"
                  value={quantity}
                  disabled={isEditable}
                />
              </Col>
              <Col sm="6">
                <Label>Low stock threshold</Label>
                <Input
                  type="number"
                  placeholder="Low stock threshold"
                  value={stock_threshold}
                  name="stock_threshold"
                  onChange={onChange(index)}
                  disabled={isEditable}
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col sm="12">
                <Label>Allow backorders?</Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="allowBackOrders"
                  value={allowBackOrders}
                  onChange={onChange(index, "select", "allowBackOrders")}
                  options={backOrdersOptions}
                  isClearable
                  isDisabled={isEditable}
                />
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col sm="12">
            <Label>Stock status</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              name="inventory_status"
              value={inventory_status}
              options={stockOptions}
              onChange={onChange(index, "select", "inventory_status")}
              isClearable
              isDisabled={isEditable}
            />
          </Col>
        </Row>
      </Fragment>
    );
  };
  const data = [
    {
      title: renderTitle(),
      content: renderContent(),
    },
  ];
  return (
    <>
      <AppCollapse data={data} />
    </>
  );
}
