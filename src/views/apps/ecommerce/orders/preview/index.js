/* eslint-disable */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

// ** Third Party Components
import axios from "axios";
import { Row, Col, Alert } from "reactstrap";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/base/pages/app-invoice.scss";
import PreviewCard from "./PreviewCard";
import PreviewActions from "./PreviewActions";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import SpinnerComponent from "@src/@core/components/spinner/Fallback-spinner";
import consoleLog from "@console";
import { htmlData } from "./htmlData";
import orderServices from "../../../../../services/orderServices";
const options = [
  {
    value: 1,
    label: "On hold",
  },
  {
    value: 2,
    label: "Processing",
  },
  {
    value: 3,
    label: "Completed",
  },
  {
    value: 4,
    label: "Cancelled",
  },
  {
    value: 5,
    label: "Refunded",
  },
  {
    value: 6,
    label: "Failed",
  },
  {
    value: 7,
    label: "Pending Payment",
  },
];
export default function Preview() {
  const { id } = useParams();
  const pdfRef = useRef();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  // ** Get invoice on mount based on id
  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await orderServices.getOrderById(id);
      consoleLog(res.data.results);
      setData(res.data.results);
      setSelectedOption(
        options.filter(item => item.label === res.data.results.order_status)[0]
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsDataFetching(false);
    }
  };

  const convertHtmlToString = () => {
    return ReactDOMServer.renderToString(
      document.getElementById("order_div").innerHTML
    );
  };

  const onUpdate = async () => {
    setIsLoading(true);

    try {
      const res = await orderServices.updateOrderById(id, {
        order_status: selectedOption.label,
        orders: data.orderedItems,
        previous_status: data.order_status,
        html: `<html><body>${ReactDOMServer.renderToString(
          htmlData(data, selectedOption)
        )}</body></html>`,
        user_email: data.user_email,
      });
      onSuccessToast("Successfully Updated!");
      setData({ ...data, order_status: selectedOption.label });
    } catch (error) {
      onErrorToast(error.data.massage);
    } finally {
      setIsLoading(false);
    }
  };
  if (isDataFetching) {
    return <SpinnerComponent />;
  }
  return !error && data ? (
    <div className="invoice-preview-wrapper">
      {" "}
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <div ref={pdfRef} id="order_div">
            <PreviewCard data={data} />
          </div>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions
            id={id}
            data={data}
            options={options}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            isLoading={isLoading}
            onUpdate={onUpdate}
          />
        </Col>
      </Row>
    </div>
  ) : (
    error && (
      <Alert color="danger">
        {error.status === 404 && (
          <>
            <h4 className="alert-heading">Order not found</h4>
            <div className="alert-body">
              Order with id: {id} doesn't exist. Check list of all orders:{" "}
              <Link to="/apps/ecommerce/orders/list">OrderList List</Link>
            </div>
          </>
        )}
      </Alert>
    )
  );
}

// UPDATE `prduct_inventory` SET `quantity`= `quantity` - 2 WHERE product_id = 235
