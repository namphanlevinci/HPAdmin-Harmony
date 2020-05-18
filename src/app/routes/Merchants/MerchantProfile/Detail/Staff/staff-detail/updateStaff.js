import React from "react";
import axios from "axios";
import URL from "../.../../../../../../../../url/url";

const updateStaff = (ID, body, token, viewStaff, history, path) => {
  const MerchantID = body?.MerchantId;
  axios
    .put(URL + `/staff/${ID}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("res", res.data);
      if (res.data.message === "Success") {
        axios
          .get(URL + `/staff/${ID}?merchantId=${MerchantID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log("res 2222", res);
            viewStaff(res.data.data);
            history.push(path);
          });
      }
    });
};

export default updateStaff;
