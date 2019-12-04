import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import URL, { upfileUrl } from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
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

class EditService extends Component {
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
      imagePreviewUrl: ""
    };
  }
  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(URL + "/category/getbymerchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
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
        serviceId: service.serviceId
      });
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  _handleImageChange = e => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(upfileUrl, formData, config)
      .then(res => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/service");
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
      serviceId
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
          NotificationManager.success(message, null, 800);
        } else {
          NotificationManager.error(message, null, 800);
        }
      });
  };

  render() {
    const service = this.props.SERVICE;
    const { category } = this.state;
    const mapCategory = category
      .filter(e => e.categoryType !== "Product")
      .map(e => (
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
          style={{ width: "350px", height: "350px" }}
          alt="void"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={this.state.imageUrl}
          style={{ width: "350px", height: "350px" }}
          alt="void"
        />
      );
    }

    return (
      <div className="react-transition swipe-up">
        <h2 style={{ color: "#0764b0" }}>Edit Service</h2>
        <NotificationContainer />
        <div className="container Service">
          <div className="row">
            <div className="col-md-5">
              <label>Image*</label>
              <br />
              {$imagePreview}
              <input
                name="price"
                type="file"
                onChange={this._handleImageChange}
                style={{
                  width: "auto",
                  borderBottom: "none",
                  paddingTop: "20px"
                }}
              />
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-6">
                  <label>Category*</label>
                  <br />
                  <select
                    onChange={e =>
                      this.setState({ categoryId: e.target.value })
                    }
                  >
                    <option value={service.categoryId}>
                      {service.categoryName}
                    </option>
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
                </div>
                <div className="col-md-4">
                  <label>
                    Duration* <span className="small-label">(Minutes)</span>
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
                    Open Time <span className="small-label">(Minutes)</span>
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
                    Second Time <span className="small-label">(Minutes)</span>
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
                    onChange={e =>
                      this.setState({ isDisabled: e.target.value })
                    }
                  >
                    <option value="0" selected={this.state.isDisabled === 0}>
                      Active
                    </option>
                    <option value="1" selected={this.state.isDisabled === 1}>
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
          </div>

          <Button
            className="btn btn-green"
            style={{ backgroundColor: "#0074d9", color: "white" }}
            onClick={this.updateService}
          >
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this.goBack}>
            BACK
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  SERVICE: state.serviceProps
});
export default connect(mapStateToProps)(EditService);
