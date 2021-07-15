/* eslint-disable */
import axios from "axios";
import uploadFileTypes from "../utils/uploadFile.types";
import { addMediaFiles } from "../../../../apps/media/store/action";
import {urls} from '@urls'
export const setUploadFile = data => ({
  type: uploadFileTypes.SET_UPLOAD_FILE,
  payload: data
});

export const setUploadProgress = (id, progress) => ({
  type: uploadFileTypes.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress
  }
});

export const successUploadFile = id => ({
  type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
  payload: id
});

export const failureUploadFile = id => ({
  type: uploadFileTypes.FAILURE_UPLOAD_FILE,
  payload: id
});

export const uploadFile = files => dispatch => {
  if (files.length) {
    files.forEach(async file => {
      const formPayload = new FormData();
      formPayload.append("file", file.file);

      try {
        const res = await axios({
          baseURL: process.env.REACT_APP_BASE_URL,
          url: urls.UPLOAD_A_FILE,
          method: "post",
          data: formPayload,
          cancelToken: file.cancelSource.token,
          onUploadProgress: progress => {
            const { loaded, total } = progress;

            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgress(file.id, percentageProgress));
          }
        });
        
        // console.log(res);
        dispatch(successUploadFile(file.id));
        setTimeout(() => {
          dispatch(addMediaFiles(res.data))
        }, 3000);
      } catch (error) {
        if (axios.isCancel(error)) {
          // Do something when user cancel upload
          console.log("cancelled by user");
        }
        dispatch(failureUploadFile(file.id));
      }
    });
  }
};

export const retryUpload = id => (dispatch, getState) => {
  dispatch({
    type: uploadFileTypes.RETRY_UPLOAD_FILE,
    payload: id
  });

  const { fileProgress } = getState().UploadFile;

  const reuploadFile = [fileProgress[id]];

  dispatch(uploadFile(reuploadFile));
};

export const closeUpload = () => ({
  type: uploadFileTypes.CLOSE_ALL_UPLOAD_FILE
});
