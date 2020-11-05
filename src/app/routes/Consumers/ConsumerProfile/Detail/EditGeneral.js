import React, { Component } from "react";
import { connect } from "react-redux";
import { updateConsumerByID } from "../../../../../actions/consumerActions";
import { Button, Grid, TextField } from "@material-ui/core";
import { CustomTitle } from "../../../../../util/CustomText";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";

import CustomProgress from "../../../../../util/CustomProgress";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import * as Yup from "yup";

class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const data = this.props.ConsumerProfile;
    this.setState(
      {
        ID: data?.userId,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phone: data?.phone,
        limitAmount: data?.limitAmount,
      },
      () => this.setState({ loading: true })
    );
  }

  goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    const { loading: loadingUpdate } = this.props.updateConsumer;

    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <div className="content">
          {loadingUpdate && <CustomProgress />}
          {this.state.loading && (
            <div className="consumer__general">
              <Formik
                initialValues={this.state}
                validationSchema={consumerSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const payload = {
                    ...values,
                    path: "/app/consumers/profile/general",
                  };
                  this.props.updateConsumerByID(payload);
                }}
              >
                {({ values, isSubmitting, handleChange, errors, touched }) => (
                  <Form>
                    <Grid container spacing={4} className="container-fluid">
                      <Grid item xs={12}>
                        <CustomTitle value="General Information" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          type="text"
                          label="First Name*"
                          name="firstName"
                          value={values?.firstName}
                          onChange={handleChange}
                          fullWidth={true}
                          helperText={touched.firstName ? errors.firstName : ""}
                          error={touched.firstName && Boolean(errors.firstName)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Last Name*"
                          type="text"
                          name="lastName"
                          value={values?.lastName}
                          onChange={handleChange}
                          fullWidth={true}
                          helperText={touched.lastName ? errors.lastName : ""}
                          error={touched.lastName && Boolean(errors.lastName)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Contact Email*"
                          type="email"
                          name="email"
                          value={values?.email}
                          onChange={handleChange}
                          fullWidth={true}
                          helperText={touched.email ? errors.email : ""}
                          error={touched.email && Boolean(errors.email)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MaterialUiPhoneNumber
                          onlyCountries={["us", "vn"]}
                          placeholder="Phone Number"
                          label="Business Phone*"
                          name="phone"
                          value={values?.phone}
                          onChange={handleChange}
                          helperText={touched.phone ? errors.phone : ""}
                          error={touched.phone && Boolean(errors.phone)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button className="btn btn-green" type="submit">
                          SAVE
                        </Button>
                        <Button className="btn btn-red" onClick={this.goBack}>
                          CANCEL
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.consumerById.data,
  userLogin: state.userReducer.User,
  updateConsumer: state.updateConsumerById,
});

const mapDispatchToProps = (dispatch) => ({
  updateConsumerByID: (payload) => {
    dispatch(updateConsumerByID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);

const consumerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});
