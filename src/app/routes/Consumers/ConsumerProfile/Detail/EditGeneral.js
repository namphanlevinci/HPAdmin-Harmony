import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_CONSUMER } from "../../../../../actions/consumer/actions";
import { CustomTitle } from "../../../../../util/CustomText";
import { Button, Grid, TextField } from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import SimpleReactValidator from "simple-react-validator";

class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required!",
      },
    });
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      limitAmount: "",
      ID: "",
      Token: "",
    };
  }

  componentDidMount() {
    const data = this.props.ConsumerProfile;
    this.setState({
      ID: data?.userId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      limitAmount: data?.limitAmount,
    });
  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  submitUpdate = () => {
    if (this.validator.allValid()) {
      this.props.UPDATE_CONSUMER(this.state, this.state.ID);
    } else {
      this.validator.showMessages();

      this.forceUpdate();
    }
  };

  _goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    const renderGeneral = (
      <div className="react-transition swipe-right consumer__general">
        <Grid container spacing={4} className="container-fluid">
          <Grid item xs={12}>
            <CustomTitle value="General Information" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              label="First Name*"
              name="firstName"
              value={this.state.firstName}
              onChange={this._handleChange}
              fullWidth={true}
            />

            {
              <p className="required">
                {this.validator.message(
                  "firstName",
                  this.state.firstName,
                  "required"
                )}
              </p>
            }
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Last Name*"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this._handleChange}
              fullWidth={true}
            />

            {
              <p className="required">
                {this.validator.message(
                  "lastName",
                  this.state.lastName,
                  "required"
                )}
              </p>
            }
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Contact Email*"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this._handleChange}
              fullWidth={true}
            />
            {
              <p className="required">
                {this.validator.message(
                  "email",
                  this.state.email,
                  "required|email"
                )}
              </p>
            }
          </Grid>
          <Grid item xs={4}>
            <MaterialUiPhoneNumber
              onlyCountries={["us", "vn"]}
              placeholder="Phone Number"
              label="Business Phone*"
              name="phone"
              value={this.state.phone}
              onChange={(phone) => this.setState({ phone })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button className="btn btn-green" onClick={this.submitUpdate}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </div>
    );

    return <div className="content">{renderGeneral}</div>;
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.ConsumerReducer.Consumer,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_CONSUMER: (payload, id) => {
    dispatch(UPDATE_CONSUMER(payload, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);
