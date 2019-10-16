import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "./User.css";
// import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { ADD_ADMIN } from "../../../../actions/user/actions";

const stateId = [
  { value: "1", label: "New York" },
  { value: "2", label: "Florida" },
  { value: "4", label: "California" },
  { value: "5", label: "Texas" },
  { value: "7", label: "Alaska" },
  { value: "8", label: "Alabama" },
  { value: "9", label: "Arkansas" },
  { value: "10", label: "Arizona" },
  { value: "11", label: "Colorado" },
  { value: "12", label: "Connecticut" },
  { value: "13", label: "Washington, D.C." },
  { value: "14", label: "Delaware" },
  { value: "15", label: "Georgia" },
  { value: "16", label: "Hawaii" },
  { value: "17", label: "Iowa" },
  { value: "18", label: "Idaho" },
  { value: "19", label: "Illinois" },
  { value: "20", label: "Indiana" },
  { value: "21", label: "Kansas" },
  { value: "22", label: "Kentucky" },
  { value: "23", label: "Louisiana" },
  { value: "24", label: "Massachusetts" },
  { value: "25", label: "Maryland" },
  { value: "26", label: "Maine" },
  { value: "27", label: "Michigan" },
  { value: "28", label: "Minnesota" },
  { value: "29", label: "Missouri" },
  { value: "30", label: "Mississippi" },
  { value: "31", label: "Montana" },
  { value: "32", label: "North Carolina" },
  { value: "33", label: "North Dakota" },
  { value: "34", label: "Nebraska" },
  { value: "35", label: "New Hampshire" },
  { value: "36", label: "New Jersey" },
  { value: "37", label: "New Mexico" },
  { value: "38", label: "Nevada" },
  { value: "39", label: "Ohio" },
  { value: "40", label: "Oklahoma" },
  { value: "41", label: "Oregon" },
  { value: "42", label: "Pennsylvania" },
  { value: "43", label: "Rhode Island" },
  { value: "44", label: "South Carolina" },
  { value: "45", label: "South Dakota" },
  { value: "46", label: "Tennessee" },
  { value: "47", label: "Utah" },
  { value: "48", label: "Virginia" },
  { value: "49", label: "Vermont" },
  { value: "50", label: "Washington" },
  { value: "51", label: "Wisconsin" },
  { value: "52", label: "West Virginia" },
  { value: "53", label: "Wyoming" }
];
const roles = [
  { value: "1", label: "Admin" },
  { value: "2", label: "Manager" }
];
class addAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      stateID: undefined,
      BirthDate: undefined,
      roles: undefined,
      phone: "",
      fileId: ""
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleBirthDate = date => {
    this.setState({ BirthDate: date });
  };
  _addAdmin = e => {
    if (this.state.roles && this.state.stateID) {
      e.preventDefault();
      const WaRoleId = this.state.roles.value;
      const stateId = this.state.stateID.value;
      const {
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        zip,
        BirthDate,
        phone,
        fileId
      } = this.state;
      const fullname = `${firstname} ${lastname}`;
      const Data = {
        stateId,
        WaRoleId,
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        zip,
        BirthDate,
        fullname,
        phone,
        fileId
      };
      this.props.addAdmin(Data);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.AddStatus !== this.props.AddStatus) {
      const Message = localStorage.getItem("ADD_STATUS");
      if (Message !== "Success") {
        NotificationManager.error(Message);
        setTimeout(() => localStorage.removeItem("ADD_STATUS"), 1000);
      } else {
        NotificationManager.success(Message);
        setTimeout(() => localStorage.removeItem("ADD_STATUS"), 1000);
        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          address: "",
          city: "",
          zip: "",
          stateID: undefined,
          BirthDate: undefined,
          roles: undefined,
          phone: ""
        });
      }
    }
  }
  render() {
    return (
      <div>
        <NotificationContainer />
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        <div className="login-content text-center">
          <div className="mb-4">
            <h2 style={{ color: "#0764b0", fontWeight: 500 }}>
              ADD NEW ADMIN USER
            </h2>
          </div>

          <div className="login-form">
            <form>
              <div>
                <TextField
                  required
                  type="text"
                  id="signUpName"
                  label="First name"
                  value={this.state.firstname}
                  onChange={event =>
                    this.setState({ firstname: event.target.value })
                  }
                  fullWidth
                  // defaultValue={name}
                  margin="normal"
                  className="mt-0 mb-2"
                  style={{ width: 170 }}
                />
                <TextField
                  required
                  type="signUpEmail"
                  value={this.state.lastname}
                  onChange={event =>
                    this.setState({ lastname: event.target.value })
                  }
                  id="required"
                  label="Last name"
                  fullWidth
                  // defaultValue={email}
                  margin="normal"
                  className="mt-0 mb-2"
                  style={{ width: 170, marginLeft: "10px" }}
                />
              </div>
              <TextField
                type="text"
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                // id="required1"
                label="Email"
                fullWidth
                // defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
                required
              />
              <TextField
                type="number"
                value={this.state.phone}
                onChange={event => this.setState({ phone: event.target.value })}
                // id="required1"
                label="Phone"
                fullWidth
                // defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
                required
              />
              <TextField
                required
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                // id="required"
                label={<IntlMessages id="appModule.password" />}
                fullWidth
                // defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
              />
              <TextField
                required
                type="text"
                value={this.state.address}
                onChange={event =>
                  this.setState({ address: event.target.value })
                }
                // id="required1"
                label="Address"
                fullWidth
                // defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
              />
              <div>
                <TextField
                  required
                  type="text"
                  // id="signUpName"
                  label="City"
                  value={this.state.city}
                  onChange={event =>
                    this.setState({ city: event.target.value })
                  }
                  fullWidth
                  // defaultValue={name}
                  margin="normal"
                  className="mt-0 mb-2"
                  style={{ width: 170 }}
                />
                <TextField
                  required
                  type="signUpEmail"
                  value={this.state.zip}
                  onChange={event => this.setState({ zip: event.target.value })}
                  // id="required"
                  label="Zip code"
                  fullWidth
                  // defaultValue={email}
                  margin="normal"
                  className="mt-0 mb-2"
                  style={{ width: 170, marginLeft: "10px" }}
                />
              </div>
              <label>State</label>
              <Select
                required
                placeholder="State"
                options={stateId}
                onChange={value => this.setState({ stateID: value })}
                value={this.state.stateID}
              />
              <br />
              <label>Role</label>
              <Select
                required
                placeholder="Role"
                options={roles}
                onChange={value => this.setState({ roles: value })}
                value={this.state.roles}
              />
              {/* //! BIRTHDATE */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    style={{ width: 150 }}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Birthdate"
                    value={this.state.BirthDate}
                    onChange={this.handleBirthDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <br />
              <div className="mb-3">
                <Button
                  type="submit"
                  onClick={this._addAdmin}
                  color="primary"
                  variant="contained"
                  className="text-white"
                >
                  ADD
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UserProfile: state.ViewProfile_User,
  AddStatus: state.addAdminUser
});
const mapDispatchToProps = dispatch => ({
  addAdmin: payload => {
    dispatch(ADD_ADMIN(payload));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(addAdmin)
);
