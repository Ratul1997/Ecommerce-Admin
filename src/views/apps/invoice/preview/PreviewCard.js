/*eslint-disable*/
// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";

import { generateId } from "@utils";
import { convertTimeStampToString } from "../../media/files/utils/utils";
import Companyformation from "../../../common/Companyformation";

const START_INDEX_OF_INVOICE = "5";

const PreviewCard = ({ data }) => {
  const invoice = JSON.parse(data.invoice_data);

  const invoiceItem = invoice.invoiceItem;

  const totalSumFromArray = array => {
    let sum = 0.0;
    array.map(item => {
      sum =
        sum + parseFloat(item["item_cost"]) * parseInt(item["item_quantity"]);
    });
    return sum.toFixed(2);
  };

  return data !== null ? (
    <Card className="invoice-preview-card">
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
          <Companyformation/>
           <div className="mt-md-0 mt-2">
            <h4 className="invoice-title">
              Invoice{" "}
              <span className="invoice-number">
                #{generateId(START_INDEX_OF_INVOICE, data.invoice_id)}
              </span>
            </h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">Date Issued:</p>
              <p className="invoice-date">
                {convertTimeStampToString(data.invoice_date).stringDate}
              </p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className="invoice-spacing" />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0">
        <Row className="invoice-spacing">
          <Col className="p-0" lg="8">
            <h6 className="mb-2">Invoice To:</h6>
            <h6 className="mb-25">{data.customer_name}</h6>
            <CardText className="mb-25">{data.customer_email}</CardText>
            <CardText className="mb-25">{data.customer_address}</CardText>
            <CardText className="mb-25">{data.customer_country}</CardText>
            <CardText className="mb-0">{data.customer_contact}</CardText>
          </Col>
          <Col className="p-0 mt-xl-0 mt-2" lg="4">
            <h6 className="mb-2">Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className="pr-1">Total:</td>
                  <td>
                    <span className="font-weight-bolder">{data.total} BDT</span>
                  </td>
                </tr>
                {/* <tr>
                  <td className="pr-1">Bank name:</td>
                  <td>{data.paymentDetails.bankName}</td>
                </tr>
                <tr>
                  <td className="pr-1">Country:</td>
                  <td>{data.paymentDetails.country}</td>
                </tr>
                <tr>
                  <td className="pr-1">IBAN:</td>
                  <td>{data.paymentDetails.iban}</td>
                </tr>
                <tr>
                  <td className="pr-1">SWIFT code:</td>
                  <td>{data.paymentDetails.swiftCode}</td>
                </tr> */}
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className="py-1">Item</th>
            <th className="py-1">Cost</th>
            <th className="py-1">Qty</th>
            <th className="py-1">Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItem &&
            invoiceItem.map((item, key) => {
              return (
                <tr key={key}>
                  <td className="py-1">
                    <p className="card-text font-weight-bold mb-25">
                      {item.item_name}
                    </p>
                  </td>
                  <td className="py-1">
                    <span className="font-weight-bold">{item.item_cost}</span>
                  </td>
                  <td className="py-1">
                    <span className="font-weight-bold">
                      {item.item_quantity}
                    </span>
                  </td>
                  <td className="py-1">
                    <span className="font-weight-bold">
                      {parseFloat(item.item_cost) *
                        parseFloat(item.item_quantity)} BDT
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className="invoice-padding pb-0">
        <Row className="invoice-sales-total-wrapper">
          <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}>
            <CardText className="mb-0">
              <span className="font-weight-bold">Reference:</span>{" "}
              <span className="ml-75">{data.reference}</span>
            </CardText>
          </Col>
          <Col
            className="d-flex justify-content-end"
            md="6"
            order={{ md: 2, lg: 1 }}
          >
            <div className="invoice-total-wrapper">
              <div className="invoice-total-item">
                <p className="invoice-total-title">Subtotal:</p>
                <p className="invoice-total-amount">{invoiceItem && totalSumFromArray(invoiceItem)} BDT</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">Discount:</p>
                <p className="invoice-total-amount">{invoice.discount} BDT</p>
              </div>

              <div className="invoice-total-item">
                <p className="invoice-total-title">Shipping:</p>
                <p className="invoice-total-amount">
                  {invoice.shippingCost} BDT
                </p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">Tax:</p>
                <p className="invoice-total-amount">{invoice.tax} %</p>
              </div>
              <hr className="my-50" />
              <div className="invoice-total-item">
                <p className="invoice-total-title">Total:</p>
                <p className="invoice-total-amount">{data.total} BDT</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className="invoice-spacing" />

      {/* Invoice Note */}
      <CardBody className="invoice-padding pt-0">
        <Row>
          <Col sm="12">
            <span className="font-weight-bold">Note: </span>
            <span>{invoice.note}</span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null;
};

export default PreviewCard;
