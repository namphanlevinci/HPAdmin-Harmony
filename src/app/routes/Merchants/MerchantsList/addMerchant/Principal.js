import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <React.Fragment>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <h4>
              Please provide the following information for each individual who
              owns, directly or indirectly, 25% or more of the equity intersest
              of your business
            </h4>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4">
            <div className="form-group">
              <label>Principal Name*</label>
              <TextField
                name="legalBusinessName"
                label="First Name"
                margin="normal"
                type="text"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
          <div className="col-md-5 ">
            <div className="form-group">
              <label style={{ color: "white" }}>Principal Name*</label>
              <TextField
                name="legalBusinessName"
                label="Last Name"
                margin="normal"
                type="text"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
          <div className="col-md-9 ">
            <div className="form-group">
              <label>Title/Position*</label>
              <TextField
                name="legalBusinessName"
                label="Title/Position"
                margin="normal"
                type="text"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <label>Ownership (%)*</label>
              <TextField
                name="legalBusinessName"
                label="Ownership"
                margin="normal"
                type="text"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <label>Home Phone*</label>
            <div>
              <select
                style={{ padding: "10px", width: "100%" }}
                onChange={e =>
                  this.setState({ phoneCodeBusiness: e.target.value })
                }
              >
                <option value="+1">+1</option>
                <option value="+84">+84</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label style={{ color: "white" }}>Phone Number*</label>
              <TextField
                name="legalBusinessName"
                label="Home Phone"
                margin="normal"
                type="number"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <label>Mobile Phone*</label>
            <div>
              <select
                style={{ padding: "10px", width: "100%" }}
                onChange={e =>
                  this.setState({ phoneCodeBusiness: e.target.value })
                }
              >
                <option value="+1">+1</option>
                <option value="+84">+84</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label style={{ color: "white" }}>Phone Number*</label>
              <TextField
                name="legalBusinessName"
                label="Mobile Phone"
                margin="normal"
                type="number"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <label>Address*</label>
              <TextField
                name="address"
                label="Home Address"
                margin="normal"
                type="text"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="city"
                label="City"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="state"
                label="State"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="zip"
                label="Zip"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="form-group">
              <label>Social Security Number (SSN)*</label>
              <TextField
                name="zip"
                label="SSN"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="form-group">
              <label>Date of Birth (MM/DD/YY)</label>
              <TextField
                name="zip"
                label="Zip"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="form-group">
              <label>Email Address*</label>
              <TextField
                name="zip"
                label="Email"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6">
            <label>Driver License Number*</label>
            <div className="form-group">
              <TextField
                name="firstName"
                label="Driver License Number"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label style={{ color: "white" }}>State Issued*</label>
            <div className="form-group">
              <TextField
                name="lastName"
                label="State Issued"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
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
      </React.Fragment>
    );
  }
}

export default Principal;
