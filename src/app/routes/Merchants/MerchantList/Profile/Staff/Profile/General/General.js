import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, Avatar } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../../util/CustomText";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DefaultAvatar from "../../../../avatar.png";
import AccorditionSevice from "@/components/AccorditionService";
import check_box from "@/assets/images/check_box.png";
import check_box_empty from "@/assets/images/check_box_empty.png";

import "../../Staff.styles.scss";

export class General extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelectAllCategories: false,
    }
  }

  componentDidMount() {
    this.setState({
      isSelectAllCategories: this.checkAllCategories(),
    })
  }


  checkAllCategories = () => {
    let flag = true;
    const data = this.props.Staff;
    const { categories } = data;

    for (let i = 0; i < categories.length; i++) {
      const staffServices = categories[i].staffServices ? categories[i].staffServices : [];
      for (let j = 0; j < staffServices.length; j++) {
        if (staffServices[j].selected === false) {
          flag = false;
          return false;
        }
      }
    }

    return flag;
  }

  render() {
    const Staff = this.props.Staff;
    const { categories } = Staff;
    const { isSelectAllCategories } = this.state;
    const imageUrl = Staff.imageUrl;

    return (
      <Grid container spacing={3} className="content">
        <Grid item xs={12}>
          <CustomTitle value="General Information" />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="First Name*" />
          <CustomText value={Staff?.firstName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Last Name*" />
          <CustomText value={Staff?.lastName} />
        </Grid>
        <Grid item xs={4}>
          <CustomTextLabel value="Display Name*" />
          <CustomText value={Staff?.displayName} />
        </Grid>

        <Grid item xs={12}>
          <CustomTextLabel value="Address" />
          <CustomText value={Staff?.address} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="City" />
          <CustomText value={Staff?.city} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="State" />
          <CustomText value={Staff?.stateName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Zip Code" />
          <CustomText value={Staff?.zip} />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <CustomTextLabel value="Cell Phone" />
              <CustomText value={Staff?.phone} />
            </Grid>

            <Grid item xs={4}>
              <CustomTextLabel value="Contact Email" />
              <CustomText value={Staff?.email} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Create PIN*" />
          <CustomText value="****" />
        </Grid>

        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Staff?.isActive}
                control={<Checkbox color="primary" />}
                label="Visible on App"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <CustomTextLabel value="Roles" />
          <CustomText value={Staff?.roleName} />
        </Grid>

        <Grid item xs={4}>
          <CustomTextLabel value="Status" />
          <CustomText
            value={Staff?.isDisabled === 0 ? "Available" : "Not Available"}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3} lg={3}>
          <CustomTextLabel value="Avatar" />
          <Avatar
            src={Staff.imageUrl || DefaultAvatar}
            style={{ width: 130, height: 130, marginTop: 30, objectFit: 'contain', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          />
        </Grid>


        <Grid style={{ marginTop: 15 }} item xs={12} md={12}>
          <div style={{ fontSize: '1.25rem', fontWeight: '500', color: '#1366AE' }}>Services</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '400', color: '#404040', marginTop: 10, marginBottom: 20 }}>
            Assign services this staff can be perform
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
            <img
              onClick={() => { }}
              style={{ width: 25, height: 25 }}
              src={isSelectAllCategories ? check_box : check_box_empty}
            />
            <span style={{ fontSize: "1.1rem", marginLeft: 10, fontWeight: "500", color: "#1366AE" }}>
              Select all
                      </span>
          </div>
          {
            categories && categories.length > 0 && categories.map((cate) => {
              return (
                <AccorditionSevice
                  category={cate}
                  key={cate.categoryId + "assignService"}
                  selectServiceOfCategories={() => { }}
                  selectCategories={() => { }}
                />
              )
            })
          }
        </Grid>

        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/staff/General/edit")
            }
          >
            EDIT
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.staffById.data,
});

export default connect(mapStateToProps)(General);
