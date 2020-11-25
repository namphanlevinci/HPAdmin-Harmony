import React from "react";
import { Formik } from "formik";
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
  CardMedia,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import defaultImg from "./hpadmin2.png";
import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import "./extra.styles.scss";

const EditExtra = ({
  updateExtra,
  uploadImage,
  merchantId,
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
    $imagePreview = (
      <CardMedia component="img" src={imagePreviewUrl} alt="void" />
    );
  } else {
    $imagePreview = (
      <CardMedia
        component="img"
        src={imageUrl === "" ? defaultImg : imageUrl}
        alt="void"
      />
    );
  }

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "white",
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const formatPrice = price?.toString()?.replace(",", "");
  const formatSupplyFee = supplyFee?.toString()?.replace(",", "");
  return (
    <Dialog open={edit}>
      <DialogContent>
        <div className="category extra">
          <div className="extra-container">
            <DialogTitle
              id="customized-dialog-title"
              onClose={() => handleClose("edit", false)}
            >
              Edit Extra
            </DialogTitle>
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
                updateExtra(values);
                handleClose("loading", true);
                handleClose("edit", false);
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
                  <Grid container spacing={3} style={{ marginTop: "5px" }}>
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
                    <Grid item xs={4}>
                      <FormControl style={{ width: "100%" }}>
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
                    <Grid item xs={4}>
                      <label>Image</label>
                      {$imagePreview} <br />
                      <input
                        name="image"
                        className="custom-input"
                        accept="image/gif,image/jpeg, image/png"
                        type="file"
                        onChange={(e) => uploadImage(e, setFieldValue)}
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
