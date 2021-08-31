/*eslint-disable*/
// ** Invoice Add Components
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AddCard from "./AddCard";
import AddActions from "./AddActions";

// ** Third Party Components
import { Row, Col, Alert } from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
import { generateId } from "@utils";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
const InvoiceAdd = () => {
  const location = useLocation();
  const params = useParams();
  

  const initialInvoiceDate = {
    invoice_date: new Date(),
  };
  const initialNote =
    "It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!";

  const [invoiceDate, setInvoiceDate] = useState(initialInvoiceDate);
  const [invoiceItem, setInvoiceItem] = useState([]);
  const [selected, setSelected] = useState(null);
  const [shippingCost, setShippingCost] = useState("0.0");
  const [discount, setDiscount] = useState("0.0");
  const [tax, setTax] = useState("15.0");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState(initialNote);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditedInvoice, setIsEditedInvoice] = useState(false);
  const [customerInfoRef, setCustomerInfoRef] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const invoiceIdRef = useRef(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      const { id } = params;
      loadInvoice(id);
    }
  }, []);

  const setData = data => {
    
    const invoicesItemsData = JSON.parse(data.invoice_data);
    setTax(invoicesItemsData.tax);
    setDiscount(invoicesItemsData.discount);
    setShippingCost(invoicesItemsData.shippingCost);
    setReference(data.reference);
    setInvoiceItem(invoicesItemsData.invoiceItem);
    setInvoiceDate({ ...invoiceDate, invoice_date: data.invoice_date });
    setCustomerInfoRef({
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_address: data.customer_address,
      customer_country: data.customer_country,
      customer_contact: data.customer_contact,
    });
    setInvoiceNumber(data.invoice_id);
  };
  const loadInvoice = async id => {
    try {
      const res = await axiosInstance().get(urls.GET_INVOICE_BY_ID + id);
      setData(res.data.results)
      setIsEditedInvoice(true);
      setData(res.data.results);
      
    } catch (error) {
      setErrorCode(error.status);
      
    }
  };

  const percentage = (percent, total) => {
    return ((percent / 100) * total).toFixed(2);
  };

  const totalSumFromArray = array => {
    let sum = 0.0;
    array.map(item => {
      sum =
        sum + parseFloat(item["item_cost"]) * parseInt(item["item_quantity"]);
    });
    return sum.toFixed(2);
  };
  const calculateTotal = () => {
    const totalCost =
      (parseFloat(totalSumFromArray(invoiceItem)) || 0.0) +
      (parseFloat(shippingCost) || 0.0);
    const total = totalCost - parseFloat(discount) || 0.0;

    const percent = parseFloat(percentage(parseFloat(tax), total)) || 0.0;

    
    return (total || 0.0) + percent;
  };

  const invoiceRef = useRef(null);

  const formatInvoice = () => {
    const invoiceItemObj = {
      invoiceItem: invoiceItem,
      shippingCost: shippingCost,
      discount: discount,
      tax: tax,
      note: note,
    };
    const invoiceData = {
      invoice_data: JSON.stringify(invoiceItemObj),
      reference: reference,
      invoice_date: invoiceDate.invoice_date,
      total: calculateTotal(),
    };
    if (!isEditedInvoice)
      invoiceData["invoice_client_id"] = selected.invoice_client_id;

    return invoiceData;
  };
  const onSave = () => {
    if (!selected) {
      onErrorToast("Client Information is empty!");
      return;
    }
    const invoiceData = formatInvoice();
    
    onUploadInvoice(invoiceData);
  };

  const onUploadInvoice = async invoiceData => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().post(urls.ADD_INVOICE, invoiceData);
      
      invoiceIdRef.current = res.data.results.invoice_id;
      
      onSuccessToast("Successfully Created!");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };

  const onUpdate = () => {
    
    onUpdateInvoice(formatInvoice());
  };
  const onUpdateInvoice = async invoiceData => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().put(
        urls.UPDATE_INVOICE_BY_ID + invoiceNumber,
        invoiceData
      );
      
      onSuccessToast("Successfully Updated!");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };

  return (
    <div className="invoice-add-wrapper">
      {!errorCode ? (
        <Row className="invoice-add">
          <Col xl={9} md={8} sm={12}>
            <AddCard
              invoiceRef={invoiceRef}
              invoiceItem={invoiceItem}
              setInvoiceItem={setInvoiceItem}
              selected={selected}
              setSelected={setSelected}
              shippingCost={shippingCost}
              setShippingCost={setShippingCost}
              discount={discount}
              setDiscount={setDiscount}
              tax={tax}
              setTax={setTax}
              reference={reference}
              setReference={setReference}
              note={note}
              setNote={setNote}
              invoiceDate={invoiceDate}
              setInvoiceDate={setInvoiceDate}
              calculateTotal={calculateTotal}
              isEditedInvoice={isEditedInvoice}
              customerInfoRef={customerInfoRef}
              invoiceNumber={invoiceNumber}
            />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <AddActions
              onSave={onSave}
              isLoading={isLoading}
              invoiceIdRef={invoiceIdRef}
              isEditedInvoice={isEditedInvoice}
              invoiceNumber={invoiceNumber}
              onUpdate={onUpdate}
            />
          </Col>
        </Row>
      ) : (
        <Alert color="danger">
          <h4 className="alert-heading">Invoice not found</h4>
          <div className="alert-body">
            Invoice with id: {params.id} doesn't exist. Check list of all invoices:{" "}
            <Link to="/apps/invoice/list">Invoice List</Link>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default InvoiceAdd;
