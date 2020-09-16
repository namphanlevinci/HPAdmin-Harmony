import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAll_Questions,
  UPDATE_QUESTIONS,
} from "../../../../actions/business/actions";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./Questions.css";
import "../../Merchants/MerchantProfile/MerchantProfile.css";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      question: "",
      qID: "",
    };
  }
  componentDidMount() {
    this.props.getAll_Questions();
  }
  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  _toggleEdit = (e) => {
    this.setState({ edit: true, question: e.value, qID: e.questionId });
  };
  _turnOffEdit = () => {
    this.setState({ edit: false, qID: "", question: "" });
  };
  _update = () => {
    const ID = this.state.qID;
    const value = this.state.question;
    const data = { ID, value };
    this.props.UPDATE_QUESTIONS(data);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.uQuestions !== this.props.uQuestions) {
      if (this.props.uQuestions.message === "Success") {
        this.props.getAll_Questions();
        store.addNotification({
          title: "SUCCESS!",
          message: `${this.props.uQuestions.message}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        this.setState({ edit: false });
      } else {
        store.addNotification({
          title: "ERROR!",
          message: `${this.props.uQuestions.message}`,
          type: "error",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    }
  }
  render() {
    const q = this.props.Questions;
    const renderQuestions = q.map((e) => {
      return (
        <ExpansionPanel key={e.questionId}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${e.questionId}a-content`}
            id={`panel${e.questionId}a-header`}
          >
            <Typography style={{ fontWeight: 400, fontSize: "19px" }}>
              Question {e.questionId}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography
              style={{ width: "100%", fontWeight: 300, fontSize: "16px" }}
            >
              {e.value}
              <button
                style={{ float: "right" }}
                className="btn btn-green"
                onClick={() => this._toggleEdit(e)}
              >
                EDIT
              </button>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return (
      <div className="container-fluid react-transition swipe-down">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Questions" />}
        />
        <div
          className="text-center MerList Questions"
          style={{ padding: "10px" }}
        >
          {renderQuestions}
        </div>

        {/* //yeet */}
        <Dialog
          fullWidth
          open={this.state.edit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">EDIT QUESTION</DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.question}
              onChange={this._handleChange}
              autoFocus
              margin="dense"
              id="question"
              name="question"
              label="New Question"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this._turnOffEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={this._update} color="primary">
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  Questions: state.getQuestions,
  uQuestions: state.uQuestions,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Questions: () => {
    dispatch(getAll_Questions());
  },
  UPDATE_QUESTIONS: (payload) => {
    dispatch(UPDATE_QUESTIONS(payload));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Questions)
);
