import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../actions/userActions";

import IntlMessages from "../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

class VerifyUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: "",
      loading: false,
    };
  }

  async componentDidMount() {
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

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  login = async (e) => {
    const { code, token } = this.state;
    await this.props.verifyUser(code, token);
  };

  render() {
    const { loading } = this.props.verify;

    console.log(loading);
    return (
      <div className="app-login-container login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="login-content text-center">
          <div className="login-header">
            <Link
              className="app-logo"
              to="/app/app-module/login-2"
              title="Harmony Payment"
            >
              <img
                src={require("./logo-blue.png")}
                alt="harmony"
                title="harmony"
              />
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
              onChange={(e) => this.setState({ code: e.target.value })}
              onKeyPress={this.keyPressed}
            />
            {/* {loading ? (
              <CircularProgress />
            ) : ( */}
            <div className="mb-2">
              <Button
                style={{ background: "#4251af", color: "white" }}
                variant="contained"
                className="text-white"
                onClick={this.login}
              >
                <IntlMessages id="appModule.login" />
              </Button>
            </div>
            {/* )} */}
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
  verify: state.verifyUser,
});
const mapDispatchToProps = (dispatch) => ({
  verifyUser: (code, token) => {
    dispatch(verifyUser(code, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
