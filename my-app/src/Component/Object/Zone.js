import React from "react";
import Input from '@material-ui/core/Input';

export default function Zone(props) {
  return (
    <Input
      type="text"
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    />
  );
}