/* eslint-disable */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { size, toArray } from "lodash";

import UploadItem from "../UploadItem/UploadItem";
import Styles from "./UploadProgress.module.css";
import { uploadFile } from "../store/action";
import { X } from "react-feather";

const UploadProgress = props => {
  const { fileProgress, uploadFile } = props;
  const uploadedFileAmount = size(fileProgress);

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(
      file => file.progress === 0
    );
    uploadFile(fileToUpload);
  }, [uploadedFileAmount]);

  return uploadedFileAmount > 0 ? (
    <div className={Styles.wrapper}>
      <h4>
        Uploading File{" "}
     
        <X color='white' onClick = {props.onClose} style={{backgroundColor:'red', borderRadius:50}}/>
      </h4>

      {size(fileProgress)
        ? toArray(fileProgress).map(file => (
            <UploadItem
              key={file.id}
              file={file}
            />
          ))
        : null}
    </div>
  ) : null;
};

const mapStateToProps = state => ({
  fileProgress: state.UploadFile.fileProgress
});

const mapDispatchToProps = dispatch => ({
  uploadFile: files => dispatch(uploadFile(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress);
