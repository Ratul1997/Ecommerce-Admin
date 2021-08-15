/* eslint-disable */
import React, { Fragment, useState } from "react";
import AppCollapse from "@components/app-collapse";
import { Badge, Col, Label, Row, Button, Input, Spinner } from "reactstrap";
import { Delete, Edit, Edit2, PlusCircle, Trash2 } from "react-feather";
import { findItemInArray } from "@utils";
import { urls } from "@urls";
import { toast } from "react-toastify";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../../common/Toaster";
import axios from "axios";
import axiosInstance from "../../../../configs/axiosInstance";
export default function AttributesList({
  attribute,
  index,
  onUpdateAttributeList,
  onRemoveAttribute,
}) {
  const [selected, setSelected] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [option_name, setOptionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleDelete = () => {
    setIsDelete(!isDelete);
  };

  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };
  const onSelect = item => () => {
    console.log({ item });
    const selectedList = selected;
    const idx = findItemInArray(selected, item, "option_name");
    if (idx > -1) {
      selectedList.splice(idx, 1);
    } else {
      selectedList.push(item);
    }
    setSelected([...selectedList]);
  };

  const onCancelDelete = () => {
    toggleDelete();
    setSelected([]);
    setOptionName("");
  };

  const onSaveOption = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance().post(urls.ADD_OPTION, {
        option_name: option_name,
        attribute_id: attribute.attribute_id,
      });

      const optionObject = {
        option_name: option_name,
        option_id: response.data.results.option_id,
      };

      onUpdateAttributeList(optionObject, index);
      onSuccessToast("Successfully Inserted");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
    onCancelAdd();
  };

  const onDeleteOption = async () => {
    setIsLoading(true);
    const selectedOptions = selected.map(item => item.option_id);

    try {
      const response = await axiosInstance().delete(urls.REMOVE_OPTIONS, {
        params: {
          option_ids: selectedOptions,
        },
      });
      onSuccessToast("Successfully Deleted");
      onUpdateAttributeList(null, index, selectedOptions);
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
    onCancelDelete();
  };

  const onCancelAdd = () => {
    setOptionName("");
    toggleAdd();
    setSelected([]);
  };
  const renderContent = () => {
    const options = attribute.options;
    return (
      <>
        <Fragment>
          <Row className="justify-content-end mx-0">
            <PlusCircle
              size={18}
              color="blue"
              onClick={!isDelete && !isAdd ? toggleAdd : null}
            />
            <Trash2
              size={18}
              color="red"
              onClick={!isAdd && !isDelete ? toggleDelete : null}
            />
          </Row>
          <Row>
            <Col sm="10">
              {options &&
                options.map((item, key) => (
                  <Badge
                    color={
                      findItemInArray(selected, item, "option_name") > -1
                        ? "light-secondary"
                        : "light-primary"
                    }
                    pill
                    onClick={isDelete ? onSelect(item) : null}
                  >
                    {item.option_name}
                  </Badge>
                ))}
            </Col>
          </Row>
          {isDelete && (
            <Row className="justify-content-end mx-0">
              {isLoading ? (
                <Button.Ripple color="primary" disabled size="sm">
                  <Spinner size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <>
                  <Button
                    color="primary"
                    outline
                    size="sm"
                    className="mr-1"
                    onClick={onDeleteOption}
                  >
                    Delete <Badge color="secondary">{selected.length}</Badge>
                  </Button>
                  <Button size="sm" onClick={onCancelDelete}>
                    Cancel
                  </Button>
                </>
              )}
            </Row>
          )}
          {isAdd && (
            <Row className="justify-content-end mx-0">
              <Col className="d-flex align-items-center  mt-1" sm="3">
                <Label className="mr-1" for="option-name-input">
                  Option Name
                </Label>
                <Input
                  className="dataTable-filter mb-50"
                  type="text"
                  bsSize="sm"
                  id="option-name-input"
                  value={option_name}
                  onChange={e => setOptionName(e.target.value)}
                />
              </Col>
              <Col className="d-flex align-items-center " sm="2">
                {isLoading ? (
                  <Button.Ripple color="primary" disabled size="sm">
                    <Spinner size="sm" />
                    <span className="ml-50">Loading...</span>
                  </Button.Ripple>
                ) : (
                  <>
                    <Button
                      color="primary"
                      size="sm"
                      className="mr-1"
                      onClick={onSaveOption}
                    >
                      Save
                    </Button>
                    <Button size="sm" onClick={onCancelAdd}>
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Fragment>
      </>
    );
  };
  const onRemove = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().delete(
        urls.REMOVE_ATTRIBUTES + attribute.attribute_id
      );
      onSuccessToast("Successfully Deleted");
      onRemoveAttribute(index);
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };
  const renderTitle = title => {
    return (
      <div className="d-flex justify-content-between">
        {isLoading ? (
          <Spinner size="sm" color="primary" className="mr-1" />
        ) : (
          <Trash2 size={15} className="mr-1" color="red" onClick={onRemove} />
        )}
        <h6>{title}</h6>
      </div>
    );
  };
  const data = [
    {
      title: renderTitle(`#${index + 1}: ${attribute.attribute_name}`),
      content: renderContent(),
    },
  ];
  return <AppCollapse data={data} />;
}
