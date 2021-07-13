/* eslint-disable */
import React, { useMemo } from "react";
import Styles from "./UploadItem.module.css";
import { STATUS_UPLOAD } from "../constants";

const UploadItem = props => {
  const { file, progress, cancelSource, status } = props.file;
  const cancelUpload = () => {
    // console.log(source.token);

    cancelSource.cancel("Cancelled by user");
  };
  // const renderIcon = () => {
  //   if (props.progress != 100) {
  //     return (
  //       <span
  //         title="Cancel upload"
  //         style={{ color: "red" }}
  //         onClick={props.cancelUpload}
  //       >
  //         ✕
  //       </span>
  //     );
  //   }
  // };
  const renderIcon = useMemo(() => {
    if (status === STATUS_UPLOAD.uploading) {
      return (
        <span
          title="Cancel upload"
          style={{ color: "red" }}
          onClick={cancelUpload}
        >
          ✕
        </span>
      );
    } else if (status === STATUS_UPLOAD.success) {
      return (
        <span
          title="Success upload"
          style={{ color: "green", cursor: "initial" }}
        >
          ✓
        </span>
      );
    }

    return null;
  }, [status]);

  return (
    <div className={Styles.wrapperItem}>
      <div className={Styles.leftSide}>
        <div className={Styles.progressBar}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <label>{file.name}</label>
      </div>
      <div className={Styles.rightSide}>
        {renderIcon}
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default UploadItem;
