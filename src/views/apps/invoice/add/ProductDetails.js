/* eslint-disable  */

/*eslint-disable*/
import { Fragment, useState, useEffect } from "react";

// ** Custom Components
import Repeater from "@components/repeater";

// ** Third Party Components
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash } from "react-feather";

import {
  CardBody,
  CardText,
  Row,
  Col,
  Input,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
export default function ProductDetails({
  invoiceItem,
  setInvoiceItem,
  count,
  deleteForm,
  setCount,
  onChange,
}) {
  const addRow = () => {
    const itemObject = {
      item_name: "",
      item_cost: "0",
      item_quantity: "1",
    };
    const updatedInvoice = invoiceItem;
    updatedInvoice.push(itemObject);
    setInvoiceItem([...updatedInvoice]);
  };

  const price = (index) => {
    return parseFloat(invoiceItem[index]["item_cost"]) *
      parseInt(invoiceItem[index]["item_quantity"]);
  };
  return (
    <CardBody className="invoice-padding invoice-product-details">
      <Repeater count={invoiceItem.length}>
        {i => {
          const Tag = i === 0 ? "div" : SlideDown;
          console.log(i);
          return (
            <Tag key={i} className="repeater-wrapper">
              <Row>
                <Col
                  className="d-flex product-details-border position-relative pr-0"
                  sm="12"
                >
                  <Row className="w-100 pr-lg-0 pr-1 py-2">
                    <Col className="mb-lg-0 mb-2 mt-lg-0 mt-2" lg="5" sm="12">
                      <CardText className="col-title mb-md-50 mb-0">
                        Item
                      </CardText>
                      <Input
                        type="textarea"
                        rows="4"
                        name="item_name"
                        value={invoiceItem[i]["item_name"]}
                        onChange={onChange(i)}
                      />
                    </Col>
                    <Col className="my-lg-0 my-2" lg="3" sm="12">
                      <CardText className="col-title mb-md-2 mb-0">
                        Cost
                      </CardText>
                      <Input
                        type="number"
                        placeholder="BDT"
                        name="item_cost"
                        value={invoiceItem[i]["item_cost"]}
                        onChange={onChange(i)}
                      />
                    </Col>
                    <Col className="my-lg-0 my-2" lg="2" sm="12">
                      <CardText className="col-title mb-md-2 mb-0">
                        Qty
                      </CardText>
                      <Input
                        type="number"
                        placeholder="1"
                        name="item_quantity"
                        value={invoiceItem[i]["item_quantity"]}
                        onChange={onChange(i)}
                      />
                    </Col>
                    <Col className="my-lg-0 mt-2" lg="2" sm="12">
                      <CardText className="col-title mb-md-50 mb-0">
                        Price
                      </CardText>
                      <CardText className="mb-0">
                        {price(i)} BDT
                      </CardText>
                    </Col>
                  </Row>
                  <div className="d-flex flex-column align-items-center justify-content-start border-left invoice-product-actions py-50 px-25">
                    <X
                      size={18}
                      className="cursor-pointer"
                      onClick={deleteForm(i)}
                    />
                  </div>
                </Col>
              </Row>
            </Tag>
          );
        }}
      </Repeater>
      <Row className="mt-1">
        <Col sm="12" className="px-0">
          <Button.Ripple
            color="primary"
            size="sm"
            className="btn-add-new"
            onClick={addRow}
          >
            <Plus size={14} className="mr-25"></Plus>
            <span className="align-middle">Add Item</span>
          </Button.Ripple>
        </Col>
      </Row>
    </CardBody>
  );
}
