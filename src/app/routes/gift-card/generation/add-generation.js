import React, { Component } from "react";
import { connect } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import { Formik } from "formik";
import { GET_TEMPLATE } from "../../../../actions/gift-card/actions";
import { store } from "react-notifications-component";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import URL from "../../../../url/url";
import axios from "axios";

import "./generation.styles.scss";

class AddGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.GET_TEMPLATE();
  }

  render() {
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
              <h3>New Gift Card</h3>
            </div>

            <div>
              <Button
                onClick={() =>
                  this.props.history.push("/app/giftcard/generation")
                }
              >
                BACK
              </Button>
            </div>
          </div>
          <div className="information container-fluid">
            <h3 className="title">General Information</h3>
            <Formik
              initialValues={{ name: "", amount: "", giftCardTemplateId: "" }}
              validate={values => {
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
                const { giftCardTemplateId, name, amount } = values;
                resetForm();
                axios
                  .post(
                    URL + "/giftcardgeneral",
                    { giftCardTemplateId, name, amount },
                    {
                      headers: {
                        Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
                      }
                    }
                  )
                  .then(res => {
                    if (res.data.message === "Success") {
                      store.addNotification({
                        title: "Success!",
                        message: `${res.data.message}`,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 2500,
                          onScreen: true
                        },
                        width: 250
                      });
                    } else {
                      store.addNotification({
                        title: "ERROR!",
                        message: `${res.data.message}`,
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 2500,
                          onScreen: true
                        },
                        width: 250
                      });
                    }
                  })
                  .catch(error => console.log(error));
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
                resetForm
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-4">
                      <h4>Gift Card Name</h4>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="col-4">
                      <h4>Value</h4>
                      <input
                        type="number"
                        name="amount"
                        placeholder="$"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                      />
                      {errors.amount && touched.amount && (
                        <div className="input-feedback">{errors.amount}</div>
                      )}
                    </div>
                    <div className="col-4">
                      <h4>Template</h4>
                      <Select
                        options={this.props.Template.filter(
                          e => e.categoryType !== "Product"
                        ).map(e => {
                          return {
                            id: e.giftCardTemplateId,
                            label: (
                              <div>
                                <img
                                  src={e.imageUrl}
                                  height="30px"
                                  width="30px"
                                  style={{ marginRight: "10px" }}
                                />
                                {e.giftCardTemplateName}
                              </div>
                            ),
                            value: e.giftCardTemplateId
                          };
                        })}
                        onChange={selectedOption => {
                          setFieldValue(
                            "giftCardTemplateId",
                            selectedOption.value
                          );
                        }}
                        placeholder="- Select Template -"
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

                    {/* <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button> */}
                    <div className="id-and-btn" style={{ paddingTop: "20px" }}>
                      <Button className="btn-red" type="submit">
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

const mapStateToProps = state => ({
  Template: state.GiftCardData.template,
  InfoUser_Login: state.User
});

const mapDispatchToProps = dispatch => ({
  GET_TEMPLATE: () => {
    dispatch(GET_TEMPLATE());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddGeneration);
