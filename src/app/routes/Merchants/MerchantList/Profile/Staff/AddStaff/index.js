import React, { Component } from "react";
import { connect } from "react-redux";
import { WARNING_NOTIFICATION } from "@/constants/notificationConstants";
import { Formik, Form } from "formik";
import { config } from "@/url/url";
import { AddMerchantStaffById } from "@/actions/merchantActions";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import General from "./Form/General";
import WorkTime from "./Form/WorkTime";
import Salary from "./Form/Salary";
import License from "./Form/License";
import validationSchema from "./FormModel/validationSchema";
import formInitialValues from "./FormModel/formInitialValues";
import FadeLoader from "react-spinners/PulseLoader";

import "../Staff.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      imagePreviewUrl: "",
      fileId: 0,
      showPin: false,
      showConfirmPin: false,
      progressLoading: false,
      serviceList: [],
      categoryList: [],
      categories: [],
      isSelectAllCategories: true,
      isLoading: false,
    };
    this.refForm = React.createRef();
  }

  componentDidMount() {
    const { MerchantProfile } = this.props;
    const { merchantId } = MerchantProfile;
    this.getServiceList();
    this.getCategoryList();
    const businessHour = MerchantProfile?.businessHour || null;
    if (businessHour) {
      this.refForm.current.setFieldValue('workingTime', businessHour);
    }
  }

  getServiceList = async () => {
    const { categoryList, serviceList } = this.state;
    const { user, MerchantProfile } = this.props;
    const { merchantId } = MerchantProfile;
    const url = `${URL}/service/getbymerchant/${merchantId}`;
    const { data } = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (data && parseInt(data.codeNumber) === 200) {

      let categories = categoryList.filter(obj => obj.categoryType.toString().toLowerCase() === "service").map((cate) => ({
        selected: true,
        categoryId: cate.categoryId,
        name: cate.name,
        staffServices:
          data.data
            .filter(sv => sv.categoryId === cate.categoryId)
            .map((sv) => ({
              selected: true,
              name: sv.name,
              serviceId: sv.serviceId,
              categoryId: sv.categoryId
            }))
      }));

      this.setState({
        serviceList: data.data,
        categories,
        isLoading: false
      });
    }

  }

  getCategoryList = async () => {
    this.setState({ isLoading: true });
    const { user, MerchantProfile } = this.props;
    const { merchantId } = MerchantProfile;
    const url = `${URL}/category/getbymerchant/${merchantId}`;
    const { data } = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (data && parseInt(data.codeNumber) === 200) {
      this.setState({ categoryList: data.data })
      this.getServiceList();
    }
  }

  getSteps = () => {
    return ["General Information", "Working time", "Salary", "License"];
  };

  handleShowPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };

  handleConfirmPin = () => {
    this.setState({ showConfirmPin: !this.state.showConfirmPin });
  };

  selectAllCategories = () => {
    let { categories, isSelectAllCategories } = this.state;
    let status = !isSelectAllCategories;
    categories = categories.map((cate) => ({
      ...cate,
      selected: status,
      staffServices:
        cate.staffServices
          .filter(sv => sv.categoryId === cate.categoryId)
          .map((sv) => ({
            ...sv,
            selected: status,
          }))
    }));

    this.setState({
      isSelectAllCategories: status,
      categories,
    });
  }

  selectCategories = (category) => {
    let { categories } = this.state;
    const { selected, categoryId } = category;
    categories = categories.map((cate) => ({
      ...cate,
      selected: cate.categoryId === categoryId ? !selected : cate.selected,
      staffServices:
        cate.staffServices
          .filter(sv => sv.categoryId === cate.categoryId)
          .map((sv) => ({
            ...sv,
            selected: sv.categoryId === categoryId ? !selected : sv.selected
          }))
    }));
    if (selected === true) {
      this.setState({ isSelectAllCategories: false })
    }
    this.setState({ categories });
  }

  selectServiceOfCategories = (service) => {
    let { categories } = this.state;
    const { selected, categoryId, serviceId } = service;

    categories = categories.map(cate => {
      let { staffServices } = cate;
      return ({
        ...cate,
        selected: this.checkStatuCategory(staffServices, selected, categoryId, cate),
        staffServices:
          cate.staffServices
            .filter(sv => sv.categoryId === cate.categoryId)
            .map((sv) => ({
              ...sv,
              selected: sv.serviceId === serviceId ? !selected : sv.selected
            }))
      })
    });
    if (selected === true) {
      this.setState({ isSelectAllCategories: false })
    }
    this.setState({ categories });
  }

  checkStatuCategory = (staffServices = [], selected, categoryId, cate) => {
    if (cate.categoryId === categoryId) {
      let status = !selected;
      if (status) {
        return true
      } else {
        const arrTrue = staffServices.filter(sv => sv.selected === true);
        if (arrTrue.length === 1) {
          return false
        }
      }
    }
    return cate.selected;
  }

  getStepContent = (stepIndex, values, handleChange, setFieldValue) => {
    const { MerchantProfile, merchantState } = this.props;
    const { serviceList, categoryList, categories, isSelectAllCategories } = this.state;
    switch (stepIndex) {
      case 0:
        return (
          <General
            uploadImage={this.uploadImage}
            imagePreviewUrl={this.state.imagePreviewUrl}
            showPin={this.state.showPin}
            handleShowPin={this.handleShowPin}
            showConfirmPin={this.state.showConfirmPin}
            handleConfirmPin={this.handleConfirmPin}
            initValue={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            merchantState={merchantState}
            serviceList={serviceList}
            categoryList={categoryList}
            categories={categories}
            selectAllCategories={this.selectAllCategories}
            isSelectAllCategories={isSelectAllCategories}
            selectCategories={this.selectCategories}
            selectServiceOfCategories={this.selectServiceOfCategories}
          />
        );
      case 1:
        return <WorkTime initValue={values} setFieldValue={setFieldValue} MerchantProfile={MerchantProfile} />;
      case 2:
        return <Salary initValue={values} setFieldValue={setFieldValue} />;
      case 3:
        return (
          <License
            initValue={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
        );

      default:
        return "Please try again";
    }
  };

  uploadImage = (event, setFieldValue) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue(`isUpload`, true);
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            setFieldValue("fileId", res.data.data.fileId);
            setFieldValue("staffAvatar", reader.result);
            setFieldValue(`isUpload`, false);
          };
          reader.readAsDataURL(file);
        })
        .catch((err) => {
          console.log(err);
          setFieldValue(`isUpload`, false);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  submitForm = async (values, actions) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const { activeStep, categories } = this.state;
    const path = "/app/merchants/profile/staff";
    const payload = await {
      ...values,
      merchantId,
      path,
      categories,
      salary: {
        commission: {
          isCheck: values.salary.commission.isCheck,
          value: this.checkComission(values.salary.commission.value)
        },
        perHour: values.salary.perHour
      }
    };
    this.props.addStaff(payload);
    actions.setSubmitting(false);
    this.setState({ activeStep: activeStep + 1 });
  };

  checkComission = (comission = []) => {
    let arrTemp = JSON.parse(JSON.stringify(comission));
    arrTemp = arrTemp.filter(obj => obj);
    return arrTemp
  }


  handleSubmit = (values, actions) => {
    const { activeStep } = this.state;
    const steps = this.getSteps();
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) {
      this.submitForm(values, actions);
    } else {
      this.setState({
        activeStep: activeStep + 1,
      });
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  toggleVisibility = (name, value) => {
    this.setState({ [name]: value });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1, });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  checkPincode = (pincode) => {
    const { staffList } = this.props;
    for (let i = 0; i < staffList.length; i++) {
      if (pincode === staffList[i].pin) {
        return false;
      }
    }
    return true
  }

  render() {
    const steps = this.getSteps();
    const { activeStep, isLoading } = this.state;
    const currentValidationSchema = validationSchema(this.checkPincode)[activeStep];
    const { staffList } = this.props;

    return (
      <div className="container-fluid react-transition swipe-right add-staff">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#0764B0" }}>New Staff</h1>
        </div>
        <div className="MerList" style={{ padding: "30px" }}>
          <div className="w-100">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="horizontal-stepper-linear"
            >
              {steps.map((label, index) => {
                return (
                  <Step
                    key={label}
                    className={`horizontal-stepper ${index === activeStep ? "active" : ""}`}
                  >
                    <StepLabel className="stepperlabel">{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {this.state.activeStep === steps.length ? (
                <div style={{ textAlign: "center", padding: "20px " }}>
                  <CircularProgress size={50} />
                </div>
              ) : (
                  <div>
                    <Formik
                      initialValues={formInitialValues}
                      validationSchema={currentValidationSchema}
                      onSubmit={this.handleSubmit}
                      innerRef={this.refForm}
                    >
                      {({ values, isSubmitting, handleChange, setFieldValue, }) => (
                        <Form noValidate>
                          {this.getStepContent(activeStep, values, handleChange, setFieldValue)}
                          <div className="container-button-addStadd">
                            <span>
                              <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className="btn btn-red"
                              >
                                Back
                            </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="btn btn-green"
                              >
                                {
                                  activeStep === steps.length - 1
                                    ? "Finish"
                                    : "Next"
                                }
                              </Button>
                            </span>
                            <span>
                              <Button
                                onClick={() => this.props.history.push("/app/merchants/profile/staff")}
                                className="btn btn-red"
                              >
                                Cancel
                            </Button>
                            </span>
                          </div>{" "}
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
            </div>
          </div>
        </div>

        {
          isLoading && <div className="container-loading-settlement">
            <div className="loader-settlement">
              <FadeLoader
                color={'white'}
                loading={isLoading}
                size={10}
                css={{
                  display: 'block',
                }} />
            </div>
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  merchantState: state.merchantState.data,
  user: state.verifyUser.user,
  staffList: state.staff.data,
});

const mapDispatchToProps = (dispatch) => ({
  addStaff: (payload) => {
    dispatch(AddMerchantStaffById(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
