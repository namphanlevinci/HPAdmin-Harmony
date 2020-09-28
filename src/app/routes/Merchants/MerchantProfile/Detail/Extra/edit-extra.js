import React from "react";
import { Formik } from "formik";
import { config } from "../../../../../../url/url";
import { withStyles } from "@material-ui/core/styles";

import {
  TextField,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  DialogTitle,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import Button from "@material-ui/core/Button";
import defaultImg from "./hpadmin2.png";
import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import "./extra.styles.scss";

const URL = config.url.URL;

const EditExtra = ({
  SuccessNotify,
  FailureNotify,
  handleImageChange,
  getExtra,
  merchantId,
  token,
  handleClose,
  edit,
  data: {
    description,
    discount,
    extraId,
    duration,
    price,
    isDisabled,
    name,
    quantity,
    tax,
    imageUrl,
    fileId,
    imagePreviewUrl,
    supplyFee,
  },
}) => {
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} style={styles.img} alt="void" />;
  } else {
    $imagePreview = (
      <img
        style={styles.img}
        src={imageUrl === "" ? defaultImg : imageUrl}
        alt="void"
      />
    );
  }

  const formatPrice = price?.toString()?.replace(",", "");
  const formatSupplyFee = supplyFee?.toString()?.replace(",", "");
  return (
    <Dialog open={edit}>
      <DialogContent>
        <div className="category extra">
          <div className="extra-container">
            <h2 className="title">Edit Extra </h2>
            <div
              className="close"
              onClick={() => handleClose("edit", false)}
              style={{ color: "white", margin: "0px 10px" }}
            >
              <CloseIcon size={44} />
            </div>
          </div>

          <div>
            <Formik
              initialValues={{
                description,
                discount,
                extraId,
                duration,
                price: formatPrice,
                isDisabled,
                name,
                quantity,
                tax,
                merchantId,
                imageUrl,
                supplyFee: formatSupplyFee,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.duration) {
                  errors.duration = "Duration is required";
                }
                if (!values.name) {
                  errors.name = "Extra name is required";
                }
                if (!values.price) {
                  errors.price = "Price is required";
                }
                if (!values.supplyFee) {
                  errors.supplyFee = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const {
                  description,
                  discount,
                  extraId,
                  duration,
                  price,
                  isDisabled,
                  name,
                  quantity,
                  tax,
                  merchantId,
                  supplyFee,
                } = values;
                axios
                  .put(
                    URL + "/extra/" + extraId,
                    {
                      description,
                      discount,
                      merchantId,
                      duration,
                      price,
                      isDisabled,
                      name,
                      quantity,
                      tax,
                      fileId,
                      supplyFee,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    console.log("res", res.data);
                    if (res.data.codeNumber === 200) {
                      SuccessNotify(res.data.message);
                      handleClose("loading", true);
                      handleClose("edit", false);

                      setTimeout(() => {
                        getExtra(merchantId);
                      }, 1000);
                    } else {
                      FailureNotify(res.data.message);
                    }
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Extra Name*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        text="text"
                        value={values.name}
                        error={errors.name && Boolean(touched.name)}
                        helperText={
                          errors.name && touched.name ? errors.name : ""
                        }
                      />
                    </Grid>

                    <Grid item sx={12} style={{ width: "100%" }}>
                      <TextField
                        type="text"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description ? values.description : ""}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Duration*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="duration"
                        text="text"
                        value={values.duration}
                        error={errors.duration && Boolean(touched.duration)}
                        helperText={
                          errors.duration && touched.duration
                            ? errors.duration
                            : ""
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              Min
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl>
                        <InputLabel htmlFor="formatted-text-mask-input">
                          Price*
                        </InputLabel>
                        <Input
                          onChange={(e, masked) =>
                            setFieldValue("price", masked)
                          }
                          onBlur={handleBlur}
                          value={values.price}
                          inputComponent={CustomCurrencyInput}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{ width: "100%" }}>
                      <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">
                          Status*
                        </InputLabel>
                        <Select
                          value={values.isDisabled}
                          onChange={(e) =>
                            setFieldValue("isDisabled", e.target.value)
                          }
                          fullWidth
                        >
                          <MenuItem value={0}>Active</MenuItem>
                          <MenuItem value={1}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <label>Image</label>
                      {$imagePreview} <br />
                      <input
                        name="image"
                        className="custom-input"
                        type="file"
                        onChange={handleImageChange}
                        style={{
                          marginTop: "5px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl>
                        <InputLabel htmlFor="formatted-text-mask-input">
                          Surcharged
                        </InputLabel>
                        <Input
                          name="supplyFee"
                          onChange={(e, masked) =>
                            setFieldValue("supplyFee", masked)
                          }
                          onBlur={handleBlur}
                          value={values.supplyFee}
                          inputComponent={CustomCurrencyInput}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item auto>
                      <Button
                        className="btn btn-green"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        SAVE
                      </Button>
                      <Button
                        className="btn btn-red"
                        onClick={() => handleClose("edit", false)}
                      >
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditExtra;

const styles = {
  img: {
    width: "100%",
    objectFit: "cover",
  },
};
