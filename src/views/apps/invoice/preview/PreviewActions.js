// ** React Imports
/*eslint-disable*/
import { Link } from "react-router-dom";

// ** Third Party Components
import Pdf from "react-to-pdf";
import { Card, CardBody, Button } from "reactstrap";

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddPaymentOpen,
  pdfRef,
}) => {
  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
        <Button.Ripple
          color="primary"
          block
          className="mb-75"
          onClick={() => setSendSidebarOpen(true)}
        >
          Send Invoice
        </Button.Ripple>
        <Pdf targetRef={pdfRef} filename={`Invoice-${id}`}>
          {({ toPdf }) => (
            <Button.Ripple
              color="secondary"
              block
              outline
              className="mb-75"
              onClick={toPdf}
            >
              Download
            </Button.Ripple>
          )}
        </Pdf>

        {/* <Button.Ripple
          color="secondary"
          tag={Link}
          to="/apps/invoice/print"
          target="_blank"
          block
          outline
          className="mb-75"
        >
          Print
        </Button.Ripple>
        <Button.Ripple
          tag={Link}
          to={`/apps/invoice/edit/${id}`}
          color="secondary"
          block
          outline
          className="mb-75"
        >
          Edit
        </Button.Ripple>
        <Button.Ripple
          color="success"
          block
          onClick={() => setAddPaymentOpen(true)}
        >
          Add Payment
        </Button.Ripple> */}
      </CardBody>
    </Card>
  );
};

export default PreviewActions;
