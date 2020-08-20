import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "./Consumer.css";

export default function DisableConsumer({
  open,
  handleToggle,
  ConsumerID,
  deleteConsumer,
}) {
  return (
    <div>
      <Button className="btn btn-red" onClick={handleToggle}>
        ARCHIVE
      </Button>
      <Dialog
        open={open}
        onClose={handleToggle}
        className="consumer_btn_container"
      >
        <DialogContent style={{ maxWidth: "600px" }}>
          <Formik
            initialValues={{ rejectReason: "" }}
            validate={(values) => {
              let errors = {};
              if (!values.rejectReason) {
                errors.rejectReason = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const reason = values.rejectReason;
              const payload = { ID: ConsumerID, reason };
              deleteConsumer(payload);
            }}
          >
            {({ values, isSubmitting }) => (
              <div className="rejectInput">
                <p className="close" onClick={handleToggle}>
                  &times;
                </p>
                <div className="disable__title">
                  <p
                    style={{
                      fontSize: "22px",
                      textAlign: "center",
                      color: "white",
                      fontWeight: "400",
                    }}
                  >
                    Warning!
                  </p>
                </div>
                <Form style={styles.Form}>
                  <h2 style={{ color: "black" }}>
                    Are you sure you want to Archive this consumer?
                  </h2>
                  <Field
                    style={{ padding: "10px" }}
                    type="textarea"
                    name="rejectReason"
                    component="textarea"
                    placeholder="Please enter your reason."
                  />
                  <ErrorMessage
                    name="rejectReason"
                    component="div"
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "17px",
                    }}
                  />
                  <div style={styles.btnDiv} className="general-content">
                    <Button type="submit" className="btn btn-green">
                      CONFIRM
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-red"
                      onClick={handleToggle}
                    >
                      CANCEL
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const styles = {
  p: { fontWeight: 400, color: "black" },
  Form: {
    padding: "25px",
    textAlign: "center",
  },
  btnDiv: {
    marginTop: "10px",
  },
  label: {
    fontSize: "13px",
  },
};
