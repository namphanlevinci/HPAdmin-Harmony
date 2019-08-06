import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import { Verify } from "../actions/user/actions";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
class Verify_User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_code: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Verify_User !== this.props.Verify_User) {
      const Message = localStorage.getItem("VERIFY_ERROR");
      if (Message !== null) {
        NotificationManager.error(Message);
        setTimeout(() => localStorage.removeItem("VERIFY_ERROR"), 1000);
      }
    }
  }
  _Login = async e => {
    await e.preventDefault();
    const SERIAL = this.props.InfoUser_Login.User;
    const code = await this.state.verify_code;
    const data = { code, SERIAL };
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
            <p>Your account will be locked if u don't verify after 5 times!</p>
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
              onChange={e => this.setState({ verify_code: e.target.value })}
            />

            <div className="mb-2">
              <Button
                color="primary"
                variant="contained"
                className="text-white"
                onClick={this._Login}
              >
                <IntlMessages id="appModule.login" />
              </Button>
            </div>
          </form>
          <div>
            <NotificationContainer />
            <Link className="right-arrow" to="/signin">
              <IntlMessages id="appModule.signInDiffAccount" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  Verify_User: state.Verify_User
});
const mapDispatchToProps = dispatch => ({
  Verify: payload => {
    dispatch(Verify(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify_User);
