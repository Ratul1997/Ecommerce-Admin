/* eslint-disable */

import pdf from "@src/assets/images/icons/file-icons/pdf.png";
import doc from "@src/assets/images/icons/file-icons/doc.png";
import zip from "@src/assets/images/icons/file-icons/zip.ico";
import xls from "@src/assets/images/icons/file-icons/excel.png";
import video from "@src/assets/images/icons/file-icons/video.png";
import file from "@src/assets/images/icons/file-icons/file.png";

export const checkImageTypeOrNot = mime_type => {
  const type = mime_type.split("/")[0];
  switch (type) {
    case "image":
      return true;
    default:
      return false;
  }
};

export const checkApplicationType = mime_type => {
  const type = mime_type.split("/");
  switch (type[0]) {
    case "application":
      switch (type[1]) {
        case "pdf":
          return pdf;
        case "doc":
          return doc;
        case "zip":
          return zip;
        case "csv":
          return xls;
        default:
          return file;
      }
    case "video":
      return video;
    default:
      return file;
  }
};

export const convertTimeStampToString = time => {
  const converted_time = new Date(time);
  const month =
    converted_time.getMonth() < 10
      ? `0${converted_time.getMonth()}`
      : converted_time.getMonth();
  const year = converted_time.getFullYear();
  const date =
    converted_time.getDate() < 10
      ? `0${converted_time.getDate()}`
      : converted_time.getDate();
  const hours = converted_time.getHours();
  const minutes = converted_time.getMinutes();
  const seconds = converted_time.getSeconds();

  const stringDate = `${date}/${month}/${year}`;
  const stringTime = `${hours}:${minutes}:${seconds}`;
  return { stringDate, stringTime };
};

export const convertRelevantFileSize = size => {
  

  return size;
};
export const formatBytes = (a, b = 2, k = 1024) => {
  let d = Math.floor(Math.log(a) / Math.log(k));
  return 0 == a
    ? "0 Bytes"
    : parseFloat((a / Math.pow(k, d)).toFixed(Math.max(0, b))) +
        " " +
        ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
};
