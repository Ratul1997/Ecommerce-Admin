/* eslint-disable */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { size, toArray } from "lodash";

import UploadItem from "../UploadItem/UploadItem";
import Styles from "./UploadProgress.module.css";
import { uploadFile } from "../store/action";
import { X } from "react-feather";
import axios from "axios";

const UploadProgress2 = ({ file }) => {
  const [progress, setProgress] = useState(0);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const cancelUpload = () => {
    

    // source.cancel("Cancelled by user");
  };
  useEffect(async () => {
    
    const formPayload = new FormData();
    formPayload.append("file", file);
    
    try {
      const res = await axios({
        baseURL: "http://localhost:5000",
        url: "/api/file-upload",
        method: "post",
        data: formPayload,
        cancelToken: source.token,
        onUploadProgress: progress => {
          const { loaded, total } = progress;

          const percentageProgress = Math.floor((loaded / total) * 100);
          setProgress(percentageProgress);
        }
      });
      
      // dispatch(successUploadFile(file.id));
      dispatch(addMediaFiles(res.data));
    } catch (error) {
      if (axios.isCancel(error)) {
        // Do something when user cancel upload
        
      }
      // dispatch(failureUploadFile(file.id));
    }
  }, []);
  return (
    <UploadItem
      progress={progress}
      cancelUpload={cancelUpload}
      name={file.name}
    />
  );
};

const mapStateToProps = state => ({
  fileProgress: state.UploadFile.fileProgress
});

const mapDispatchToProps = dispatch => ({
  uploadFile: files => dispatch(uploadFile(files))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress2);
