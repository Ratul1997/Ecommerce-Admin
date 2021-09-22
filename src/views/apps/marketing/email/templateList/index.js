/*eslint-disable*/
import { Fragment, useState, useEffect } from "react";
import ExtensionsHeader from "@components/extensions-header";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput,
  Label,
} from "reactstrap";
import {Link,useLocation,useParams} from 'react-router-dom'
import classnames from "classnames";
import XLSX from "xlsx";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";
import SendEmail from "../SendEmail";
import { Edit2, Trash } from "react-feather";
import { toast } from "react-toastify";
import { findValueInArray } from "../../../../../utility/Utils";

const TemplateList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailAddress, setEmailAddresses] = useState(null);
  const [onDeletingData, setOnDeletingData] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  useEffect(() => {
    loadTemplateList();
  }, []);

  const loadTemplateList = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().get(urls.GET_EMAIL_TEMPLATES);
      setData(res.data.results);
    } catch (error) {
      //   console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = e => {
    let filteredData = [];
    const value = e.target.value;
    setValue(value);
    if (value.length) {
      filteredData = data.filter(col => {
        const startsWithCondition = col.template_name
          .toLowerCase()
          .startsWith(value.toLowerCase());
        const includesCondition = col.template_name
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWithCondition) return startsWithCondition;
        else if (!startsWithCondition && includesCondition)
          return includesCondition;
        else return null;
      });
      setValue(value);
      setFilteredData(filteredData);
    }
  };

  const handleSelect = id => {
    const selectedRowsArr = selectedRows;
    if (!selectedRowsArr.includes(id)) {
      selectedRowsArr.push(id);
    } else if (selectedRowsArr.includes(id)) {
      selectedRowsArr.splice(selectedRowsArr.indexOf(id), 1);
    } else {
      return null;
    }
    setSelectedRows([...selectedRowsArr]);
  };

  const handleSelectAll = () => {
    let selectedRowsArr = selectedRows;
    if (selectedRowsArr.length < data.length) {
      const ids = data.map(i => i.template_id);
      selectedRowsArr = ids;
    } else if (selectedRowsArr.length === data.length) {
      selectedRowsArr = [];
    } else {
      return null;
    }

    setSelectedRows(selectedRowsArr);
  };

  const updateState = (id, type) => {
    let updatedDatList = data;

    const index = findValueInArray(data, id, "template_id");
    if (index > -1) {
      if (type === "Delete") {
        updatedDatList.splice(index, 1);
      }
    }
    setData([...updatedDatList]);
  };
  const onDelete = id => async () => {
    setOnDeletingData(true);
    try {
      const res = await axiosInstance().delete(
        urls.DELETE_EMAIL_TEMPLATES + id
      );
      updateState(id, "Delete");
      toast.success("Deleted");
    } catch (error) {
      toast.error(error.data.massage);
    } finally {
      setOnDeletingData(false);
    }
  };
  const array = value ? filteredData : data;
  const renderTableData = array.map(col => {
    return (
      <tr
        key={col.id}
        className={classnames({
          selected: selectedRows.includes(col.template_id),
        })}
      >
        <td>
          <CustomInput
            type="checkbox"
            id={col.template_id}
            label=""
            checked={!!selectedRows.includes(col.template_id)}
            onChange={() => handleSelect(col.template_id)}
          />
        </td>
        <td>{col.template_name}</td>
        <td>
          <Link to={`/apps/marketing/email-marketing/email-templates/edit/${col.template_id}`}>
            <Button.Ripple
              className="btn-icon rounded-circle mr-50"
              color="primary"
            >
              <Edit2 size={12} />
            </Button.Ripple>
          </Link>

          <Button.Ripple
            className="btn-icon rounded-circle"
            color="warning"
            onClick={onDelete(col.template_id)}
          >
            <Trash size={12} />
          </Button.Ripple>
        </td>
      </tr>
    );
  });

  const sendSelected = () => {
    let emails = [];
    data.map(item =>
      selectedRows.map(selected => {
        if (selected === item.template_id) {
          emails = [...emails, ...item.emails];
        }
      })
    );

    setEmailAddresses(emails);
    toggleSidebar();
  };

  return (
    <Fragment>
      <h4>Email Template List</h4>
      <Row className="export-component">
        <Col sm="12">
          <Card>
            <CardBody className="pb-0">
              <div className="d-flex flex-wrap justify-content-between">
                <Button.Ripple color="primary" onClick={() => sendSelected()}>
                  Send Selected
                </Button.Ripple>
                <div className="d-flex align-items-center justify-content-end">
                  <Label for="search-input" className="mr-1">
                    Search
                  </Label>
                  <Input
                    id="search-input"
                    bsSize="sm"
                    type="text"
                    value={value}
                    onChange={e => handleFilter(e)}
                  />
                </div>
              </div>
            </CardBody>
            <Table className="table-hover-animation mt-2" responsive>
              <thead>
                <tr>
                  <th>
                    <CustomInput
                      type="checkbox"
                      id="select-all"
                      label=""
                      checked={!!selectedRows.length}
                      onChange={e => handleSelectAll()}
                    />
                  </th>
                  <th>Template Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableData}</tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <SendEmail
        open={open}
        toggleSidebar={toggleSidebar}
        emailAddress={emailAddress}
      />
    </Fragment>
  );
};

export default TemplateList;
