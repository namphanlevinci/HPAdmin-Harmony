import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, FieldArray } from "formik";

const Questions = ({ handleChange, businessInfo }) => {
  console.log("value", businessInfo);
  // const mapQuestion = value.map((e, index) => {
  //   return (
  //     <div className="col-6" key={e.index}>
  //       <FormControl component="fieldset">
  //         <label>
  //           {`${index}`}. {`${e.question}`}
  //         </label>
  //         <RadioGroup
  //           aria-label="position"
  //           name={e.isAccept1}
  //           value=""
  //           onChange={handleChange}
  //           row
  //         >
  //           <div>
  //             <FormControlLabel
  //               value="false"
  //               control={<Radio color="primary" />}
  //               label="No"
  //               labelPlacement="bottom"
  //             />
  //             <FormControlLabel
  //               value="true"
  //               control={<Radio color="primary" />}
  //               label="Yes"
  //               labelPlacement="bottom"
  //             />
  //           </div>
  //         </RadioGroup>
  //       </FormControl>
  //       <TextField
  //         name={e.des1}
  //         label="Answer"
  //         type="text"
  //         margin="normal"
  //         fullWidth
  //         onChange={handleChange}
  //       />
  //     </div>
  //   );
  // });

  return (
    // <div className="container-fluid">
    //   <div className="row">

    //   </div>
    // </div>
    <Formik
      initialValues={{ businessInfo: businessInfo }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="businessInfo"
            render={arrayHelpers => (
              <div>
                {values.businessInfo && values.businessInfo.length > 0 ? (
                  values.businessInfo.map((businessInfo, index) => (
                    <div key={index}>
                      <Field name={`businessInfo.${index}.value`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  );
};

export default Questions;
