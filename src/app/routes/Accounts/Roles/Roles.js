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

// import ReactTable from "react-table";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
// import data from "./data.json";
import update from "immutability-helper";
import CheckPermissions from "../../../../util/checkPermission";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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

    const staff1Permissions = this.props.permissions
      .filter(({ waRoleId }) => waRoleId === 3)
      .reduce((obj, item) => item, {});

    const staff2Permissions = this.props.permissions
      .filter(({ waRoleId }) => waRoleId === 4)
      .reduce((obj, item) => item, {});

    this.setState({
      loading: true,
      adminPermissions,
      managerPermissions,
      staff1Permissions,
      staff2Permissions,
    });
  };

  handleChange = (check, name) => {
    const isCheck = check.target.checked;

    const {
      adminPermissions,
      managerPermissions,
      staff1Permissions,
      staff2Permissions,
    } = this.state;
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
    if (Number(name.waRoleId) === 3) {
      this.setState({
        [name.action]: isCheck,
      });

      const newState = update(staff1Permissions, {
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
        staff1Permissions: newState,
      });
    }
    if (Number(name.waRoleId) === 4) {
      this.setState({
        [name.action]: isCheck,
      });

      const newState = update(staff2Permissions, {
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
        staff2Permissions: newState,
      });
    }
  };

  handleUpdatePermission = async () => {
    const ID = this.props?.userLogin?.userAdmin?.waRoleId;
    const {
      adminPermissions,
      managerPermissions,
      staff1Permissions,
      staff2Permissions,
    } = this.state;
    const data = [
      { ...adminPermissions },
      { ...managerPermissions },
      { ...staff1Permissions },
      { ...staff2Permissions },
    ];

    await this.props.UPDATE_PERMISSIONS(data, ID);
  };

  render() {
    const {
      adminPermissions,
      managerPermissions,
      staff1Permissions,
      staff2Permissions,
    } = this.state;

    // const department = [
    //   {
    //     Header: "Title",
    //     id: "id",
    //     accessor: "title",
    //   },
    //   {
    //     Header: "Members",
    //     id: "image",
    //     accessor: (row) => (
    //       <img style={styles.img} src={row.image} alt="admin avatar" />
    //     ),
    //   },
    //   {
    //     // id: "email",
    //     Header: "No. of Members",
    //     accessor: "number",
    //   },
    //   {
    //     Header: "Status",
    //     accessor: "status",
    //   },
    //   {
    //     id: "Action",
    //     Header: "Action",
    //     accessor: (row) => (
    //       <div>
    //         <span>
    //           <GoTrashcan size={20} />
    //         </span>
    //         <span style={{ margin: "0px 15px" }}>
    //           <FiEdit size={20} />
    //         </span>
    //         <span>
    //           <AiOutlineUserAdd size={20} />
    //         </span>
    //       </div>
    //     ),
    //   },
    // ];

    const renderPermissionName = adminPermissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && <h4>{item.title}</h4>}
          <div className="permission_name_container">
            <p>{item.name}</p>
          </div>
        </div>
      );
    });

    const renderAdmin = adminPermissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && <h4 className="none">{item.title}</h4>}

          <div
            style={{ textAlign: "center" }}
            className="permission_name_check"
          >
            <Checkbox
              checked={item?.roleIsActive}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </div>
        </div>
      );
    });

    const renderManager = managerPermissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && <h4 className="none">{item.title}</h4>}

          <div
            style={{ textAlign: "center" }}
            className="permission_name_check"
          >
            <Checkbox
              checked={item?.roleIsActive}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </div>
        </div>
      );
    });

    const renderStaffLv1 = staff1Permissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && <h4 className="none">{item.title}</h4>}

          <div
            style={{ textAlign: "center" }}
            className="permission_name_check"
          >
            <Checkbox
              checked={item?.roleIsActive}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </div>
        </div>
      );
    });

    const renderStaffLv2 = staff2Permissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && <h4 className="none">{item.title}</h4>}

          <div
            style={{ textAlign: "center" }}
            className="permission_name_check"
          >
            <Checkbox
              checked={item?.roleIsActive}
              style={styles.checkbox}
              onChange={(check) => this.handleChange(check, item)}
              name={item?.action}
            />
          </div>
        </div>
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
          <div className="role_permissions">
            <h3>Permissions</h3>
            <Grid container spacing={0}>
              <Grid item xs={6} sm={4}>
                <p>Roles</p>
              </Grid>
              <Grid item xs={6} sm={2}>
                <p style={styles.p}>Administrator</p>
              </Grid>
              <Grid item xs={6} sm={2}>
                <p style={styles.p}>Manager</p>
              </Grid>
              <Grid item xs={6} sm={2}>
                <p style={styles.p}>Staff Level 1</p>
              </Grid>
              <Grid item xs={6} sm={2}>
                <p style={styles.p}>Staff Level 2</p>
              </Grid>
              <Grid item xs={6} sm={4}>
                {renderPermissionName}
              </Grid>
              <Grid item xs={6} sm={2}>
                {renderAdmin}
              </Grid>
              <Grid item xs={6} sm={2}>
                {renderManager}
              </Grid>
              <Grid item xs={6} sm={2}>
                {renderStaffLv1}
              </Grid>
              <Grid item xs={6} sm={2}>
                {renderStaffLv2}
              </Grid>
            </Grid>

            {CheckPermissions(52) && (
              <div style={styles.btn}>
                <Button
                  className="btn btn-green"
                  onClick={this.handleUpdatePermission}
                >
                  SAVE
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer?.User,
  permissions: state.userReducer.Permissions,
});
const mapDispatchToProps = (dispatch) => ({
  GET_ALL_PERMISSION: () => {
    dispatch(GET_ALL_PERMISSION());
  },
  UPDATE_PERMISSIONS: (data, ID) => {
    dispatch(UPDATE_PERMISSIONS(data, ID));
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
  p: {
    textAlign: "center",
  },
};
