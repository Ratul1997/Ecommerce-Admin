/*eslint-disable*/
// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";

import { generateId } from "@utils";
import { convertTimeStampToString } from "../../media/files/utils/utils";

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
          <div>
            <div className="logo-wrapper">
              <svg viewBox="0 0 139 95" version="1.1" height="24">
                <defs>
                  <linearGradient
                    id="invoice-linearGradient-1"
                    x1="100%"
                    y1="10.5120544%"
                    x2="50%"
                    y2="89.4879456%"
                  >
                    <stop stopColor="#000000" offset="0%"></stop>
                    <stop stopColor="#FFFFFF" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    id="invoice-linearGradient-2"
                    x1="64.0437835%"
                    y1="46.3276743%"
                    x2="37.373316%"
                    y2="100%"
                  >
                    <stop
                      stopColor="#EEEEEE"
                      stopOpacity="0"
                      offset="0%"
                    ></stop>
                    <stop stopColor="#FFFFFF" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-400.000000, -178.000000)">
                    <g transform="translate(400.000000, 178.000000)">
                      <path
                        className="text-primary"
                        d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                        style={{ fill: "currentColor" }}
                      ></path>
                      <path
                        d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                        fill="url(#invoice-linearGradient-1)"
                        opacity="0.2"
                      ></path>
                      <polygon
                        fill="#000000"
                        opacity="0.049999997"
                        points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                      ></polygon>
                      <polygon
                        fill="#000000"
                        opacity="0.099999994"
                        points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                      ></polygon>
                      <polygon
                        fill="url(#invoice-linearGradient-2)"
                        opacity="0.099999994"
                        points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h3 className="text-primary invoice-logo">Vuexy</h3>
            </div>
            <CardText className="mb-25">
              Office 149, 450 South Brand Brooklyn
            </CardText>
            <CardText className="mb-25">
              San Diego County, CA 91905, USA
            </CardText>
            <CardText className="mb-0">
              +1 (123) 456 7891, +44 (876) 543 2198
            </CardText>
          </div>
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
