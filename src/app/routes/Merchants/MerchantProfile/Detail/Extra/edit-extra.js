import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import URL from "../../../../../../url/url";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import defaultImg from "./hpadmin2.png";

import "./extra.styles.scss";

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
    imagePreviewUrl
  }
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
    <Dialog
      open={edit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className="category extra">
          <div className="extra-container">
            <h2 className="title">Edit Extra</h2>
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
                imageUrl
              }}
              validate={values => {
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
                  merchantId
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
                      fileId
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  )
                  .then(res => {
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
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <label style={{ padding: "10px 0px" }}>Extra name*</label>
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
                    value={values.description}
                    style={{ width: "100%", height: "70px", padding: "10px" }}
                  />
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "35%" }}>
                      <label style={{ padding: "10px 0px" }}>
                        Duration*
                        <span style={{ fontSize: "10px" }}>(Minutes)</span>
                      </label>
                      <input
                        type="number"
                        name="duration"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.duration}
                        style={{ width: "80%" }}
                      />
                    </div>
                    <div style={{ width: "35%" }}>
                      <label style={{ padding: "10px 0px" }}>Price*</label>
                      <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        style={{ width: "80%" }}
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      <label style={{ padding: "10px 0px" }}>Status*</label>
                      <select
                        onChange={handleChange}
                        name="isDisabled"
                        value={values.isDisabled}
                      >
                        <option
                          value="0"
                          checked={isDisabled === 0 ? true : false}
                        >
                          Active
                        </option>
                        <option
                          value="1"
                          checked={isDisabled === 1 ? true : false}
                        >
                          Disable
                        </option>
                      </select>
                    </div>
                  </div>
                  <label style={{ paddingTop: "10px" }}>Image</label>
                  <div className="extra-image-container">
                    <div>{$imagePreview}</div>
                    <input
                      name="price"
                      type="file"
                      onChange={handleImageChange}
                      style={{
                        width: "auto",
                        borderBottom: "none",
                        paddingTop: "20px",
                        fontWeight: 400
                      }}
                    />
                  </div>
                  <div className="category-button">
                    <Button
                      style={{ marginTop: "20px" }}
                      className="green"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                    <Button
                      style={{ marginTop: "20px" }}
                      className="red"
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
