import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

function CustomSelect(props) {

  const renderData = () => {
    const { data } = props;
    if (data) {
      return data.map(obj => (
        <MenuItem value={obj.stateId}>{obj.name}</MenuItem>
      ));
    }
    return null;
  }

  const { label, handleChange, initialValue, name, data = null } = props;

  if (data) {
    return (
      <FormControl style={{ width: "100%" }}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select name={name} value={initialValue} onChange={handleChange}>
          {renderData()}
        </Select>
      </FormControl>
    )
  }
  else
    return (
      <FormControl style={{ width: "100%" }}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select name={name} value={initialValue} onChange={handleChange}>
          <MenuItem value={1}> New York</MenuItem>
          <MenuItem value={2}> Florida</MenuItem>
          <MenuItem value={4}> California</MenuItem>
          <MenuItem value={5}> Texas</MenuItem>
          <MenuItem value={7}> Alaska</MenuItem>
          <MenuItem value={8}> Alabama</MenuItem>
          <MenuItem value={9}> Arkansas</MenuItem>
          <MenuItem value={10}> Arizona</MenuItem>
          <MenuItem value={11}> Colorado</MenuItem>
          <MenuItem value={12}> Connecticut</MenuItem>
          <MenuItem value={13}> Washington, D.C.</MenuItem>
          <MenuItem value={14}> Delaware</MenuItem>
          <MenuItem value={15}> Georgia</MenuItem>
          <MenuItem value={16}> Hawaii</MenuItem>
          <MenuItem value={17}> Iowa</MenuItem>
          <MenuItem value={18}> Idaho</MenuItem>
          <MenuItem value={19}> Illinois</MenuItem>
          <MenuItem value={20}> Indiana</MenuItem>
          <MenuItem value={21}> Kansas</MenuItem>
          <MenuItem value={22}> Kentucky</MenuItem>
          <MenuItem value={23}> Louisiana</MenuItem>
          <MenuItem value={24}> Massachusetts</MenuItem>
          <MenuItem value={25}> Maryland</MenuItem>
          <MenuItem value={26}> Maine</MenuItem>
          <MenuItem value={27}> Michigan</MenuItem>
          <MenuItem value={28}> Minnesota</MenuItem>
          <MenuItem value={29}> Missouri</MenuItem>
          <MenuItem value={30}> Mississippi</MenuItem>
          <MenuItem value={31}> Montana</MenuItem>
          <MenuItem value={32}> North Carolina</MenuItem>
          <MenuItem value={33}> North Dakota</MenuItem>
          <MenuItem value={34}> Nebraska</MenuItem>
          <MenuItem value={35}> New Hampshire</MenuItem>
          <MenuItem value={36}> New Jersey</MenuItem>
          <MenuItem value={37}> New Mexico</MenuItem>
          <MenuItem value={38}> Nevada</MenuItem>
          <MenuItem value={39}> Ohio</MenuItem>
          <MenuItem value={40}> Oklahoma</MenuItem>
          <MenuItem value={41}> Oregon</MenuItem>
          <MenuItem value={42}> Pennsylvania</MenuItem>
          <MenuItem value={43}> Rhode Island</MenuItem>
          <MenuItem value={44}> South Carolina</MenuItem>
          <MenuItem value={45}> South Dakota</MenuItem>
          <MenuItem value={46}> Tennessee</MenuItem>
          <MenuItem value={47}> Utah</MenuItem>
          <MenuItem value={48}> Virginia</MenuItem>
          <MenuItem value={49}> Vermont</MenuItem>
          <MenuItem value={50}> Washington</MenuItem>
          <MenuItem value={51}> Wisconsin</MenuItem>
          <MenuItem value={52}> West Virginia</MenuItem>
          <MenuItem value={53}> Wyoming</MenuItem>
        </Select>
      </FormControl>
    );
}

export default CustomSelect;
