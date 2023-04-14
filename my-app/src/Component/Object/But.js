import React from "react";
import Select from '@material-ui/core/Select';

export default function But(props) {
  return(
    <div>
    <a>But:</a>
      <Select
        style={{width:120}}
        id={props.id} 
        value={props.value} 
        onChange={props.onChange}>
          <option value='Min' label='Minimiser'></option>
          <option value='Max' label='Maximiser'></option>
      </Select>
    </div>
  );
}