import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_PRINCIPAL } from "../../../../../../actions/merchants/actions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class PrincipalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  viewPrincipalInfo = (data) => {
    this.props.UPDATE_PRINCIPAL(data);
    this.props.history.push("/app/merchants/profile/principal/info");
  };

  render() {
    const principals = this.props.MerchantProfile?.principals;
    return (
      <List component="div">
        {principals?.map((data, index) => (
          <React.Fragment key={data.principalId}>
            <ListItem button>
              <ListItemText
                primary={`Principal ${index + 1}: ${data.firstName} ${
                  data.lastName
                }`}
                onClick={() => this.viewPrincipalInfo(data)}
              />
            </ListItem>
            <Divider style={{ width: "100%", border: "none" }} />
          </React.Fragment>
        ))}
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_PRINCIPAL: (payload) => {
      dispatch(UPDATE_PRINCIPAL(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalList);
