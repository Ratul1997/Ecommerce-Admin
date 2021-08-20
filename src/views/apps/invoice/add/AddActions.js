/*eslint-disable*/
// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import {
  Card,
  CardBody,
  Button,
  Input,
  CustomInput,
  Label,
  Spinner,
} from "reactstrap";

const AddActions = ({
  onSave,
  isLoading,
  invoiceIdRef,
  isEditedInvoice,
  invoiceNumber,
  onUpdate,
}) => {
  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          {/* <Button.Ripple color="primary" block className="mb-75" disabled>
            Send Invoice
          </Button.Ripple> */}
          <Button.Ripple
            tag={Link}
            to={
              isEditedInvoice
                ? `/apps/invoice/preview/${invoiceNumber}`
                : `/apps/invoice/preview/${invoiceIdRef.current}`
            }
            color="primary"
            block
            className="mb-75"
            target="_blank"
            disabled={invoiceIdRef.current || isEditedInvoice ? false : true}
          >
            Preview
          </Button.Ripple>
          <Button.Ripple
            color="primary"
            block
            outline
            onClick={isLoading ? null : isEditedInvoice ? onUpdate : onSave}
            disabled={!invoiceIdRef.current ? false : true}
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : isEditedInvoice ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button.Ripple>
        </CardBody>
      </Card>
      {/* <div className='mt-2'>
        <div className='invoice-payment-option'>
          <p className='mb-50'>Accept payments via</p>
          <Input type='select' id='payment-select'>
            <option>Debit Card</option>
            <option>Credit Card</option>
            <option>Paypal</option>
            <option>Internet Banking</option>
            <option>UPI Transfer</option>
          </Input>
        </div>
        <div className='invoice-terms mt-1'>
          <div className='d-flex justify-content-between'>
            <Label className='mb-0' for='payment-terms'>
              Payment Terms
            </Label>
            <CustomInput type='switch' id='payment-terms' defaultChecked />
          </div>
          <div className='d-flex justify-content-between py-1'>
            <Label className='mb-0' for='client-notes'>
              Client Notes
            </Label>
            <CustomInput type='switch' id='client-notes' defaultChecked />
          </div>
          <div className='d-flex justify-content-between'>
            <Label className='mb-0' for='payment-stub'>
              Payment Stub
            </Label>
            <CustomInput type='switch' id='payment-stub' />
          </div>
        </div>
      </div>
     */}
    </Fragment>
  );
};

export default AddActions;
