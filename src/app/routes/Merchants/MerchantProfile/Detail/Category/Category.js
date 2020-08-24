import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import { Formik } from "formik";
import { store } from "react-notifications-component";
import { config } from "../../../../../../url/url";

import ReactTable from "react-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "react-select";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";

import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";

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

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };

  handleEdit = (e) => {
    this.props.VIEW_SERVICE(e);
    this.props.history.push("/app/merchants/profile/category/edit");
  };

  handleSetState = (data) => {
    this.setState({
      categoryId: data.categoryType,
      name: data.name,
    });
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
              {CheckPermissions(19) && actionsBtn}

              {CheckPermissions(20) && (
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

    const categorySelect = [
      { value: "Product", label: "Product" },
      { value: "Service", label: "Service" },
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

              {CheckPermissions(18) && (
                <Button
                  className="btn add-category"
                  style={{ marginTop: "0px" }}
                  onClick={() => this.setState({ cateDialog: true })}
                >
                  NEW CATEGORY
                </Button>
              )}

              <Dialog
                open={this.state.cateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
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
                            errors.categoryType = "Required";
                          }
                          if (!values.name) {
                            errors.name = "Required";
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
                                store.addNotification({
                                  title: "SUCCESS!",
                                  message: `${message}`,
                                  type: "success",
                                  insert: "top",
                                  container: "top-right",
                                  animationIn: ["animated", "fadeIn"],
                                  animationOut: ["animated", "fadeOut"],
                                  dismiss: {
                                    duration: 5000,
                                    onScreen: true,
                                  },
                                  width: 250,
                                });

                                setTimeout(() => {
                                  this.getCategory();
                                }, 800);
                              } else {
                                store.addNotification({
                                  title: "ERROR!",
                                  message: `${message}`,
                                  type: "success",
                                  insert: "top",
                                  container: "top-right",
                                  animationIn: ["animated", "fadeIn"],
                                  animationOut: ["animated", "fadeOut"],
                                  dismiss: {
                                    duration: 5000,
                                    onScreen: true,
                                  },
                                  width: 250,
                                });
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
                            <h5>Category Type*</h5>

                            <div className="select-category">
                              <Select
                                options={categorySelect}
                                className={
                                  errors.categoryType && touched.categoryType
                                    ? "text-input error"
                                    : "text-input"
                                }
                                onChange={(selectedOption) => {
                                  // console.log({ value: selectedOption.value });
                                  setFieldValue(
                                    "categoryType",
                                    selectedOption.value
                                  );
                                }}
                              />
                            </div>
                            {errors.categoryType && touched.categoryType && (
                              <div className="input-feedback">
                                {errors.categoryType}
                              </div>
                            )}

                            <h5>Category Name*</h5>
                            <input
                              style={{
                                padding: "10px",
                                height: "50px",
                                width: "100%",
                              }}
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              className={
                                errors.name && touched.name
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.name && touched.name && (
                              <div className="input-feedback">
                                {errors.name}
                              </div>
                            )}
                            <div className="category-button">
                              <Button
                                style={{ marginTop: "20px" }}
                                className="btn btn-green"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                SAVE
                              </Button>
                              <Button
                                style={{ marginTop: "20px" }}
                                className="btn btn-red"
                                onClick={() =>
                                  this.setState({ cateDialog: false })
                                }
                              >
                                CANCEL
                              </Button>
                            </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
