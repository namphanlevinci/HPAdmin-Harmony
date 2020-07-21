import React, { Component } from "react";
// import { FaTrashRestoreAlt } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { Helmet } from "react-helmet";
import { AiOutlineUserAdd } from "react-icons/ai";
import { connect } from "react-redux";
import {
  GET_ALL_PERMISSION,
  UPDATE_PERMISSIONS,
  GET_PERMISSION_BY_ID,
} from "../../../../actions/user/actions";

import ReactTable from "react-table";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
// import data from "./data.json";
import update from "immutability-helper";

import "./Roles.scss";
import "react-table/react-table.css";
import "../../Merchants/MerchantsList/merchantsList.css";

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.props.GET_ALL_PERMISSION();

    const adminPermissions = this.props.permissions
      .filter(({ waRoleId }) => waRoleId === 1)
      .reduce((obj, item) => item, {});

    const managerPermissions = this.props.permissions
      .filter(({ waRoleId }) => waRoleId === 2)
      .reduce((obj, item) => item, {});

    this.setState({
      loading: true,
      adminPermissions,
      managerPermissions,
    });
  };

  handleChange = (check, name) => {
    console.log("event", check.target.checked);
    console.log("name", name);
    const isCheck = check.target.checked;

    const { adminPermissions, managerPermissions } = this.state;
    const index = Number(name.actionId) - 1;

    if (Number(name.waRoleId) === 1) {
      this.setState({
        [name.action]: isCheck,
      });

      const newState = update(adminPermissions, {
        actions: {
          [index]: {
            $set: {
              ...name,
              roleIsActive: isCheck,
            },
          },
        },
      });
      this.setState({
        adminPermissions: newState,
      });
    }
    if (Number(name.waRoleId) === 2) {
      const newState = update(managerPermissions, {
        actions: {
          [index]: {
            $set: {
              ...name,
              roleIsActive: isCheck,
            },
          },
        },
      });
      this.setState({
        managerPermissions: newState,
      });
    }
  };

  handleUpdatePermission = async () => {
    // console.log("this.state", this.state);
    const { adminPermissions, managerPermissions } = this.state;
    const data = [{ ...adminPermissions }, { ...managerPermissions }];

    await this.props.UPDATE_PERMISSIONS(data);

    await this.props.GET_ALL_PERMISSION();

    setTimeout(() => {
      this.props.GET_PERMISSION_BY_ID(
        this.props?.userLogin?.userAdmin?.waRoleId
      );
    }, 1000);
  };

  render() {
    const { adminPermissions, managerPermissions } = this.state;

    const department = [
      {
        Header: "Title",
        id: "id",
        accessor: "title",
      },
      {
        Header: "Members",
        id: "image",
        accessor: (row) => (
          <img style={styles.img} src={row.image} alt="admin avatar" />
        ),
      },
      {
        // id: "email",
        Header: "No. of Members",
        accessor: "number",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        id: "Action",
        Header: "Action",
        accessor: (row) => (
          <div>
            <span>
              <GoTrashcan size={20} />
            </span>
            <span style={{ margin: "0px 15px" }}>
              <FiEdit size={20} />
            </span>
            <span>
              <AiOutlineUserAdd size={20} />
            </span>
          </div>
        ),
      },
    ];

    const renderPermissionName = adminPermissions?.actions?.map((item) => {
      return (
        <tr key={item.actionId}>
          <td style={{ height: "44px" }}>{item?.name}</td>
        </tr>
      );
    });

    const renderAdmin = adminPermissions?.actions?.map((item) => {
      return (
        <tr key={item.actionId}>
          <td style={{ textAlign: "center" }}>
            <Checkbox
              checked={item?.roleIsActive}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </td>
        </tr>
      );
    });

    const renderManager = managerPermissions?.actions?.map((item) => {
      return (
        <tr key={item.actionId}>
          <td style={{ textAlign: "center" }}>
            <Checkbox
              checked={item?.roleIsActive || ""}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </td>
        </tr>
      );
    });

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Role | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.roles" />}
        />

        <div className="page-heading role">
          {/* <div className="role-department">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0px",
              }}
            >
              <h3>Department</h3>
              <Button className="btn btn-green">NEW DEPARTMENT</Button>
            </div>

            <ReactTable columns={department} data={data} minRows={1} />
          </div> */}
          <div className="role-permissions">
            <h3>Permissions</h3>

            <div style={{ display: "flex" }}>
              <table style={{ width: "30%" }}>
                <tbody>
                  <tr className="module">
                    <th style={styles.none}>''</th>
                  </tr>
                  <tr>
                    <th>Roles</th>
                  </tr>
                  <tr className="module">
                    <th>Module</th>
                  </tr>
                  {renderPermissionName}
                </tbody>
              </table>

              <table style={{ width: "15%" }}>
                <tbody>
                  <tr className="module">
                    <th style={styles.none}>''</th>
                  </tr>
                  <tr className="module2">
                    <th>Administrator</th>
                  </tr>
                  <tr className="module">
                    <th style={styles.none}>""</th>
                  </tr>
                  {renderAdmin}
                </tbody>
              </table>

              <table style={{ width: "15%" }}>
                <tbody>
                  <tr className="module">
                    <th style={styles.none}>''</th>
                  </tr>
                  <tr className="module2">
                    <th>Manager</th>
                  </tr>
                  <tr className="module">
                    <th style={styles.none}>""</th>
                  </tr>
                  {renderManager}
                </tbody>
              </table>
            </div>
            <div style={styles.btn}>
              <Button
                className="btn btn-green"
                onClick={this.handleUpdatePermission}
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer?.User,
  permissions: state.userReducer.allPermission,
});
const mapDispatchToProps = (dispatch) => ({
  GET_ALL_PERMISSION: () => {
    dispatch(GET_ALL_PERMISSION());
  },
  UPDATE_PERMISSIONS: (data) => {
    dispatch(UPDATE_PERMISSIONS(data));
  },
  GET_PERMISSION_BY_ID: (payload) => {
    dispatch(GET_PERMISSION_BY_ID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Roles);

const styles = {
  checkbox: {
    color: "#4251af",
  },
  btn: {
    margin: "40px 0px",
  },
  img: {
    borderRadius: "50%",
    width: "20%",
  },
  none: {
    color: "white",
  },
  role: {
    textAlign: "center !important",
  },
};
