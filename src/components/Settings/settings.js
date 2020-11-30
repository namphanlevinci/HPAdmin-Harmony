import React, { Component } from "react";
import "./Setting.css";

class setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container Setting">
        <div className="row">
          <div className="col-md-5">
            <form class="">
              <h1>CHANGE MAIL SERVER</h1>
              <ul>
                <li>
                  <label for="HOST">HOST</label>
                  <input
                    type="text"
                    name="HOST"
                    maxlength="100"
                    value="127.0.0.1"
                  />
                </li>
                <li>
                  <label for="USERNAME">USERNAME</label>
                  <input
                    type="text"
                    name="USERNAME"
                    maxlength="100"
                    value="Tu123"
                  />
                </li>
                <li>
                  <label for="PASSWORD">PASSWORD</label>
                  <input
                    type="password"
                    name="PASSWORD"
                    maxlength="100"
                    value="12312312312312"
                  />
                </li>
                <li>
                  <label for="EMAIL">ADMIN EMAIL</label>
                  <input
                    type="email"
                    name="EMAIL"
                    maxlength="100"
                    value="tu.tran@levincigroup21.com"
                  />
                </li>
                <li>
                  <label for="PORT">PORT</label>
                  <input type="text" name="PORT" maxlength="100" value="578" />
                </li>
                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    type="submit"
                    value="UPDATE"
                  />
                </li>
              </ul>
            </form>
          </div>
          <div className="col-md-5">
            <form className="">
              <h1>CHANGE TWILIO ACCOUNT</h1>
              <ul>
                <li>
                  <label for="PHONE">PHONE</label>
                  <input
                    type="text"
                    name="PHONE"
                    maxlength="100"
                    value="+112415784"
                  />
                </li>
                <li>
                  <label for="ACCOUNTID">ACCOUNT ID</label>
                  <input
                    type="text"
                    name="ACCOUNTID"
                    maxlength="100"
                    value="123123123123"
                  />
                </li>
                <li>
                  <label for="TOKEN">TOKEN</label>
                  <input
                    type="text"
                    name="TOKEN"
                    maxlength="100"
                    value="12312312312312"
                  />
                </li>
                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    type="submit"
                    value="UPDATE"
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default setting;
