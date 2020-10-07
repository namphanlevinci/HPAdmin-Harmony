import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import { Formik } from "formik";
import { config } from "../../../../../../url/url";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../../../actions/notifications/actions";

import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import ReactTable from "react-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";

import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";

import EditCategory from "./edit-category";

import "react-table/react-table.css";
import "./category.styles.scss";

const URL = config.url.URL;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true,
      categoryType: null,
      name: null,
      // Archive & Restore & Add Category
      dialog: false,
      restoreDialog: false,
      cateDialog: false,
      // Category ID để update
      categoryId: "",
      edit: false,
    };
  }

  getCategory = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getCategory();
  }

  handleToggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleEdit = (e) => {
    this.props.VIEW_SERVICE(e);
    this.setState({ edit: true });
  };

  handleArchive = (ID) => {
    axios
      .put(URL + "/category/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getCategory();
    }, 1500);
  };

  handleRestore = (ID) => {
    axios
      .put(URL + "/category/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getCategory();
    }, 1500);
  };
  render() {
    let cagetoryList = this.state.data;
    if (cagetoryList) {
      if (this.state.search) {
        cagetoryList = cagetoryList.filter((e) => {
          if (e !== null) {
            return (
              e.name
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          }
          return null;
        });
      }
    }

    const columns = [
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
        Header: "Category Name",
        id: "Name",
        accessor: "name",
        Cell: (row) => {
          return (
            <div>
              <p style={{ fontWeight: "400" }}>{row.original.name}</p>
            </div>
          );
        },
      },
      {
        id: "Type",
        Header: "Type",
        accessor: "categoryType",
        Cell: (e) => (
          <div>
            <p>{e.value.toUpperCase()}</p>
          </div>
        ),
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: (e) => (
          <div style={{ fontWeight: 400 }}>
            <p>{e.value === 0 ? "Active" : "Inactive"}</p>
          </div>
        ),
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        id: "Actions",
        sortable: false,
        Cell: (row) => {
          const actionsBtn =
            row.original.isDisabled !== 1 ? (
              <Tooltip title="Archive">
                <img
                  alt="archive"
                  src={ArchiveSVG}
                  onClick={() => [
                    this.setState({
                      categoryId: row.original.categoryId,
                      dialog: true,
                    }),
                  ]}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Restore">
                <img
                  alt="restore"
                  src={RestoreSVG}
                  onClick={() =>
                    this.setState({
                      categoryId: row.original.categoryId,
                      restoreDialog: true,
                    })
                  }
                />
              </Tooltip>
            );
          return (
            <div style={{ textAlign: "center" }}>
              {CheckPermissions("active-category") && actionsBtn}

              {CheckPermissions("edit-category") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Edit">
                    <img
                      alt="edit"
                      src={EditSVG}
                      onClick={() => this.handleEdit(row.original)}
                    />
                  </Tooltip>
                </span>
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="react-transition swipe-up category-container">
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="search">
              <form>
                {/* <SearchIcon className="button" title="Search" /> */}
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div>
              {/* NEW ADD FORM */}
              {CheckPermissions("add-new-category") && (
                <Button
                  className="btn add-category"
                  style={{ marginTop: "0px" }}
                  onClick={() => this.setState({ cateDialog: true })}
                >
                  NEW CATEGORY
                </Button>
              )}

              <Dialog open={this.state.cateDialog}>
                <DialogContent>
                  <div className="category">
                    <div className="category-title-container">
                      <h2 className="title">New Category</h2>
                    </div>
                    <div>
                      <Formik
                        initialValues={{ categoryType: "", name: "" }}
                        validate={(values) => {
                          const errors = {};
                          if (!values.categoryType) {
                            errors.categoryType = "Category type is required";
                          }
                          if (!values.name) {
                            errors.name = "Category name is required";
                          }
                          return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          const { categoryType, name } = values;
                          const merchantId = this.props.MerchantProfile
                            .merchantId;
                          axios
                            .post(
                              URL + "/category",
                              {
                                categoryType,
                                name,
                                merchantId,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${this.props.userLogin.token}`,
                                },
                              }
                            )
                            .then((res) => {
                              let message = res.data.message;
                              if (res.data.codeNumber === 200) {
                                this.setState({ cateDialog: false });
                                this.props.successNotify(message);

                                setTimeout(() => {
                                  this.getCategory();
                                }, 800);
                              } else {
                                this.props.failureNotify(message);
                              }
                            });
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          setFieldValue,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControl style={{ width: "50%" }}>
                                  <InputLabel
                                    className={
                                      errors.categoryType &&
                                      touched.categoryType
                                        ? "error-text"
                                        : ""
                                    }
                                  >
                                    Category Type*
                                  </InputLabel>
                                  <Select
                                    onChange={(e) => {
                                      setFieldValue(
                                        "categoryType",
                                        e.target.value
                                      );
                                    }}
                                    error={
                                      errors.categoryType &&
                                      touched.categoryType
                                    }
                                  >
                                    <MenuItem value="Product">Product</MenuItem>
                                    <MenuItem value="Service">Service</MenuItem>
                                  </Select>
                                  {errors.categoryType &&
                                  touched.categoryType ? (
                                    <FormHelperText className="error-text">
                                      {errors.categoryType}
                                    </FormHelperText>
                                  ) : null}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  type="text"
                                  name="name"
                                  margin="normal"
                                  label="Category Name*"
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  error={errors.name && Boolean(touched.name)}
                                  helperText={
                                    errors.name && touched.name
                                      ? errors.name
                                      : ""
                                  }
                                />
                              </Grid>
                              <div className="category-button">
                                <Button
                                  className="btn btn-green"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  SAVE
                                </Button>
                                <Button
                                  className="btn btn-red"
                                  onClick={() =>
                                    this.setState({ cateDialog: false })
                                  }
                                >
                                  CANCEL
                                </Button>
                              </div>
                            </Grid>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="merchant-list-container category__container">
            <ReactTable
              data={cagetoryList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog open={this.state.dialog}>
              <DialogTitle id="alert-dialog-title">
                {"Archive this Category?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This category will not appear on the app. You can restore this
                  category by clicking the Restore button.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ dialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleArchive(this.state.categoryId),
                    this.setState({ dialog: false, categoryId: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* RESTORE */}
            <Dialog open={this.state.restoreDialog}>
              <DialogTitle id="alert-dialog-title">
                {"Restore this Category?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This category will appear on the app as well as the related
                  lists.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ restoreDialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => [
                    this.handleRestore(this.state.categoryId),
                    this.setState({ restoreDialog: false, categoryId: "" }),
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

            {/* // EDIT CAGETORY  */}
            <Dialog open={this.state.edit} maxWidth="sm" fullWidth>
              <DialogTitle>{"Edit Category"}</DialogTitle>
              <DialogContent>
                <EditCategory
                  toggleEdit={this.handleToggleEdit}
                  getCategory={this.getCategory}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_SERVICE: (payload) => {
    dispatch(VIEW_SERVICE(payload));
  },
  successNotify: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  failureNotify: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
