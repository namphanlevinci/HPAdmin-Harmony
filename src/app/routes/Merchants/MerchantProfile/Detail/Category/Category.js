import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import axios from "axios";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import { VIEW_SERVICE } from "../../../../../../actions/merchants/actions";
import Popup from "reactjs-popup";
import { Formik } from "formik";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true,
      isOpenReject: false,
      isOpenEdit: false,
      categoryType: null,
      name: null
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

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };
  handleOpenReject = () => {
    this.setState({ isOpenReject: true });
  };
  handleCloseEdit = () => {
    this.setState({ isOpenEdit: false });
  };
  handleOpenEdit = () => {
    this.setState({ isOpenEdit: true });
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
      {
        Header: "No.",
        accessor: "categoryId",
        width: 80
      },
      {
        Header: "Name",
        id: "Name",
        width: 250,
        accessor: "name",
        Cell: row => {
          return <div>{row.original.name}</div>;
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
              <Button
                className="btn"
                style={{
                  backgroundColor: "#0764b0",
                  color: "white",
                  padding: "10px 20px"
                }}
                onClick={() => this.handleEdit(row.original)}
              >
                Edit
              </Button>
              {row.original.isDisabled !== 1 ? (
                <Popup
                  trigger={
                    <Button
                      className="btn"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 20px"
                      }}
                    >
                      {" "}
                      Archive{" "}
                    </Button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="Disable-Popup">
                    <h2 className="title">
                      Do you want to Archire this Category?
                    </h2>
                    <div className="Disable-Button">
                      <Button
                        type="submit"
                        className="btn btn-red"
                        onClick={this.handleCloseReject}
                      >
                        BACK
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-green"
                        onClick={() =>
                          this.handleArchive(row.original.categoryId)
                        }
                      >
                        COMFIRM
                      </Button>
                    </div>
                  </div>
                </Popup>
              ) : (
                // handle Restore
                <Popup
                  trigger={
                    <Button
                      className="btn"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "10px 20px"
                      }}
                    >
                      {" "}
                      Restore{" "}
                    </Button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="Disable-Popup">
                    <h2 className="title">
                      Do you want to Restore this Category?
                    </h2>
                    <div className="Disable-Button">
                      <Button
                        type="submit"
                        className="btn btn-red"
                        onClick={this.handleCloseReject}
                      >
                        BACK
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-green"
                        onClick={() =>
                          this.handleRestore(row.original.categoryId)
                        }
                      >
                        COMFIRM
                      </Button>
                    </div>
                  </div>
                </Popup>
              )}
            </div>
          );
        }
      }
    ];

    return (
      <div className="content GeneralContent react-transition swipe-up Staff">
        <NotificationContainer />
        <div className="MerList" style={{ padding: "10px" }}>
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
              <Popup
                trigger={
                  <Button className="btn btn-green"> ADD CATEGORY </Button>
                }
                modal
                closeOnDocumentClick
                open={this.state.isOpenReject}
                onOpen={this.handleOpenReject}
              >
                <div className="Disable-Popup Service">
                  <h2 className="title">Add Category</h2>
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
                              this.setState({ isOpenReject: false });

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
                              errors.name && touched.name
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
                          {errors.categoryType && touched.categoryType && (
                            <div className="input-feedback">
                              {errors.categoryType}
                            </div>
                          )}

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
                            <div className="input-feedback">{errors.name}</div>
                          )}
                          <div className="Disable-Button">
                            <Button
                              style={{ marginTop: "20px" }}
                              className="btn btn-red"
                              onClick={this.handleCloseReject}
                            >
                              BACK
                            </Button>
                            <Button
                              style={{ marginTop: "20px" }}
                              className="btn btn-green"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              ADD
                            </Button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Popup>
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
