import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
	select:{
		width: 400,
	},
  }));
const Dropdown = (props) => {
  const classes = useStyles();

  const items = props.items.map((ctrl) => (
    <MenuItem value={ctrl.id}>
      {ctrl.name}
    </MenuItem>
  ));

  const checkData = (event) => {
    console.log(event)
    props.onChange(event.target.value)
  }
  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{props.label}</InputLabel>      
        <Select labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select" onChange={checkData} className={classes.select}>
          <MenuItem value="">
            Select
          </MenuItem>
          {items}
        </Select>
</FormControl>
    </div>
  );
};

export default Dropdown;
