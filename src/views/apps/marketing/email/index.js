/*eslint-disable */
import { Fragment, useState, useEffect } from "react";
import XLSX from "xlsx";
import Uppy from "@uppy/core";
import { X } from "react-feather";
import { DragDrop } from "@uppy/react";
import Avatar from "@components/avatar";
import { toast } from "react-toastify";
import ExtensionsHeader from "@components/extensions-header";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
  Spinner,
  Alert,
} from "reactstrap";

import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";
import "@styles/react/libs/file-uploader/file-uploader.scss";

import consoleLog from "@console";
import SendEmail from "./SendEmail";
import {
  convertArrayToString,
  splitStringByCharacter,
} from "../../../../utility/Utils";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";
const ErrorToast = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Error!</h6>
      </div>
      <small className="text-muted">a second ago</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 You can only upload <span className="font-weight-bolder">.csv</span>{" "}
        Files!.
      </span>
    </div>
  </Fragment>
);

const EmailMarketing = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [emailAddresses, setEmailAddresses] = useState("");
  const [emailAddressesStoreName, setEmailAddressesStoreName] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      const { id } = params;
      setIsEditable(true);
      loadTemplate(id);
    }
  }, []);

  const loadTemplate = async id => {
    try {
      const response = await axiosInstance().get(
        urls.GET_EMAIL_TEMPLATES_BY_ID + id
      );
      const emailTemplateObject = response.data.results[0];

      setEmailAddressesStoreName(emailTemplateObject.template_name);
      setEmailAddresses(convertArrayToString(response.data.results, "emails"));
    } catch (error) {
      let toastMsg = "";
      if (error.status) {
        toastMsg = error.data.massage;
      } else {
        toastMsg = error.toString();
      }
      setError(error);
      toast.error(toastMsg);
    }
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  });

  const getTableData = (arr, name) => {
    setEmailAddresses(getEmails(arr));
  };

  uppy.on("complete", result => {
    const reader = new FileReader();
    reader.onload = function () {
      const fileData = reader.result;
      const wb = XLSX.read(fileData, { type: "binary" });

      wb.SheetNames.forEach(function (sheetName) {
        const rowObj = XLSX.utils.sheet_to_row_object_array(
          wb.Sheets[sheetName]
        );
        getTableData(rowObj, result.successful[0].data.name);
      });
    };
    if (result.successful[0].extension === "csv") {
      reader.readAsBinaryString(result.successful[0].data);
    } else {
      toast.error(<ErrorToast />, { hideProgressBar: true });
    }
  });
  const getEmails = tableData => {
    let emails = "";
    tableData.map((col, index) => {
      const keys = Object.keys(col);
      keys.map((key, index) => {
        emails += `${col[key]},`;
      });
    });
    return emails;
  };

  const onSave = () => {
    const emails = splitStringByCharacter(
      emailAddresses.replace("\n", "").trim(),
      ","
    );
    onSaveEmails(emails);
  };

  const onUpdate = async () => {
    setIsLoading(true);
    const { id } = params;
    try {
      const response = await axiosInstance().patch(
        urls.UPDATE_EMAIL_TEMPLATES + id,
        {
          template_name: emailAddressesStoreName,
          emails: splitStringByCharacter(
            emailAddresses.replace("\n", "").trim(),
            ","
          ),
        }
      );
      toast.success("Updated Successfully");
    } catch (error) {
      if (error.status === 500) {
        toast.error(error.data.massage);
      } else {
        toast.error(error.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onSaveEmails = async emails => {
    setIsLoading(true);
    try {
      const response = await axiosInstance().post(urls.SAVE_EMAIL_TEMPLATES, {
        template_name: emailAddressesStoreName,
        emails: emails,
      });
      toast.success("Inserted Successfully");
    } catch (error) {
      if (error.status === 500) {
        toast.error(error.data.massage);
      } else {
        toast.error(error.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (!error && isEditable) || !isEditable ? (
    <>
      <Fragment>
        <Row className="import-component">
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <DragDrop uppy={uppy} />
                  </Col>
                </Row>
              </CardBody>

              <h6 className="ml-1" style={{ color: "red" }}>
                **NB: Upload only csv file consists of one email addresses
                column{" "}
              </h6>
            </Card>
          </Col>
          <Col sm="12">
            <Input
              type="textarea"
              value={emailAddresses}
              rows={10}
              onChange={e => setEmailAddresses(e.target.value)}
            />
            <h6 className="ml-1" style={{ color: "red" }}>
              **NB: Write email addresses which are separated by comma only.
            </h6>
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-50">
          <div>
            <Row>
              <Col className="d-flex align-items-center">
                <Label className="mr-1" for="option-name-input">
                  Save as
                </Label>
                <Input
                  className="dataTable-filter mr-50"
                  type="text"
                  bsSize="sm"
                  id="option-name-input"
                  value={emailAddressesStoreName}
                  onChange={e => setEmailAddressesStoreName(e.target.value)}
                />
                <Button.Ripple
                  color="primary"
                  className="btn-next"
                  onClick={isLoading ? null : isEditable ? onUpdate : onSave}
                >
                  {isLoading && <Spinner color="white" size="sm" />}
                  {isEditable ? "Update Template" : "Save"}
                </Button.Ripple>
              </Col>
            </Row>
          </div>
          <Button.Ripple
            color="primary"
            className="btn-next"
            onClick={toggleSidebar}
          >
            Send
          </Button.Ripple>
        </div>
      </Fragment>
      <SendEmail
        open={open}
        toggleSidebar={toggleSidebar}
        emailAddress={splitStringByCharacter(
          emailAddresses.replace("\n", "").trim(),
          ","
        )}
      />
    </>
  ) : (
    error && (
      <Alert color="danger">
        {error.status === 404 && (
          <>
            <h4 className="alert-heading">Email Template not found</h4>
            <div className="alert-body">
              Email Template with id: {params.id} doesn't exist. Check list of
              all orders:{" "}
              <Link to="/apps/marketing/email-marketing/email-templates">
                Template List
              </Link>
            </div>
          </>
        )}
      </Alert>
    )
  );
};

export default EmailMarketing;
