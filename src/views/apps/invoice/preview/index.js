/*eslint-disable*/
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

// ** Third Party Components
import axios from "axios";
import { Row, Col, Alert } from "reactstrap";

// ** Invoice Preview Components
import PreviewCard from "./PreviewCard";
import PreviewActions from "./PreviewActions";
import SendInvoiceSidebar from "../shared-sidebar/SidebarSendInvoice";
import AddPaymentSidebar from "../shared-sidebar/SidebarAddPayment";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/base/pages/app-invoice.scss";

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams();
  const pdfRef = useRef();

  // ** States
  const [data, setData] = useState(null);
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

  // ** Get invoice on mount based on id
  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_INVOICE_BY_ID + id);
      setData(res.data.results)
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {};
  return data !== null && data !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <div ref={pdfRef}>
            <PreviewCard data={data} />
          </div>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions
            id={id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}
            pdfRef={pdfRef}
          />
        </Col>
      </Row>
      <SendInvoiceSidebar
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen}
      />
      <AddPaymentSidebar
        toggleSidebar={toggleAddSidebar}
        open={addPaymentOpen}
      />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Invoice not found</h4>
      <div className="alert-body">
        Invoice with id: {id} doesn't exist. Check list of all invoices:{" "}
        <Link to="/invoice/list">Invoice List</Link>
      </div>
    </Alert>
  );
};

export default InvoicePreview;
