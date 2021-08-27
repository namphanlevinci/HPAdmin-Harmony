import React from "react";
import InputMask from "react-input-mask";

const MaskInput = (props) => (
    <InputMask
        mask="99999999999999999"
        maskChar={null}
        value={props.value}
        onChange={props.onChange}
    >
        {
            (inputProps) => (
                <input
                    name={props.name}
                    style={props.style}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    {...inputProps}
                    className="input_number_duration"
                    type="text"
                />
            )
        }
    </InputMask>
);

export default MaskInput;
