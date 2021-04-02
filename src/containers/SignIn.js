import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../actions/userActions";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IntlMessages from "../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import Logo from "../assets/images/harmonylogo.png";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onSubmit = (e) => {
    const { email, password } = this.state;
    const path = "/verify";
    this.props.userLogin(email, password, path);
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  };

  render() {
    const { email, password } = this.state;
    const { loading } = this.props.user;

    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="HPAdmin">
              <img
                style={{ width: "200px" }}
                src={Logo}
                alt="Harmony"
                title="Harmony"
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1>
                <IntlMessages id="appModule.signIn" />
              </h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.email" />}
                    fullWidth
                    onChange={(e) => this.setState({ email: e.target.value })}
                    defaultValue={email}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    onKeyPress={this.keyPressed}
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    onKeyPress={this.keyPressed}
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={this.onSubmit}
                      variant="contained"
                      style={
                        password === "" || email === ""
                          ? {}
                          : { background: "#0764B0", color: "white" }
                      }
                      disabled={password === "" || email === "" ? true : false}
                    >
                      <IntlMessages id="appModule.signIn" />
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        {loading && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  userLogin: (email, password, path) => {
    dispatch(userLogin(email, password, path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
