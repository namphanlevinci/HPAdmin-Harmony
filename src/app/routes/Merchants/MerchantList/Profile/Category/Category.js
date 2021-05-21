import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import {
  getCategoryByID,
  viewCategory,
  addMerchantCategoryById,
  restoreCategoryById,
  archiveCategoryById,
  exportCategory,
  importCategory,
  delCategory,
} from "../../../../../../actions/merchantActions";
import {
  Select,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  FormHelperText,
} from "@material-ui/core";

import { WARNING_NOTIFICATION } from "../../../../../../constants/notificationConstants";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckPermissions from "../../../../../../util/checkPermission";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveSVG from "../../../../../../assets/images/archive.svg";
import DelSVG from "../../../../../../assets/images/del.svg";
import EditSVG from "../../../../../../assets/images/edit.svg";
import RestoreSVG from "../../../../../../assets/images/restore.svg";
import DragIndicatorOutlinedIcon from "@material-ui/icons/DragIndicatorOutlined";
import EditCategory from "./EditCategory";
import SearchComponent from "../../../../../../util/searchComponent";
import Pagination from "@/components/Pagination";

import { reloadUrl } from '../../../../../../util/reload';

import "./category.styles.scss";

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
      delDialog: false,
      cateDialog: false,
      // Category ID để update
      categoryId: "",
      edit: false,
      page: 1,
      row: 5,
    };
    this.refTable = React.createRef();
    this.pagination = React.createRef();
  }

  getCategory = () => {
    const ID = this.props.MerchantProfile.merchantId;
    this.props.getCategoryByID(ID);
  };

  componentDidMount() {
    this.getCategory();
  }

  handleToggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleEdit = (e) => {
    this.props.viewCategory(e);
    this.setState({ edit: true });
  };

  handleArchive = (categoryID) => {
    const merchantID = this.props.MerchantProfile.merchantId;
    this.props.archiveCategoryById(categoryID, merchantID);
  };

  handleAddTemplate = async (e) => {
    e.preventDefault();
    const merchantId = this.props.MerchantProfile.merchantId;
    let file = await e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(xlsx)$/)) {
      this.props.importCategory(merchantId, file);
    } else {
      this.props.warningNotify(
        "File type is not supported, Please choose another file "
      );
    }
  };
  handleRestore = (categoryID) => {
    const merchantID = this.props.MerchantProfile.merchantId;
    this.props.restoreCategoryById(categoryID, merchantID);
  };
  handleDel = (categoryID) => {
    const merchantID = this.props.MerchantProfile.merchantId;
    this.props.delCategory(categoryID, merchantID);
  };
  handleExport = () => {
    const merchantID = this.props.MerchantProfile.merchantId;
    this.props.exportCategory(merchantID);
  };

  gotoLastPage = () => {
    const { row } = this.state;
    const pageCount = Math.ceil(this.props.categoryList.categoryList.length / row);
    this.pagination.current.changePage(pageCount);
    this.setState({ page: pageCount });
  }

  updatePagination = () => {
    const page = this.pagination.current.state.page;
    const row = this.pagination.current.state.rowSelected;
    this.setState({ page, row });
  }

  render() {
    let { categoryList, loading } = this.props.categoryList;
    const { row, page } = this.state;
    categoryList = categoryList.slice((page - 1) * row, (page - 1) * row + row);
    const pageCount = Math.ceil(this.props.categoryList.categoryList.length / row);

    if (categoryList) {
      if (this.state.search) {
        categoryList = categoryList.filter((e) => {
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
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
              {CheckPermissions("edit-category") && (
                <span style={{ paddingLeft: "20px" }}>
                  <Tooltip title="Delete">
                    <img
                      alt="delete"
                      src={DelSVG}
                      onClick={() =>
                        this.setState({
                          delDialog: true,
                          categoryId: row.original.categoryId,
                        })
                      }
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
            <SearchComponent
              className="textBox"
              placeholder="Search.."
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              onClickIcon={() => this.setState({ search: "" })}
            />

            <div>
              {/* NEW ADD FORM */}
              {CheckPermissions("add-new-category") && (
                <>
                  <Button
                    className="btn add-category"
                    style={{ marginTop: "0px" }}
                    onClick={() => this.handleExport()}
                  >
                    EXPORT
                  </Button>
                  <div id="upload_button">
                    <label>
                      <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => this.handleAddTemplate(e)}
                      />
                      <span
                        style={{ margin: "0px", marginRight: "10px" }}
                        className="btn btn-green"
                      >
                        IMPORT
                      </span>
                    </label>
                  </div>
                  <Button
                    className="btn add-category"
                    style={{ marginTop: "0px" }}
                    onClick={() => this.setState({ cateDialog: true })}
                  >
                    NEW CATEGORY
                  </Button>
                </>
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
                          const merchantId = this.props.MerchantProfile
                            .merchantId;
                          const payload = {
                            ...values,
                            merchantId,
                            gotoLastPage: this.gotoLastPage
                          };
                          this.props.addMerchantCategoryById(payload);
                          this.setState({ cateDialog: false });
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
                              <div
                                className="category-button"
                                style={{ paddingTop: "10px" }}
                              >
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
              ref={this.refTable}
              data={categoryList}
              columns={columns}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              PaginationComponent={() => <div />}
            />

            <Pagination
              ref={this.pagination}
              fetchApi={this.updatePagination}
              pageCount={pageCount}
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
            {/* // DEL  */}
            <Dialog open={this.state.delDialog}>
              <DialogTitle id="alert-dialog-title">
                {"Delete this Category?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want delete this Category ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    this.setState({ delDialog: false, categoryId: "" })
                  }
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    this.handleDel(this.state.categoryId);
                    this.setState({ delDialog: false });
                  }}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* // EDIT CATEGORY  */}
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
  MerchantProfile: state.merchant.merchant,
  categoryList: state.category,
});
const mapDispatchToProps = (dispatch) => ({
  viewCategory: (payload) => {
    dispatch(viewCategory(payload));
  },
  addMerchantCategoryById: (payload) => {
    dispatch(addMerchantCategoryById(payload));
  },
  getCategoryByID: (MerchantId) => {
    dispatch(getCategoryByID(MerchantId));
  },
  restoreCategoryById: (categoryID, MerchantID) => {
    dispatch(restoreCategoryById(categoryID, MerchantID));
  },
  warningNotify: (message) => {
    dispatch({ type: WARNING_NOTIFICATION, payload: message });
  },
  archiveCategoryById: (categoryID, MerchantID) => {
    dispatch(archiveCategoryById(categoryID, MerchantID));
  },
  exportCategory: (merchantID) => {
    dispatch(exportCategory(merchantID));
  },
  importCategory: (merchantID, file) => {
    dispatch(importCategory(merchantID, file));
  },
  delCategory: (categoryId, merchantId) => {
    dispatch(delCategory(categoryId, merchantId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
