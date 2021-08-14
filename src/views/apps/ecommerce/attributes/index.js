/* eslint-disable */
// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { Plus, Trash } from "react-feather";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { FormattedMessage } from "react-intl";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import Sidebar from "./SideBar";
import axios from "axios";
import { urls } from "@urls";
import AttributesList from "./AttributesList";
import CardBody from "reactstrap/lib/CardBody";
import { toast } from "react-toastify";
import { ErrorToast } from "../../../common/Toaster";

const Attributes = () => {
  // ** State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attributeList, setAttributeList] = useState([]);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await axios.get(urls.GET_ATTRIBUTES);
      console.log(res.status);
      setAttributeList(res.data.results);
    } catch (error) {
      console.log(error);
      toast.error(<ErrorToast toastText={error.response} />, {
        hideProgressBar: true,
      });
      console.log(error);
    }
  };
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const onRemoveAttribute = index => {
    attributeList.splice(index, 1);
    setAttributeList([...attributeList]);
  };

  const onAddAttribute = attributeObj => {
    attributeList.push(attributeObj);
    setAttributeList([...attributeList]);
  };

  const onUpdateAttributeList = (
    optionObject,
    index,
    selectedOptions = null
  ) => {
    const targetObject = attributeList[index];

    if (selectedOptions) {
      const options = targetObject["options"];
      const new_options = options.filter(item => {
        if (selectedOptions.findIndex(item2 => item2 === item.option_id) === -1)
          return item;
      });
      targetObject["options"] = new_options;
    } else targetObject["options"].push(optionObject);
    attributeList[index] = targetObject;
    setAttributeList([...attributeList]);
  };
  return (
    <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        <CardTitle tag="h4">Attributes</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <Button className="ml-2" color="primary" onClick={toggleSidebar}>
            <Plus size={15} />
            <span className="align-middle ml-50">Add Attributes</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {attributeList.map((item, key) => (
          <AttributesList
            attribute={item}
            index={key}
            key={key}
            onUpdateAttributeList={onUpdateAttributeList}
            onRemoveAttribute={onRemoveAttribute}
          />
        ))}
      </CardBody>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onAddAttribute={onAddAttribute}
      />
    </Card>
  );
};

export default Attributes;
