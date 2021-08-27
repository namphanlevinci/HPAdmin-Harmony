import React from "react";
import CurrencyInput from "react-currency-input";
import "./service.style.scss";

const InputCustomPrice = (props) => (
    <div style={props.style}    >
        <div style={{ color: '#1266AE' }}>
            {props.label}
            {props.isRequired && <span>*</span>}
        </div>
        <div className="input_custom">
            <span>$</span>
            <CurrencyInput
                value={props.value}
                onChange={(event, maskedvalue, floatvalue) => {
                    props.onChange(maskedvalue)
                }}
                type="tel"
            />

        </div>
    </div>
);

export default InputCustomPrice;
