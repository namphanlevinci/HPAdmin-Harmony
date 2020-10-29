import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import SelectField from "../FormFields/SelectField";
import Time from "../../time";
function WorkTime(props) {
  const {
    setFieldValue,

    initValue: {
      workingTime: {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
      },
    },
  } = props;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Work Time
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          Date
        </Grid>
        <Grid item xs={12} md={5}>
          Shift Start
        </Grid>
        <Grid item xs={12} md={5}>
          Shift End
        </Grid>
        {/* Monday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Monday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`workingTime.Monday.isCheck`, e.target.checked)
                }
                label="Monday"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Monday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Monday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Tuesday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Tuesday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`workingTime.Tuesday.isCheck`, e.target.checked)
                }
                label="Tuesday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Tuesday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Tuesday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Wednesday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Wednesday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(
                    `workingTime.Wednesday.isCheck`,
                    e.target.checked
                  )
                }
                label="Wednesday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Wednesday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Wednesday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Thursday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Thursday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(
                    `workingTime.Thursday.isCheck`,
                    e.target.checked
                  )
                }
                label="Thursday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Thursday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Thursday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Friday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Friday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`workingTime.Friday.isCheck`, e.target.checked)
                }
                label="Friday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Friday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Friday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Saturday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Saturday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(
                    `workingTime.Saturday.isCheck`,
                    e.target.checked
                  )
                }
                label="Saturday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Saturday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Saturday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
        {/* Sunday */}
        <Grid item xs={12} md={2}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={Sunday.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`workingTime.Sunday.isCheck`, e.target.checked)
                }
                label="Sunday"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Sunday.timeStart"
            data={Time}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectField
            name="workingTime.Sunday.timeEnd"
            data={Time}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkTime;
