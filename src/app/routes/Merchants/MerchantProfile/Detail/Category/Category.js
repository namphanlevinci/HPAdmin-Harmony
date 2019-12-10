import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import axios from "axios";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import { Formik } from "formik";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "react-table/react-table.css";
import "./category.styles.scss";
import { FaRegEdit, FaTrash, FaTrashRestoreAlt } from "react-icons/fa";
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
      categoryId: ""
    };
  }

  getCategory = () => {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        this.setState({ data: res.data.data, loading: false });
      });
  };

  componentDidMount() {
    this.getCategory();
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  handleEdit = e => {
    this.props.VIEW_SERVICE(e);
    this.props.history.push("/app/merchants/profile/category/edit");
  };

  handleSetState = data => {
    this.setState({
      categoryId: data.categoryType,
      name: data.name
    });
  };

  handleArchive = ID => {
    axios
      .put(URL + "/category/archive/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getCategory();
    }, 1500);
  };

  handleRestore = ID => {
    axios
      .put(URL + "/category/restore/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {});
    this.setState({ isOpenReject: false, loading: true });
    setTimeout(() => {
      this.getCategory();
    }, 1500);
  };
  render() {
    let cagetoryList = this.state.data;
    if (cagetoryList) {
      if (this.state.search) {
        cagetoryList = cagetoryList.filter(e => {
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
      // {
      //   Header: "No.",
      //   accessor: "categoryId",
      //   width: 80
      // },
      {
        Header: "Category Name",
        id: "Name",
        width: 250,
        accessor: "name",
        Cell: row => {
          return (
            <div>
              <p>{row.original.name}</p>
            </div>
          );
        }
      },
      {
        id: "Type",
        Header: "Type",
        accessor: "categoryType",
        Cell: e => (
          <div>
            <p>{e.value}</p>
          </div>
        )
      },
      {
        Header: "Status",
        id: "status",
        accessor: "isDisabled",
        Cell: e => (
          <div>
            <span>{e.value === 0 ? "Active" : "Disable"}</span>
          </div>
        ),
        width: 120
      },
      {
        Header: () => <div style={{ textAlign: "center" }}> Actions </div>,
        id: "Actions",
        sortable: false,
        Cell: row => {
          return (
            <div style={{ textAlign: "center" }}>
              {row.original.isDisabled !== 1 ? (
                <FaTrash
                  size={20}
                  onClick={() => [
                    this.setState({
                      categoryId: row.original.categoryId,
                      dialog: true
                    })
                  ]}
                />
              ) : (
                <FaTrashRestoreAlt
                  size={20}
                  onClick={() =>
                    this.setState({
                      categoryId: row.original.categoryId,
                      restoreDialog: true
                    })
                  }
                />
              )}
              <span style={{ paddingLeft: "20px" }}>
                <FaRegEdit
                  size={20}
                  onClick={() => this.handleEdit(row.original)}
                />
              </span>
            </div>
          );
        }
      }
    ];

    return (
      <div className="react-transition swipe-up category-container">
        <NotificationContainer />
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="search">
              <form>
                {/* <SearchIcon className="button" title="Search" /> */}
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={e => this.setState({ search: e.target.value })}
                />
              </form>
            </div>
            <div>
              {/* NEW ADD FORM */}
              <Button
                className="btn add-category"
                onClick={() => this.setState({ cateDialog: true })}
              >
                {" "}
                NEW CATEGORY{" "}
              </Button>
              <Dialog
                open={this.state.cateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <div className="category">
                    <h2 className="title">New Category</h2>
                    <div>
                      <Formik
                        initialValues={{ categoryType: "", name: "" }}
                        validate={values => {
                          const errors = {};
                          if (!values.categoryType) {
                            errors.categoryType = "Please choose a Type";
                          }
                          if (!values.name) {
                            errors.name = "Please enter category name";
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
                                merchantId
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
                                }
                              }
                            )
                            .then(res => {
                              let message = res.data.message;
                              if (res.data.codeNumber === 200) {
                                this.setState({ cateDialog: false });

                                NotificationManager.success(message, null, 800);
                                setTimeout(() => {
                                  this.getCategory();
                                }, 800);
                              } else {
                                NotificationManager.error(message, null, 800);
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
                          isSubmitting
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <label style={{ padding: "10px 0px" }}>
                              Category Type*
                            </label>
                            <select
                              className={
                                errors.categoryType && touched.categoryType
                                  ? "text-input error"
                                  : "text-input"
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="categoryType"
                            >
                              <option value="">Type</option>
                              <option value="Product">Product</option>
                              <option value="Service">Service</option>
                            </select>

                            {/* {errors.categoryType && touched.categoryType && (
                              <div className="input-feedback">
                                {errors.categoryType}
                              </div>
                            )} */}

                            <label style={{ padding: "10px 0px" }}>
                              Category Name*
                            </label>
                            <input
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
                                className="green"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                SAVE
                              </Button>
                              <Button
                                style={{ marginTop: "20px" }}
                                className="red"
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
          <div className="MListContainer">
            <ReactTable
              data={cagetoryList}
              columns={columns}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
            />

            {/* ARCHIVE */}
            <Dialog
              open={this.state.dialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Archive this category ?"}
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
                    this.setState({ dialog: false, categoryId: "" })
                  ]}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* RESTORE */}
            <Dialog
              open={this.state.restoreDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Restore this category ?"}
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
                    this.setState({ restoreDialog: false, categoryId: "" })
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

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  VIEW_SERVICE: payload => {
    dispatch(VIEW_SERVICE(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
