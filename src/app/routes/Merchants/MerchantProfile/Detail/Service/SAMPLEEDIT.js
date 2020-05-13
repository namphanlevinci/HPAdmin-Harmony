import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { store } from "react-notifications-component";

import Extra from "./extra";
import Button from "@material-ui/core/Button";
import axios from "axios";
import URL, { upFileUrl } from "../../../../../../url/url";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";

import "react-table/react-table.css";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantsList/merchantsList.css";
import "../Detail.css";
import "./service.style.scss";
class EditServiceTEST extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categoryId: "",
      categoryName: "",
      description: "",
      discount: "",
      fileId: "",
      name: "",
      openTime: "",
      position: "",
      price: "",
      secondTime: "",
      serviceId: "",
      duration: "",
      isDisabled: "",
      imageUrl: "",
      extras: [],
      //~ preview image
      imagePreviewUrl: "",
      // openEdit: false,
    };
  }
  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        this.setState({ category: res.data.data });
      });
    const service = this.props.SERVICE;
    if (service !== null) {
      this.setState({
        categoryId: service.categoryId,
        categoryName: service.categoryName,
        description: service.description,
        discount: service.discount,
        fileId: service.fileId,
        name: service.name,
        openTime: service.openTime,
        position: service.position,
        price: service.price,
        secondTime: service.secondTime,
        duration: service.duration,
        isDisabled: service.isDisabled,
        imageUrl: service.imageUrl,
        extras: service.extras,
        serviceId: service.serviceId,
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  _handleImageChange = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  goBack = () => {
    // this.props.history.push("/app/merchants/profile/service");
    this.setState({ openEdit: false });
  };

  handleOpenEdit = () => {
    this.setState({ openEdit: !this.state.openEdit });
  };

  updateService = () => {
    const {
      categoryId,
      name,
      duration,
      description,
      openTime,
      secondTime,
      price,
      discount,
      isDisabled,
      fileId,
      extras,
      serviceId,
    } = this.state;
    const merchantId = this.props.MerchantProfile.merchantId;
    axios
      .put(
        URL + "/service/" + serviceId,
        {
          categoryId,
          name,
          duration,
          description,
          openTime,
          secondTime,
          price,
          discount,
          isDisabled,
          fileId,
          extras,
          merchantId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        }
      )
      .then((res) => {
        let message = res.data.message;
        if (res.data.codeNumber === 200) {
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
            this.props.history.push("/app/merchants/profile/service");
          }, 800);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: `${message}`,
            type: "danger",
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
  };

  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    const service = this.props.SERVICE;
    const { category } = this.state;
    const mapCategory = category
      .filter((e) => e.categoryType !== "Product")
      .map((e) => (
        <option value={e.categoryId} key={e.categoryId}>
          {e.name}
        </option>
      ));

    //~ preview image
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "150px", height: "150px" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl}
          style={{ width: "150px", height: "150px" }}
          alt="void"
        />
      );
    }

    //FORMIK VALIDATE
    const validationSchema = Yup.object().shape({
      extras: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .min(3, "too short")
            .required("Required"),
          duration: Yup.string().required("Required"),
          price: Yup.string().required("Required"),
          isDisabled: Yup.string().required("Required"),
        })
      ),
    });

    const extraItem = service.extras.filter((e) => e.isDeleted !== 1);
    return (
      <div>
        <Button className="btn btn-green" onClick={this.handleOpenEdit}>
          NEW SERVICE
        </Button>
        <Dialog
          fullScreen
          open={this.props.isOpen}
          onClose={this.props.CloseEdit}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleOpenEdit}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <div className="profile-nav PendingLBody">
              <div className="detail-content">
                <div className="service-container">
                  <h2 style={{ color: "#4251af" }}>Edit Service</h2>
                  <div className="container Service">
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-6">
                            <label>Category*</label>
                            <br />
                            <select
                              onChange={(e) =>
                                this.setState({ categoryId: e.target.value })
                              }
                              defaultValue={service.categoryId}
                            >
                              <option>{service.categoryName}</option>
                              {mapCategory}
                            </select>
                          </div>
                          <div className="col-6">
                            <label>Service Name*</label>
                            <br />
                            <input
                              name="name"
                              type="text"
                              value={this.state.name}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <label>Description*</label>
                            <br />
                            <input
                              name="description"
                              type="text"
                              value={this.state.description}
                              onChange={this.handleChange}
                            />
                            <label style={{ paddingTop: "10px" }}>Image</label>
                            <br />
                            {$imagePreview}
                            <input
                              name="price"
                              type="file"
                              onChange={this._handleImageChange}
                              style={{
                                width: "auto",
                                borderBottom: "none",
                                paddingTop: "20px",
                                fontWeight: 400,
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <label>
                              Duration*{" "}
                              <span className="small-label">(Minutes)</span>
                            </label>
                            <br />
                            <input
                              name="duration"
                              type="number"
                              value={this.state.duration}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label>
                              Open Time{" "}
                              <span className="small-label">(Minutes)</span>
                            </label>
                            <br />
                            <input
                              name="openTime"
                              type="number"
                              value={this.state.openTime}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label>
                              Second Time{" "}
                              <span className="small-label">(Minutes)</span>
                            </label>
                            <br />
                            <input
                              name="secondTime"
                              type="number"
                              value={this.state.secondTime}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-6">
                            <label>Status</label>
                            <br />
                            <select
                              onChange={(e) =>
                                this.setState({ isDisabled: e.target.value })
                              }
                              // defaultValue={this.state.isDisabled}
                            >
                              <option
                                value="0"
                                selected={this.state.isDisabled === 0}
                              >
                                Active
                              </option>
                              <option
                                value="1"
                                selected={this.state.isDisabled === 1}
                              >
                                Disable
                              </option>
                            </select>
                          </div>
                          <div className="col-6">
                            <label>Price*</label>
                            <br />
                            <input
                              name="price"
                              type="number"
                              value={this.state.price}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <Formik
                          initialValues={{ extras: extraItem }}
                          validationSchema={validationSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            this.setState({
                              extras: values.extras,
                            });
                            this.updateService();
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
                            /* and other goodies */
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <Extra
                                errors={errors}
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                touched={touched}
                              />

                              <Button
                                className="btn btn-green"
                                type="submit"
                                style={{
                                  backgroundColor: "#4251af",
                                  color: "white",
                                }}
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                              >
                                SAVE
                              </Button>
                              <Button
                                className="btn btn-red"
                                onClick={this.handleOpenEdit}
                              >
                                BACK
                              </Button>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps,
});
export default connect(mapStateToProps)(EditServiceTEST);
