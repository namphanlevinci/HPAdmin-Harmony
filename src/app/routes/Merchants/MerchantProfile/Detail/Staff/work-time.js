import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Time from "./time";

import "./Staff.styles.scss";

const WorkTime = ({
  handleChange,
  handleCheckBox,
  state: {
    timeStart2,
    timeEnd2,
    isCheck2,
    timeStart3,
    timeEnd3,
    isCheck3,
    timeStart4,
    timeEnd4,
    isCheck4,
    timeStart5,
    timeEnd5,
    isCheck5,
    timeStart6,
    timeEnd6,
    isCheck6,
    timeStart7,
    timeEnd7,
    isCheck7,
    timeStart8,
    timeEnd8,
    isCheck8
  }
}) => {
  return (
    <div className="container Staff">
      {/* Monday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck2"
            checked={isCheck2}
            onChange={handleCheckBox("isCheck2")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Monday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart2">
              <option>{timeStart2}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd2">
              <option>{timeEnd2}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Tueday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck3"
            checked={isCheck3}
            onChange={handleCheckBox("isCheck3")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Tueday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart3">
              <option>{timeStart2}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd3">
              <option>{timeEnd3}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Wednesday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck4"
            checked={isCheck4}
            onChange={handleCheckBox("isCheck4")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Wednesday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart4">
              <option>{timeStart4}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd4">
              <option>{timeEnd4}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Thursday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck5"
            checked={isCheck5}
            onChange={handleCheckBox("isCheck5")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Thurday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart5">
              <option>{timeStart5}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd5">
              <option>{timeEnd5}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Friday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck6"
            checked={isCheck6}
            onChange={handleCheckBox("isCheck6")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Friday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart6">
              <option>{timeStart6}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd6">
              <option>{timeEnd6}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Saturday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck7"
            checked={isCheck7}
            onChange={handleCheckBox("isCheck7")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Saturday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart7">
              <option>{timeStart7}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd7">
              <option>{timeEnd7}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
      {/* Sunday */}
      <div className="row justify-content-center">
        <div className="col-4">
          <Checkbox
            name="isCheck8"
            checked={isCheck8}
            onChange={handleCheckBox("isCheck8")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          <label>Sunday</label>
          <div className="time-select">
            <label>From</label> <br />
            <select onChange={handleChange} name="timeStart8">
              <option>{timeStart8}</option>
              <Time />
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="time-select pad-down">
            <label>To</label> <br />
            <select onChange={handleChange} name="timeEnd8">
              <option>{timeEnd8}</option>
              <Time />
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkTime;
