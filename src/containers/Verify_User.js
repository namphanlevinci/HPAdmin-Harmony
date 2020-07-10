import React from "react";
import { Link } from "react-router-dom";
import { Verify } from "../actions/user/actions";
import { connect } from "react-redux";

import IntlMessages from "../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";

class Verify_User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: "",
    };
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keyPressed);
    const messaging = firebase.messaging();

    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        this.setState({ token });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keyPressed);
  }
  keyPressed = (e) => {
    if (e.code === "Enter") {
      this._Login();
    }
  };
  _Login = async (e) => {
    // await e.preventDefault();
    const serial = localStorage.getItem("VERIFY_NUMBER");
    const code = await this.state.verify_code;
    const token = this.state.token;
    const data = { code, serial, token };
    await this.props.Verify(data);
  };

  render() {
    return (
      <div className="app-login-container login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="login-content text-center">
          <div className="login-header">
            <Link
              className="app-logo"
              to="/app/app-module/login-2"
              title="Jambo"
            >
              <img src={require("./logo-blue.png")} alt="jambo" title="jambo" />
            </Link>
          </div>
          <div className="mb-4">
            <p>
              <IntlMessages id="appModule.enterYourVerifyCode" />
            </p>
            <p>Your account will be locked if you don't verify after 5 times</p>
          </div>
          <form>
            <TextField
              type="text"
              id="required"
              label={<IntlMessages id="appModule.verify" />}
              fullWidth
              defaultValue=""
              margin="normal"
              className="mt-0 mb-4"
              onChange={(e) => this.setState({ verify_code: e.target.value })}
            />

            <div className="mb-2">
              <Button
                style={{ background: "#4251af", color: "white" }}
                variant="contained"
                className="text-white"
                onClick={this._Login}
              >
                <IntlMessages id="appModule.login" />
              </Button>
            </div>
          </form>
          <div>
            <Link className="right-arrow" to="/signin">
              <IntlMessages id="appModule.signInDiffAccount" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userLogin: state.userReducer,
  Verify_User: state.Verify_User,
});
const mapDispatchToProps = (dispatch) => ({
  Verify: (payload) => {
    dispatch(Verify(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Verify_User);
