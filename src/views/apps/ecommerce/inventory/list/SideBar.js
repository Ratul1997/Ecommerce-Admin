/* eslint-disable  */
// ** React Import
import { useState, useEffect, Fragment, useContext } from "react";

import Select, { components } from "react-select";
// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Row,
  Col,
  CardHeader,
  CardTitle,
} from "reactstrap";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
import SpinnerComponent from "../../../../../@core/components/spinner/Fallback-spinner";
import ExpandableTable from "./ExpandableTable";
const SidebarInventory = ({ open, toggleSidebar, parentProductId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [variations, setVariations] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadVariants();
    return () => {
      setVariations([]);
      setIsLoading(true);
    };
  }, []);

  const loadVariants = async () => {
    try {
      const res = await axiosInstance().get(
        urls.GET_INVENTORIES_VARIATIONS + parentProductId
      );
      setVariations(res.data.results);
      if (res.data.results.length > 0) {
        loadAttributes();
      } else {
        setIsLoading(false);
      }
      
    } catch (error) {
      setIsLoading(false);
      
    }
  };

  const loadAttributes = async () => {
    try {
      const res = await axiosInstance().get(
        urls.GET_PRODUCT_ATTRIBUTES_BY_ID + parentProductId
      );
      
      setOptions(res.data.results.options);
      setIsLoading(false);
    } catch (error) {
      
      setIsLoading(false);
    }
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Variations Inventory"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      //   style={{BA    }}
    >
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          {variations.length > 0
            ? variations.map(item => {
                return (
                  <>
                    <ExpandableTable
                      data={item}
                      type="variants"
                      key={item.product_id}
                      options={options}
                    />
                    <hr />
                  </>
                );
              })
            : "No Variation Found!"}
        </>
      )}
    </Sidebar>
  );
};

export default SidebarInventory;
