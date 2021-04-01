import React from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";

function AddButton({ onChange }) {
  return (
    <div>
      <label for="upload-photo" style={{ display: "flex", cursor: "pointer" }}>
        <AttachFileIcon />
        <p style={{ fontSize: 16, fontWeight: 500 }}>Add file</p>
      </label>
      <input
        onChange={onChange}
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        type="file"
        name="image"
        id="upload-photo"
        accept="image/gif,image/jpeg, image/png"
      />
    </div>
  );
}

export default AddButton;
