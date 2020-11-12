import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import {
  addGeneration,
  getAllTemplate,
} from "../../../../actions/giftCardActions";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import axios from "axios";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { TextField, InputAdornment } from "@material-ui/core";

import "./generation.styles.scss";

class AddGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllTemplate();
  }

  render() {
    const { templateList } = this.props.template;

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.generation-add" />}
        />
        <div className="giftcard">
          <div className="id-and-btn">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdAddToPhotos size={23} />
              <h3
                style={{
                  paddingLeft: "13px",
                  fontWeight: "400",
                  fontSize: "21px",
                }}
              >
                New Gift Card
              </h3>
            </div>

            <div>
              <Button
                onClick={() =>
                  this.props.history.push("/app/giftcard/generation")
                }
                className="btn btn-green"
              >
                BACK
              </Button>
            </div>
          </div>

          <div className="information container-fluid">
            <h3 className="title">General Information</h3>
            <Formik
              initialValues={{ name: "", amount: "", giftCardTemplateId: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.amount) {
                  errors.amount = "Required";
                }
                if (!values.giftCardTemplateId) {
                  errors.giftCardTemplateId = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm();

                const path = "/app/giftcard/generation";
                const payload = { ...values, path };

                this.props.addGeneration(payload);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-4">
                      <TextField
                        style={styles.input}
                        type="text"
                        name="name"
                        label="Gift Card Name*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="col-4">
                      <TextField
                        style={styles.input}
                        type="number"
                        name="amount"
                        label="Value*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyIcon
                                style={{
                                  fontSize: "20px",
                                  color: "rgba(0, 0, 0, 0.54)",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.amount && touched.amount && (
                        <div className="input-feedback">{errors.amount}</div>
                      )}
                    </div>
                    <div className="col-4">
                      <label style={{ fontSize: "12px" }}>Template</label>
                      <Select
                        options={templateList
                          ?.filter((e) => e.isDisabled !== 1)
                          ?.map((e) => {
                            return {
                              id: e.giftCardTemplateId,
                              label: (
                                <div>
                                  <img
                                    alt="default img"
                                    src={e.imageUrl}
                                    height="30px"
                                    width="30px"
                                    style={{ marginRight: "10px" }}
                                  />
                                  {e.giftCardTemplateName}
                                </div>
                              ),
                              value: e.giftCardTemplateId,
                            };
                          })}
                        onChange={(selectedOption) => {
                          setFieldValue(
                            "giftCardTemplateId",
                            selectedOption.value
                          );
                        }}
                        placeholder="Select Template"
                        loadingMessage={() => "Fetching Template"}
                        noOptionsMessage={() => "Template appears here!"}
                      />
                      {errors.giftCardTemplateId &&
                        touched.giftCardTemplateId && (
                          <div className="input-feedback">
                            {errors.giftCardTemplateId}
                          </div>
                        )}
                    </div>

                    <div className="id-and-btn" style={{ paddingTop: "20px" }}>
                      <Button className="btn btn-red" type="submit">
                        SAVE
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  template: state.template,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTemplate: () => {
    dispatch(getAllTemplate());
  },
  addGeneration: (payload) => {
    dispatch(addGeneration(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddGeneration);

const styles = {
  input: {
    width: "100%",
    marginTop: "13px",
  },
};
