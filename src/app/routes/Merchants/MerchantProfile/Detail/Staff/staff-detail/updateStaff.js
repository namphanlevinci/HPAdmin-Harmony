import axios from "axios";
import { config } from "../.../../../../../../../../url/url";
const URL = config.url.URL;
const updateStaff = (ID, body, token, viewStaff, history, path) => {
  const MerchantID = body?.MerchantId;
  axios
    .put(URL + `/staff/${ID}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data.message === "Success") {
        axios
          .get(URL + `/staff/${ID}?merchantId=${MerchantID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            viewStaff(res.data.data);
            history.push(path);
          });
      }
    });
};

export default updateStaff;
