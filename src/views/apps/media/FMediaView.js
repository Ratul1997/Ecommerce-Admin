/* eslint-disable */
import React, { useState, Fragment, useEffect, lazy } from "react";
import { Card, CardBody, Input, Row } from "reactstrap";

// ** Custom Components
import Avatar from "@components/avatar";

import { useContextMenu } from "react-contexify";
import UploadProgress from "../../common/upload/UploadProgress/UploadProgress";

import { onErrorToast, onSuccessToast } from "../../common/Toaster";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { setUploadFile, closeUpload } from "../../common/upload/store/action";

import { urls } from "@urls";
import axiosInstance from "@src/configs/axiosInstance";

import MediaHeader from "./MediaHeader";
import FileAsGrid from "./fileview/FileAsGrid";

import FileAsList from "./fileview/FileAsList";
import { addFiles, removeMediaFiles } from "./store/action";

export default function FMediaView({ titles, fileType }) {
  const { show } = useContextMenu({
    id: "menu_id",
  });
  const dispatch = useDispatch();
  const mediaFiles = useSelector(store => store.mediaReducer);
  const { files } = mediaFiles;

  const [activeView, setActiveView] = useState("grid");
  const confirmDeleteText = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmIcon: "success",
    confirmTitle: "Deleted!",
    confirmText: "Your file has been deleted.",
  };

  const onDelete = id => async () => {
    console.log(id);
    try {
      // const res = await axiosInstance().delete(urls.REMOVE_FILES_BY_ID + id);
      // dispatch(removeMediaFiles(id));
      onSuccessToast("Successfully Removed!");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };

  useEffect(() => {
    loadFiles();
    return () => cleanUp();
  }, [dispatch]);

  const loadFiles = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_FILES);
      dispatch(addFiles(res.data.results));
    } catch (error) {}
  };
  const cleanUp = () => {
    dispatch(closeUpload());
  };

  const onClose = () => {
    dispatch(closeUpload());
  };

  const onMultipleChange = async e => {
    const files = e.target.files;
    dispatch(setUploadFile(files));
  };

  return (
    <>
      <Card>
        <MediaHeader
          titles={titles}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <CardBody>
          {activeView === "grid" ? (
            <Row>
              <FileAsGrid
                files={files}
                show={show}
                confirmDeleteText={confirmDeleteText}
                onDelete={onDelete}
              />
            </Row>
          ) : (
            <FileAsList files={files} />
          )}
        </CardBody>
      </Card>
      <Input
        type="file"
        id="fileSelect"
        name="customFiles"
        onChange={onMultipleChange}
        accept={fileType}
        multiple
        className="d-none"
      />

      <UploadProgress onClose={onClose} />
    </>
  );
}
