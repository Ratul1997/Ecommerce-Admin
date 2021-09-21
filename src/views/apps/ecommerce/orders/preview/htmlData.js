/*eslint-disable*/
// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";

import { generateId } from "@utils";
import {
  convertRelevantFileSize,
  convertTimeStampToString,
} from "../../../media/files/utils/utils";
import Companyformation from "../../../../common/Companyformation";

const START_INDEX_OF_INVOICE = "5";
const orderStatusObj = {
  "On hold": { color: "light-secondary" },
  Completed: { color: "light-success" },
  Processing: { color: "light-primary" },
  Downloaded: { color: "light-info" },
  Cancelled: { color: "light-danger" },
  Refunded: { color: "light-warning" },
  Failed: { color: "light-warning" },
  "Pending Payment": { color: "light-warning" },
};

export const htmlData = (data, selectedOption) => {
  const totalSumFromArray = array => {
    let sum = 0.0;
    array.map(item => {
      sum = sum + parseFloat(item["price"]) * parseInt(item["qty"]);
    });
    return sum.toFixed(2);
  };

  return data !== null ? (
    <div>
      <Card className="invoice-preview-card">
        <CardBody className="invoice-padding pb-0">
          {/* Header */}
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <Companyformation />
            <div className="mt-md-0 mt-2">
              <h4 className="invoice-title">
                Order No <span className="invoice-number">#{data.id}</span>
              </h4>
              <div className="invoice-date-wrapper">
                <p className="invoice-date-title">Date Issued:</p>
                <p className="invoice-date">
                  {convertTimeStampToString(data.order_date).stringDate}
                </p>
              </div>

              <div className="invoice-date-wrapper">
                <p className="invoice-date-title">Order Status:</p>
                <p className="invoice-date">{selectedOption.label}</p>
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
              <h6 className="mb-2">Billing Address:</h6>
              <h6 className="mb-25">{data.user_fullname}</h6>
              <CardText className="mb-25">{data.user_email}</CardText>
              <CardText className="mb-25">
                {data.houseNo || ""}, {data.landmark || ""}
              </CardText>
              <CardText className="mb-25">
                {data.city || ""}, {data.division || ""},{data.postCode || ""}
              </CardText>
              <CardText className="mb-0">{data.phonenumber}</CardText>
            </Col>
            <Col className="p-0 mt-xl-0 mt-2" lg="4">
              <h6 className="mb-2">Payment Details:</h6>
              <table>
                <tbody>
                  <tr>
                    <td className="pr-1">Total:</td>
                    <td>
                      <span className="font-weight-bolder">
                        {data.total_price + data.shipping_cost} BDT
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-1">Payment Type:</td>
                    <td>{data.pay_option}</td>
                  </tr>
                  {data.pay_option === "Online Payment" && (
                    <>
                      <tr>
                        <td className="pr-1">Medium:</td>
                        <td>{data.pay_medium}</td>
                      </tr>
                      <tr>
                        <td className="pr-1">Transaction Id:</td>
                        <td>{data.transactionId}</td>
                      </tr>
                    </>
                  )}
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
            {data &&
              data.orderedItems.map((item, key) => {
                return (
                  <tr key={key}>
                    <td className="py-1">
                      <p className="card-text font-weight-bold mb-25">
                        {item.product_name} <br></br>
                        {item.variants ? item.variants.slice(1, -1) : ""}
                      </p>
                    </td>
                    <td className="py-1">
                      <span className="font-weight-bold">{item.price}</span>
                    </td>
                    <td className="py-1">
                      <span className="font-weight-bold">{item.qty}</span>
                    </td>
                    <td className="py-1">
                      <span className="font-weight-bold">
                        {parseFloat(item.price) * parseFloat(item.qty)} BDT
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
            <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}></Col>
            <Col
              className="d-flex justify-content-end"
              md="6"
              order={{ md: 2, lg: 1 }}
            >
              <div className="invoice-total-wrapper">
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Subtotal:</p>
                  <p className="invoice-total-amount">
                    {data && totalSumFromArray(data.orderedItems)} BDT
                  </p>
                </div>

                <div className="invoice-total-item">
                  <p className="invoice-total-title">Shipping:</p>
                  <p className="invoice-total-amount">
                    {data.shipping_cost} BDT
                  </p>
                </div>
                <hr className="my-50" />
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Total:</p>
                  <p className="invoice-total-amount">
                    {data.total_price + data.shipping_cost} BDT
                  </p>
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
              <span>{data.message}</span>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
      </Card>
    </div>
  ) : null;
};
