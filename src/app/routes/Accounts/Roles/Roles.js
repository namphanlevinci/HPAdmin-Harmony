import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  GET_ALL_PERMISSION,
  UPDATE_PERMISSIONS,
  GET_PERMISSION_BY_ID,
} from "../../../../actions/user/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// import ReactTable from "react-table";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { CustomTitle } from "../../../../util/CustomText";
import update from "immutability-helper";
import CheckPermissions from "../../../../util/checkPermission";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

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
    // console.log("this.state.adminPermissions", this.state.adminPermissions);
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
          {item.title && (
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
          )}
          <div className="permission_name_container">
            <Typography variant="subtitle1" gutterBottom>
              {item.name}
            </Typography>
          </div>
        </div>
      );
    });

    const renderAdmin = adminPermissions?.actions?.map((item) => {
      return (
        <div key={item.actionId} className="permission_name">
          {item.title && (
            <Typography variant="h6" gutterBottom className="none">
              null
            </Typography>
          )}

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
          {item.title && (
            <Typography variant="h6" gutterBottom className="none">
              null
            </Typography>
          )}

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
          {item.title && (
            <Typography variant="h6" gutterBottom className="none">
              null
            </Typography>
          )}

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
          {item.title && (
            <Typography variant="h6" gutterBottom className="none">
              null
            </Typography>
          )}

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

          {this.props.isLoading ? (
            <div style={styles.loading}>
              <CircularProgress size={42} />
            </div>
          ) : (
            <div className="role_permissions">
              <h3>Permissions</h3>
              <Grid container spacing={0}>
                <Grid item xs={6} sm={4}>
                  <CustomTitle value="Roles" />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <CustomTitle
                    value="Administrator"
                    className="permission_role_name"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <CustomTitle
                    value="Manager"
                    className="permission_role_name"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <CustomTitle
                    value="Staff Level 1"
                    className="permission_role_name"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <CustomTitle
                    value="Staff Level 2"
                    className="permission_role_name"
                  />
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

              {CheckPermissions("edit-role") && (
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
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer?.User,
  permissions: state.userReducer.Permissions,
  isLoading: state.userReducer?.loadingAllPermissions,
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
  loading: {
    display: "flex",
    justifyContent: "center",
    minHeight: "500px",
    alignItems: "center",
  },
};
