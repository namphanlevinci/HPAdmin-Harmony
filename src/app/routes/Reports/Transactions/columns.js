import React from "react";
import {
    Typography,
} from "@material-ui/core";
import moment from "moment";

const columns = (totalRow, summary) => [
    {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {moment(e.createDate).format("MM/DD/YYYY hh:mm A")}
            </Typography>
        ),
        Footer: (
            <Typography variant="subtitle1" className="table__light">
                Total Transaction: {totalRow}
            </Typography>
        ),
        width: 220,
    },
    {
        Header: "ID",
        id: "paymentTransactionId",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.paymentTransactionId}
            </Typography>
        ),
        width: 100,
    },
    {
        Header: "MID",
        id: "merchantCode",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.merchantCode}
            </Typography>
        ),
        width: 100,
    },
    {
        id: "title",
        Header: "Method",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.title}
            </Typography>
        ),
    },
    {
        id: "Customer",
        Header: "Original Account",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.paymentData?.name_on_card}
            </Typography>
        ),
        sortable: false,
    },

    {
        id: "Account Details ",
        Header: "Card /Last 4 Digit",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.paymentData?.card_type ? (
                    <span>
                        {e?.paymentData?.card_type} <br />
                        {` **** **** ****  ${e?.paymentData?.card_number}`}
                    </span>
                ) : null}
            </Typography>
        ),
        sortable: false,
    },
    {
        id: "MerchantCode",
        Header: "Merchant Account",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {`${e?.receiver === null ? "" : e?.receiver?.name}`}
            </Typography>
        ),
        sortable: false,
    },
    {
        id: "amount",
        Header: "Amount",
        accessor: (e) =>
            <Typography
                variant="subtitle1">
                ${e.amount}
            </Typography>,
        Footer: (
            <Typography variant="subtitle1" className="table__light">
                ${summary?.amount}
            </Typography>
        ),
    },
    {
        Header: "IP",
        id: "ip",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.ip}
            </Typography>
        ),
    },
    {
        id: "status",
        Header: "Status",
        accessor: (e) => (
            <Typography variant="subtitle1" className="table__light">
                {e?.status || ""}
            </Typography>
        ),
    },
];

export default columns;