// ** React Imports
/*eslint-disable*/
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Repeater from "@components/repeater";

// ** Third Party Components
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash, Edit2, Edit, PlusSquare } from "react-feather";
import Select, { components } from "react-select";
import { selectThemeColors } from "@utils";
import { urls } from "@urls";
import { generateId } from "@utils";
import axiosInstance from "@configs/axiosInstance.js";

import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import ProductDetails from "./ProductDetails";
import countryJson from "@src/assets/data/country.json";
import ClientInfoForm from "./ClientInfoForm";
import Companyformation from "../../../common/Companyformation";
const START_INDEX_OF_INVOICE = "5";

const AddCard = ({
  invoiceItem,
  setInvoiceItem,
  selected,
  setSelected,
  shippingCost,
  setShippingCost,
  discount,
  setDiscount,
  tax,
  setTax,
  reference,
  setReference,
  note,
  setNote,
  invoiceDate,
  setInvoiceDate,
  calculateTotal,
  isEditedInvoice,
  customerInfoRef,
  invoiceNumber,
}) => {
  console.log(invoiceNumber);
  const initialCustomerInfo = {
    customer_name: "",
    customer_email: "",
    customer_address: "",
    customer_country: "",
    customer_contact: "",
  };
  const editableCustomerInfo = {
    ...customerInfoRef,
  };
  const [isEditable, setIsEditable] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(
    customerInfoRef ? editableCustomerInfo : initialCustomerInfo
  );
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [options, setOptions] = useState([
    {
      value: "add-new",
      label: "Add New Customer",
      type: "button",
      color: "flat-success",
    },
  ]);

  useEffect(() => {
    // lastInvoiceId();
    loadInvoiceClient();
  }, []);

  const loadInvoiceClient = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_INVOICE_USERS);
      const invoices = res.data.results;

      const arr = options;

      invoices.map(item =>
        arr.push({ value: item.invoice_client_id, label: item.customer_name })
      );
      setOptions([...arr]);
      setClients(invoices);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEdit = () => setIsEditable(!isEditable);
  // ** Deletes form
  const deleteForm = index => e => {
    e.preventDefault();

    const updatedInvoice = invoiceItem;
    updatedInvoice.splice(index, 1);
    setInvoiceItem([...updatedInvoice]);
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  // ** Vars
  const countryOptions = useMemo(() => {
    return countryJson.map(item => {
      return { value: item.countryCode, label: item.name };
    });
  }, [countryJson]);

  const countryCode = useMemo(() => {
    const countryInformation = countryJson.filter(
      item => customerInfo.customer_country.value === item.countryCode
    )[0];
    return countryInformation ? countryInformation["phone"] : "";
  }, [customerInfo.customer_country]);

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === "button") {
      return (
        <Button
          className="text-left rounded-0"
          color={data.color}
          block
          onClick={() => setOpen(true)}
        >
          <Plus size={14} />{" "}
          <span className="align-middle ml-50">{data.label}</span>
        </Button>
      );
    } else {
      return <components.Option {...props}> {data.label} </components.Option>;
    }
  };

  const totalSumFromArray = array => {
    let sum = 0.0;
    array.map(item => {
      sum =
        sum + parseFloat(item["item_cost"]) * parseInt(item["item_quantity"]);
    });
    return sum.toFixed(2);
  };

  // ** Invoice To OnChange
  const handleInvoiceToChange = data => {
    setValue(data);
    setSelected(clients.filter(i => i.invoice_client_id === data.value)[0]);
  };

  const onChange = e => {
    const { name, value } = e.target;

    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const onAdd = () => {
    addClient();
  };

  const addClient = async () => {
    const data = {
      ...customerInfo,
      // customer_contact: countryCode + customerInfo.customer_contact,
      customer_country: customerInfo.customer_country.label,
    };
    try {
      const res = await axiosInstance().post(urls.ADD_INVOICE_CLIENT, data);
      const oldClient = clients;
      oldClient.push(res.data.result);
      setClients([...oldClient]);
      setOptions([
        ...options,
        {
          value: res.data.result.invoice_client_id,
          label: res.data.result.customer_name,
        },
      ]);
      onSuccessToast("Successfully Inserted!");
      toggleSidebar();
    } catch (error) {
      console.log(error);
      onErrorToast(error.data.massage);
    }
  };

  const onSave = () => {
    toggleEdit();
  };

  const onChangeInvoiceItem = index => e => {
    const { name, value } = e.target;
    const invoiceObject = {
      ...invoiceItem[index],
      [name]: value,
    };
    invoiceItem[index] = invoiceObject;
    setInvoiceItem([...invoiceItem]);
  };

  console.log(customerInfo);

  return (
    <Fragment>
      <Card className="invoice-preview-card mb-0">
        {/* Header */}
        <CardBody className="invoice-padding pb-0">
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <Companyformation />
            <div className="invoice-number-date mt-md-0 mt-2">
              {isEditedInvoice && (
                <div className="d-flex align-items-center justify-content-md-end mb-1">
                  <h4 className="invoice-title">Invoice</h4>
                  <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Hash size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="number"
                      className="invoice-edit-input"
                      value={
                        invoiceNumber
                          ? generateId(START_INDEX_OF_INVOICE, invoiceNumber)
                          : 3171
                      }
                      placeholder="53634"
                      disabled
                    />
                  </InputGroup>
                </div>
              )}
              <div className="d-flex align-items-center mb-1">
                <span className="title">Date:</span>
                <Flatpickr
                  value={invoiceDate.invoice_date}
                  onChange={date =>
                    setInvoiceDate({ ...invoiceDate, invoice_date: date })
                  }
                  className="form-control invoice-edit-input date-picker"
                />
              </div>
              {/* <div className="d-flex align-items-center">
                <span className="title">Due Date:</span>
                <Flatpickr
                  value={invoiceDate.due_date}
                  onChange={date =>
                    setInvoiceDate({ ...invoiceDate, due_date: date })
                  }
                  className="form-control invoice-edit-input due-date-picker"
                />
              </div> */}
            </div>
          </div>
        </CardBody>
        {/* /Header */}

        <hr className="invoice-spacing" />

        {/* Address and Contact */}
        <CardBody className="invoice-padding pt-0">
          <Row className="row-bill-to invoice-spacing">
            <Col className="col-bill-to pl-0" lg="8">
              <h6 className="invoice-to-title">Invoice To:</h6>
              <div className="invoice-customer">
                {!isEditedInvoice && clients !== null ? (
                  <Fragment>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      id="label"
                      value={value}
                      options={options}
                      theme={selectThemeColors}
                      components={{
                        Option: OptionComponent,
                      }}
                      isSearchable={true}
                      onChange={handleInvoiceToChange}
                    />
                    {selected !== null ? (
                      <div className="customer-details mt-1">
                        <p className="mb-25">{selected.customer_name}</p>
                        <p className="mb-25">{selected.customer_email}</p>
                        <p className="mb-25">{selected.customer_address}</p>
                        <p className="mb-25">{selected.customer_country}</p>
                        <p className="mb-0">{selected.customer_contact}</p>
                      </div>
                    ) : null}
                  </Fragment>
                ) : null}
                {isEditedInvoice && (
                  <div className="customer-details mt-1">
                    <p className="mb-25">{customerInfo.customer_name}</p>
                    <p className="mb-25">{customerInfo.customer_email}</p>
                    <p className="mb-25">{customerInfo.customer_address}</p>
                    <p className="mb-25">{customerInfo.customer_country}</p>
                    <p className="mb-0">{customerInfo.customer_contact}</p>
                  </div>
                )}
              </div>
            </Col>
            <Col className="pr-0 mt-xl-0 mt-2" lg="4">
              <h6 className="mb-2">Payment Details:</h6>
              <table>
                <tbody>
                  <tr>
                    <td className="pr-1">Total :</td>
                    <td>
                      <span className="font-weight-bolder">
                        {!isEditable && calculateTotal()} BDT
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </CardBody>
        {/* /Address and Contact */}

        {/* Product Details */}
        <ProductDetails
          invoiceItem={invoiceItem}
          setInvoiceItem={setInvoiceItem}
          deleteForm={deleteForm}
          onChange={onChangeInvoiceItem}
        />

        {/* /Product Details */}

        {/* Invoice Total */}
        <CardBody className="invoice-padding">
          <Row className="invoice-sales-total-wrapper">
            <Col
              className="mt-md-0 mt-3"
              md={{ size: "5", order: 1 }}
              xs={{ size: 12, order: 2 }}
            >
              <div className="d-flex align-items-center mb-1">
                <Label for="salesperson" className="form-label">
                  Reference:
                </Label>
                <Input
                  type="text"
                  className="ml-50"
                  id="salesperson"
                  placeholder="Edward Crowley"
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                />
              </div>
            </Col>
            <Col
              className="d-flex justify-content-end"
              md={{ size: "7", order: 2 }}
              xs={{ size: 12, order: 1 }}
            >
              <div className="invoice-total-wrapper">
                <div className="justify-content-end invoice-total-item mb-1">
                  {isEditable ? (
                    <PlusSquare size="15" onClick={onSave} />
                  ) : (
                    <Edit size="15" onClick={toggleEdit} />
                  )}
                </div>

                <div className="invoice-total-item mb-1">
                  <p className="invoice-total-title">Subtotal:</p>
                  <p className="invoice-total-amount">
                    {totalSumFromArray(invoiceItem)} BDT
                  </p>
                </div>
                <div className="invoice-total-item mb-1">
                  <p className="invoice-total-title">Discount:</p>
                  {!isEditable ? (
                    <p className="invoice-total-amount">{discount} BDT</p>
                  ) : (
                    <>
                      <Input
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                      />{" "}
                      BDT
                    </>
                  )}
                </div>
                <div className="invoice-total-item mb-1">
                  <p className="invoice-total-title">Shipping:</p>
                  {!isEditable ? (
                    <p className="invoice-total-amount">{shippingCost} BDT</p>
                  ) : (
                    <>
                      <Input
                        placeholder="Amount"
                        value={shippingCost}
                        onChange={e => setShippingCost(e.target.value)}
                      />
                      BDT
                    </>
                  )}
                </div>
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Tax:</p>
                  {!isEditable ? (
                    <p className="invoice-total-amount">{tax} %</p>
                  ) : (
                    <>
                      <Input
                        placeholder="Amount"
                        value={tax}
                        onChange={e => setTax(e.target.value)}
                      />
                      BDT
                    </>
                  )}
                </div>

                <hr className="my-50" />
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Total:</p>
                  <p className="invoice-total-amount">
                    {!isEditable && calculateTotal()} BDT
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Total */}

        <hr className="invoice-spacing mt-0" />

        {/* Invoice Note */}
        <CardBody className="invoice-padding py-0">
          <Row>
            <Col>
              <FormGroup className="mb-2">
                <Label for="note" className="form-label font-weight-bold">
                  Note:
                </Label>
                <Input
                  type="textarea"
                  rows="2"
                  id="note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
      </Card>

      <Sidebar
        size="lg"
        open={open}
        title="Add Payment"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={toggleSidebar}
      >
        <ClientInfoForm
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          setOpen={setOpen}
          onChange={onChange}
          onAdd={onAdd}
          countryOptions={countryOptions}
          countryCode={countryCode}
        />
      </Sidebar>
    </Fragment>
  );
};

export default AddCard;
