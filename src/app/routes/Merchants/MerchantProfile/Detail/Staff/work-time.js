import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Time from "./time";
import Select from "react-select";

import "./Staff.styles.scss";

const WorkTime = ({
  handleSelect,
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
    isCheck8,
  },
}) => {
  return (
    <div className="container Staff">
      {/* Monday */}
      <div
        className="row justify-content-center"
        style={{ paddingBottom: "10px" }}
      >
        <div className="col-2">
          <label style={{ color: "#4251af" }}>Date</label>
        </div>
        <div className="col-5">
          <label>Shift Start</label>
        </div>
        <div className="col-5">
          <label>Shift End</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck2"
            checked={isCheck2}
            onChange={handleCheckBox("isCheck2")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Monday</label>
        </div>

        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart2"
              value={timeStart2}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select pad-down">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd2"
              value={timeEnd2}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Tuesday */}
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck3"
            checked={isCheck3}
            onChange={handleCheckBox("isCheck3")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tuesday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart3"
              value={timeStart3}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd3"
              value={timeEnd3}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Wednesday */}
      <div className="row justify-content-center">
        <div className="col-2" style={{ padding: "0px 0px 0px 5px" }}>
          <Checkbox
            name="isCheck4"
            checked={isCheck4}
            onChange={handleCheckBox("isCheck4")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Wednesday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart4"
              value={timeStart4}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd4"
              value={timeEnd4}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Thursday */}
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck5"
            checked={isCheck5}
            onChange={handleCheckBox("isCheck5")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Thursday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart5"
              value={timeStart5}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd5"
              value={timeEnd5}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Friday */}
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck6"
            checked={isCheck6}
            onChange={handleCheckBox("isCheck6")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Friday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart6"
              value={timeStart6}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select pad-down">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd6"
              value={timeEnd6}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Saturday */}
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck7"
            checked={isCheck7}
            onChange={handleCheckBox("isCheck7")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Saturday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart7"
              value={timeStart7}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd7"
              value={timeEnd7}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {/* Sunday */}
      <div className="row justify-content-center">
        <div className="col-2" style={style.col2}>
          <Checkbox
            name="isCheck8"
            checked={isCheck8}
            onChange={handleCheckBox("isCheck8")}
            value="false"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Sunday</label>
        </div>
        <div className="col-5">
          <div className="time-select">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeStart8"
              value={timeStart8}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="time-select pad-down">
            <Select
              options={Time}
              onChange={handleSelect}
              name="timeEnd8"
              value={timeEnd8}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkTime;

const style = {
  col2: {
    paddingLeft: "5px",
  },
};
