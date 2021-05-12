import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { CustomTitle } from "../../../util/CustomText";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  CardMedia,
} from "@material-ui/core";
import { config } from "../../../url/url";
import { history } from "../../../store";
import { editMarketPlaceByIdAction } from "../../../actions/marketActions";
import { WARNING_NOTIFICATION } from "../../../constants/notificationConstants";

import LinearProgress from "../../../util/linearProgress";
import CustomSwitch from "./components/Switch";
import defaultImg from "./hpadmin2.png";
import axios from "axios";
import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import QueueIcon from "@material-ui/icons/Queue";
import * as Yup from "yup";
import "./style.scss";

const upFile = config.url.upFile;

class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  uploadImage = (e, setFieldValue) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue("isUpload", true);

      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setFieldValue(`fileURL`, reader.result);
          };

          setFieldValue(`isUpload`, false);
          setFieldValue(`fileId`, res.data.data.fileId);
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

  render() {
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Transaction | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.marketPlace" />}
        />

        <div className="page-heading">
          <div className="edit-market-page-heading" >
            <QueueIcon style={{ color: "black" }} size={22} />
            <CustomTitle
              value={this.props.info?.name}
              styles={{ color: "black", marginLeft: "10px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.marketInfo.info,
});
const mapDispatchToProps = (dispatch) => ({
  editMarketPlaceByIdAction: (value) => {
    dispatch(editMarketPlaceByIdAction(value));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

const MarketPlaceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  link: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter link"),

  fileId: Yup.string().required("Image is required"),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);
