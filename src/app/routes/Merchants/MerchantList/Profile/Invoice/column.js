
import React from "react";
import {
    Typography,
} from "@material-ui/core";
import moment from "moment";

const columns = [
    {
        id: "code",
        Header: "ID",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                #{e.code}
            </Typography>
        ),
    },
    {
        Header: "Date",
        id: "date",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {moment(e.createdDate).format("MM/DD/YYYY")}
            </Typography>
        ),
        width: 100,
    },
    {
        Header: "Time",
        id: "time",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {moment(e.createdDate).format("hh:mm A")}
            </Typography>
        ),
        width: 100,
    },
    {
        id: "name",
        Header: "Customer",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {`${e.user.firstName} ${e.user.lastName}`}
            </Typography>
        ),
    },
    {
        id: "status",
        Header: "Status",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.status}
            </Typography>
        ),
        sortable: false,
    },
    {
        id: "total",
        Header: "Total",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {`$ ${e?.total}`}
            </Typography>
        ),
        sortable: false,
    },
];

export default columns;