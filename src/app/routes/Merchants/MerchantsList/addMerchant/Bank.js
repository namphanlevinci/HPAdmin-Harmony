import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import "./addMerchant.css";
class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      fileId: "",

      //~ image preview
      imagePreviewUrl: ""
    };
  }

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="void" />;
    } else {
      $imagePreview = <div className="previewText"></div>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <lable>Bank Name*</lable>
              <TextField
                id="cardHolder"
                label="Bank Name"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <lable>ABA Routing Number*</lable>
              <TextField
                id="cardHolder"
                label="ABA Number"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <lable>Checking Account Number (DDA)*</lable>
              <TextField
                id="cardHolder"
                label="DDA Number"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <lable>
                Void Check* <br />
                Please upload photos of void check
              </lable>
              <div class="Upload">
                <div className="void-Image">{$imagePreview}</div>
                <input
                  type="file"
                  class="upload"
                  onChange={e => this._handleImageChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bank;
