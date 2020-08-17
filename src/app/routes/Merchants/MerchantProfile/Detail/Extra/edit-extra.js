import React from "react";
import { Formik } from "formik";
import { config } from "../../../../../../url/url";
import { GrFormClose } from "react-icons/gr";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import Button from "@material-ui/core/Button";
import defaultImg from "./hpadmin2.png";
import Select from "react-select";
import CurrencyInput from "react-currency-masked-input";

import "./extra.styles.scss";

const URL = config.url.URL;

const options = [
  { value: 1, label: "Disable" },
  { value: 0, label: "Active" },
];

const EditExtra = ({
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
    $imagePreview = <img src={imagePreviewUrl} alt="void" />;
  } else {
    $imagePreview = (
      <img src={imageUrl === "" ? defaultImg : imageUrl} alt="void" />
    );
  }

  return (
    <Dialog open={edit}>
      <DialogContent>
        <div className="category extra">
          <div className="extra-container">
            <h2 className="title">Edit Extra </h2>
            <div
              className="close"
              onClick={() => handleClose("edit", false)}
              style={{ fill: "white" }}
            >
              <GrFormClose size={40} />
            </div>
          </div>

          <div>
            <Formik
              initialValues={{
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
                imageUrl,
                supplyFee,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.duration) {
                  errors.duration = "Required";
                }
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.price) {
                  errors.price = "Required";
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
                    if (res.data.codeNumber === 200) {
                      handleClose("loading", true);
                      handleClose("edit", false);

                      setTimeout(() => {
                        getExtra();
                      }, 800);
                    } else {
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
                <form onSubmit={handleSubmit}>
                  <label style={{ padding: "10px 0px" }}>Extra Name*</label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    text="text"
                    value={values.name}
                    className={
                      errors.name && touched.name
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                  <br />
                  <label style={{ padding: "10px 0px" }}>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description ? values.description : ""}
                    style={{ width: "100%", height: "70px", padding: "10px" }}
                  />
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "35%" }}>
                      <label style={{ paddingTop: "10px" }}>
                        Duration*
                        {/* <span style={{ fontSize: "10px" }}> (Minutes)</span> */}
                      </label>
                      <div className="input-box">
                        <input
                          type="number"
                          name="duration"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.duration}
                          style={{ width: "80%" }}
                        />
                        <span className="unit">Min</span>
                      </div>
                    </div>
                    <div style={{ width: "35%" }}>
                      <label style={{ paddingTop: "10px" }}>Price*</label>
                      <div className="input-box">
                        <CurrencyInput
                          name="price"
                          type="tel"
                          onChange={(e, masked) =>
                            setFieldValue("price", masked)
                          }
                          onBlur={handleBlur}
                          value={values.price}
                          style={{ width: "80%" }}
                        />
                        <span className="unit">$</span>
                      </div>
                    </div>
                    <div style={{ width: "30%" }}>
                      <label style={{ paddingTop: "10px " }}>Status*</label>

                      <Select
                        options={options}
                        name="isDisabled"
                        onChange={(e) => setFieldValue("isDisabled", e.value)}
                        defaultValue={{
                          label:
                            Number(isDisabled) === 0 ? "Active" : "Inactive",
                        }}
                      />
                    </div>
                  </div>
                  <label style={{ paddingTop: "10px" }}>Image</label>
                  <div className="extra-image-container">
                    <div style={{ height: "250px" }}>
                      {$imagePreview} <br />
                      <input
                        name="image"
                        className="custom-input"
                        type="file"
                        onChange={handleImageChange}
                        style={{
                          width: "70%",
                          marginTop: "5px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ paddingTop: "10px" }}>Surcharge</label>

                      <div className="input-box">
                        <CurrencyInput
                          name="supplyFee"
                          type="tel"
                          onChange={(e, masked) =>
                            setFieldValue("supplyFee", masked)
                          }
                          onBlur={handleBlur}
                          value={values.supplyFee}
                          style={{ width: "80%" }}
                        />
                        <span className="unit" style={{ top: "1px" }}>
                          $
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="category-button">
                    <Button
                      style={{ marginTop: "20px" }}
                      className="btn btn-green"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                    <Button
                      style={{ marginTop: "20px" }}
                      className="btn btn-red"
                      onClick={() => handleClose("edit", false)}
                    >
                      CANCEL
                    </Button>
                  </div>
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
  close: {
    color: "white",
    cursor: "pointer",
  },
};
