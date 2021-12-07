import React from "react";
import { Typography } from "@material-ui/core";
import ArchiveSVG from "@/assets/images/archive.svg";
import EditSVG from "@/assets/images/edit.svg";
import RestoreSVG from "@/assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import CheckPermissions from "@/util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";

const columns = (viewStaff, restore) => [
  {
    Header: "",
    id: "none",
    accessor: "none",
    Cell: (row) => {
      row.styles["paddingLeft"] = "0px";
      return <DragIndicatorOutlinedIcon />;
    },
    width: 40,
  },
  {
    Header: "Staff ID",
    id: "staffId",
    accessor: (d) => (
      <Typography variant="subtitle1" className="table__light">
        {`${d.staffId}`}
      </Typography>
    ),
    width: 80,
  },
  {
    Header: "Name",
    id: "fullName",
    accessor: (d) => (
      <Typography variant="subtitle1">
        {`${d.firstName} ${d.lastName}`}
      </Typography>
    ),
  },
  {
    id: "Display",
    Header: "Display Name",
    accessor: (d) => (
      <Typography variant="subtitle1" className="table__light">
        {`${d.displayName}`}
      </Typography>
    ),
  },
  {
    Header: "Phone",
    id: "Phone",
    accessor: (row) => (
      <Typography variant="subtitle1" className="table__light">
        {row?.phone}
      </Typography>
    ),
  },
  {
    Header: "Email",
    id: "email",
    accessor: (row) => (
      <Typography variant="subtitle1" className="table__light">
        {row?.email}
      </Typography>
    ),
    width: 220,
  },
  {
    Header: "Role",
    id: "roleName",
    accessor: (row) => (
      <Typography variant="subtitle1">{row?.roleName}</Typography>
    ),
    width: 80,
  },
  {
    Header: "Status",
    accessor: "isDisabled",
    Cell: (e) => (
      <Typography variant="subtitle1">
        {e.value === 1 ? "Inactive" : "Active"}
      </Typography>
    ),
    width: 80,
  },
  {
    Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
    sortable: false,
    accessor: "actions",
    Cell: (row) => {
      console.log({ row })
      const actionsBtn =
        row.original.isDisabled !== 1 ? (
          <Tooltip title="Archive">
            <img
              alt="archive"
              src={ArchiveSVG}
              onClick={() => [
                restore(row.original.staffId,row.original.isDisabled)
              ]}
            />
          </Tooltip>
        ) : (
            <Tooltip
              onClick={(e) => {
                e.stopPropagation();
                restore(row.original.staffId, row.original.isDisabled);
              }}
              title="Restore">
              <img
                alt="restore"
                src={RestoreSVG}
              />
            </Tooltip>
          );
      return (
        <div style={{ textAlign: "center" }}>
          { CheckPermissions("active-staff") && actionsBtn}

          {
            CheckPermissions("edit-staff") && (
              <span style={{ paddingLeft: "15px" }}>
                <Tooltip title="Edit">
                  <img
                    alt="edit"
                    src={EditSVG}
                    size={20}
                    style={{ color: "#575757" }}
                    onClick={() => viewStaff(row.original)}
                  />
                </Tooltip>
              </span>
            )}
        </div>
      );
    },
  },
];

export default columns;
