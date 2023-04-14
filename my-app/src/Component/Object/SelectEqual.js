import React, { Component, Fragment, useEffect, useState } from "react";
import Select from '@material-ui/core/Select';


export default function SelectEqual(props) {
  return(
    <Select 
      id={props.id} 
      value={props.value} 
      onChange={props.onChange}> 
        <option value='1' label="<="></option>
        <option value='2' label="="></option>
        <option value='3' label=">="></option>
    </Select>
  );
}