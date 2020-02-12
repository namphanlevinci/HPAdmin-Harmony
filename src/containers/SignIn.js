import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkLogin_User } from "../actions/user/actions";
import { store } from "react-notifications-component";

import TextField from "@material-ui/core/TextField";
// import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import IntlMessages from "../util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      isRight: false,
      error: false
    };
  }

  onSubmit = async e => {
    this.setState({ loading: true });
    // await e.preventDefault();
    const { email, password } = await this.state;
    await this.props.checkLogin_User({ email, password });
  };
  componentDidMount() {
    document.addEventListener("keypress", this.keyPressed);
  }
  // componentWillUnmount() {
  //   document.removeEventListener("keypress", this.keyPressed);
  // }

  keyPressed = e => {
    if (e.code === "Enter") {
      // console.log("1");
      this.onSubmit();
    }
  };
  componentWillReceiveProps(nextProps) {
    const Message = localStorage.getItem("Message");
    this.setState({ loading: false, isRight: true });
    if (Message !== null) {
      store.addNotification({
        title: "Error!",
        message: `${Message}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        },
        width: 250
      });
      setTimeout(() => localStorage.removeItem("Message"), 1000);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="HPAdmin">
              <img
                style={{ width: "200px" }}
                src={require("../assets/images/logo-white.png")}
                alt="jambo"
                title="jambo"
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1>
                <IntlMessages id="appModule.email" />
              </h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.email" />}
                    fullWidth
                    onChange={event =>
                      this.setState({ email: event.target.value })
                    }
                    defaultValue={email}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={event =>
                      this.setState({ password: event.target.value })
                    }
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={this.onSubmit}
                      variant="contained"
                      style={{ background: "#0764b0", color: "white" }}
                    >
                      <IntlMessages id="appModule.signIn" />
                    </Button>

                    {/* <Link to="/signup">
                      <IntlMessages id="signIn.signUp"/>
                    </Link> */}
                    {}
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {this.state.loading === true ? (
          <div className="loader-view">
            <CircularProgress />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  checkLogin_User: user_info => {
    dispatch(checkLogin_User(user_info));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
