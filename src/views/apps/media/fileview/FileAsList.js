/* eslint-disable  */
import React from "react";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";
import {
  checkImageTypeOrNot,
  checkApplicationType,
  convertTimeStampToString,
  formatBytes
} from "../files/utils/utils";
export default function FileAsList({ files }) {
  const CustomFileNameRow = ({ file }) => {
    return (
      <>
        <Avatar
          color={"primary"}
          className="mr-1"
          content={file.file_name}
          img={
            checkImageTypeOrNot(file.mime_type)
              ? require(`@uploads/${file.file_name}`).default
              : checkApplicationType(file.mime_type)
          }
        />
        <div className="text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate">
            {file.file_name}
          </span>
        </div>
      </>
    );
  };
  const CustomFileTime = ({ file }) => {
    const dates = convertTimeStampToString(file.inserted_at);

    return (
      <div className="text-truncate">
        <span className="d-block  text-truncate">
          {dates.stringDate} {dates.stringTime}
        </span>
      </div>
    );
  };

  const CustomFileSize = ({ file }) => {
    const size = formatBytes(file.size);

    return (
      <div className="text-truncate">
        <span className="d-block  text-truncate">{size}</span>
      </div>
    );
  };
  const columns = [
    {
      name: "File Name",
      selector: "file_name",
      minWidth: "400px",
      cell: row => <CustomFileNameRow file={row} />
    },
    {
      name: "Type",
      selector: "mime_type",
      minWidth: "150px"
    },
    {
      name: "Inserted At",
      selector: "inserted_at",
      minWidth: "200px",
      cell: row => <CustomFileTime file={row} />
    },
    {
      name: "Size",
      selector: "size",
      cell: row => <CustomFileSize file={row} />
    }
  ];
  return <DataTable noHeader responsive columns={columns} data={files} />;
}
