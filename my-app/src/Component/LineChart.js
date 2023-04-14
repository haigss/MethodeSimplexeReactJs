import { Line } from 'react-chartjs-2';
import React from "react";
import { makeStyles} from '@material-ui/core';  

const useStyle=makeStyles({
  g:{
    width:'500px',
    height:'400px',
  }
})

export default function LineChart(props){
    const classes=useStyle();
    return (
      <div className={classes.g}>
        <Line
          var data= {{
           labels:props.l,
            datasets: [{
              label: 'd1',
              data:props.d1,
              borderColor:'hsla(140,100%,30%,1)',
              backgroundColor:'hsla(140,100%,30%,0.8)',
              fill:'origin',
            },
            {
              label: 'd2',
              data:props.d2,
              borderColor:'hsl(240,100%,27%)',
              backgroundColor:'hsl(240,100%,27%)',
              //fill:'origin',
            },
            {
              label: 'd0',
              data:props.dO,
              borderColor:'hsla(0,0%,0%,1)',
              backgroundColor:'hsla(0,0%,0%,1)',
            }],

          }}
          options={{      
            maintainAspectRatio: false,
          }}
        />
      </div>  
    ); 
  }