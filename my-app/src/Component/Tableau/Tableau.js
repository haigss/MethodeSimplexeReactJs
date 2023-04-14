import React from "react";
import Table from '@material-ui/core/Table';
import { makeStyles, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const useStyle=makeStyles({
  root:{
    width:'20%',
    textAlign:'center',
  },
})

const Tableau=(props)=>{
  const classes=useStyle();
  var tabSizeL=parseInt(props.var)+parseInt(props.cont)+3+parseInt(props.c);

  var l3=(t, i)=> {
    const t0 = Object.values(t.filter ((num,ind, t) => parseInt(ind)==i)[0]);
    return t0.map((e)=><TableCell key={e}>{e}</TableCell>);
  }
  var loop=()=> {
    var s=[];
    for (var i=0; i<props.cont; i++) {
      s[i]=<TableRow key={i}>{l3(props.matrice,i)}</TableRow>
    }
    return s;
  }

  return(
    <div><center>
      <Table className={classes.root}>
        <TableHead>Tableau</TableHead>
        <TableRow>
          <TableCell>/</TableCell>
          <TableCell>/</TableCell>
          <TableCell>/</TableCell>
          {Array(props.var-0).fill().map((_,idx)=><TableCell>{props.foncP[idx]}</TableCell>)}
          {Array(props.cont-0).fill().map((_,idx)=><TableCell>{0}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell>Base</TableCell>
          <TableCell>Cb</TableCell>
          {Array((tabSizeL-2)-0).fill().map((_,idx)=><TableCell>P<sub>{idx}</sub></TableCell>)}
        </TableRow>
        <TableBody>
          {props.copieMatrice}
          {loop()}
          <TableRow>
            {props.tabZ.map(ez=>(<TableCell>{ez}</TableCell>))}
          </TableRow>
        </TableBody>
      </Table>
    </center></div>
  );
}

export default Tableau;