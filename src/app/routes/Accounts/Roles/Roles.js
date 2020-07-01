import React, { Component } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

import { AiOutlineUserAdd } from "react-icons/ai";

import ReactTable from "react-table";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import data from "./data.json";

import "./Roles.scss";
import "react-table/react-table.css";
import "../../Merchants/MerchantsList/merchantsList.css";

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hubConnection: null,
    };
  }

  render() {
    const department = [
      {
        Header: "Title",
        id: "id",
        accessor: "title",
      },
      {
        Header: "Members",
        id: "image",
        accessor: "image",
        accessor: (row) => <img style={styles.img} src={row.image} />,
      },
      {
        // id: "email",
        Header: "No. of Members",
        accessor: "number",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        id: "Action",
        Header: "Action",
        accessor: (row) => (
          <div>
            <span>
              <GoTrashcan size={20} />
            </span>
            <span style={{ margin: "0px 15px" }}>
              <FiEdit size={20} />
            </span>
            <span>
              <AiOutlineUserAdd size={20} />
            </span>
          </div>
        ),
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.roles" />}
        />
        <div className="page-heading role">
          <div className="role-department">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0px",
              }}
            >
              <h3>Department</h3>
              <Button className="btn btn-green">NEW DEPARTMENT</Button>
            </div>

            <ReactTable columns={department} data={data} minRows={0} />
          </div>
          <div className="role-permissions">
            <h3>Permissions</h3>

            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "44%" }}>Roles</th>
                  <th style={{ width: "14%" }}>Manager</th>
                  <th style={{ width: "14%" }}>Administrator</th>
                  <th style={{ width: "14%" }}>Staff level 1</th>
                  <th style={{ width: "14%" }}>Staff level 2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="module">
                  <th>Module 1</th>
                </tr>
                <tr>
                  <td>Many desktop publishing packages</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>
                    a Latin professor at Hampden-Sydney College in Virginia
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>There are many variations of passages of Lorem</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Lorem Ipsum is therefore always free from repetition.</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>It uses a dictionary of over 200 Latin words</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr className="module">
                  <th>Module 2</th>
                </tr>
                <tr>
                  <td>It uses a dictionary of over 200 Latin words</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Many desktop publishing packages</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Contrary to popular belief, Lorem Ipsum is not</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>It has survived not only five centuries</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Richard McClintock, a Latin professor at Hampden-Sydney
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>
                    The standard chunk of Lorem Ipsum used since the 1500s
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr className="module">
                  <th>Module 3</th>
                </tr>
                <tr>
                  <td>Donec efficitur odio vel velit aliquet dictum.</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Vestibulum congue metus sed lobortis sodales.</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Donec sit amet turpis eu arcu luctus ultricies</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>Ut ut massa ac ex rutrum tempus.</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Maecenas ac nulla sed eros fringilla bibendum vitae eu
                    neque.
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
                <tr>
                  <td>In porttitor velit a varius aliquet.</td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={true} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                  <td>
                    <Checkbox checked={false} style={styles.checkbox} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={styles.btn}>
              <Button className="btn btn-green">SAVE</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Roles;

const styles = {
  checkbox: {
    color: "#4251af",
  },
  btn: {
    margin: "40px 0px",
  },
  img: {
    borderRadius: "50%",
    width: "20%",
  },
};
