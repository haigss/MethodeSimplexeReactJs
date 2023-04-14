import React from "react";
import Table from '@material-ui/core/Table';
import { makeStyles, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const useStyle=makeStyles({
  root:{
    width:'20%',
    textAlign:'center',
  },
  color:{
    backgroundColor:'#',
  }
})

const TableauGraph=(props)=>{
  const classes=useStyle();
  const rows=[
    props.matrice[2].map(b=><TableCell>{b}</TableCell>),
    props.matrice[0].map(b=><TableCell>{b}</TableCell>),
    props.matrice[1].map(b=><TableCell>{b}</TableCell>),
  ]
   
  return(
    <div>
      <center>
      <Table className={classes.root} >
        <TableHead>Tableau graphique</TableHead>  
          <TableRow>
            <TableCell></TableCell>
            <TableCell>x<sub>0</sub></TableCell> 
            <TableCell>y<sub>0</sub></TableCell>
            <TableCell>x<sub>1</sub></TableCell>
            <TableCell>y<sub>1</sub></TableCell>
          </TableRow>
          <TableBody>
            {rows.map(row=>(<TableRow>{row}</TableRow>))}
          </TableBody>
      </Table>
      </center>
    </div>
  );
}

export default TableauGraph;