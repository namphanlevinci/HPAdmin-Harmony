import React from "react";
import { CustomTableHeader } from "@/util/CustomText";
import { Typography } from "@material-ui/core";
import Status from "./components/Status";
import moment from "moment";

const columns = [
    {
      Header: <CustomTableHeader value="ID" />,
      id: "id",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.id}
        </Typography>
      ),
      width: 60,
    },
    {
      Header: <CustomTableHeader value="Title" />,
      id: "title",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.title}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Application" />,
      id: "app",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.clientApp}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Client Name" />,
      id: "clientName",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.clientName}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Created by" />,
      id: "createBy",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.createdUserName}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Last Updated" />,
      id: "lastUpdate",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {moment(row?.modifiedDate).format("MM/DD/YYYY") !== "01/01/0001" &&
            moment(row?.modifiedDate).format("MM/DD/YYYY")}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Modified by" />,
      id: "modifiedBy",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          {row?.modifiedUserName}
        </Typography>
      ),
    },
    {
      Header: <CustomTableHeader value="Status" />,
      id: "status",
      accessor: (row) => (
        <Typography variant="subtitle1" className="table__light">
          <Status status={row?.status}>{row?.status}</Status>
        </Typography>
      ),
    },
  ];

export default columns;