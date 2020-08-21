import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function CheckedStatus(props) {
  const [check, setCheck] = React.useState({ checkStatus: props.trang_thai });

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
    props.change(props.id, event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={check.checkStatus}
            onChange={handleChange}
            name="checkStatus"
          />
        }
      />
    </div>
  );
}
