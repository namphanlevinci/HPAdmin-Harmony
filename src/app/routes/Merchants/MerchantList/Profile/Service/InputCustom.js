import React from "react";
import InputNumber from "./InputNumber";
import "./service.style.scss";

const InputCustom = (props) => (
    <div style={{ marginTop: 15 }}>
        <div style={{ color: '#1266AE' }}>
            {props.label}
            {props.isRequired && <span>*</span>}
        </div>
        <div className="input_custom">
            <span>Min</span>
            <InputNumber
                style={{ flex: 1, }}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
            />
        </div>
    </div>
);

export default InputCustom;
