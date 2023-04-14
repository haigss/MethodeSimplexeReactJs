import { light } from '@material-ui/core/styles/createPalette';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import React, { useState } from 'react';



export default function Switches() {
  const [theme,setTheme]=useState('light');
  const toggletheme=()=>{
    if(theme==='light'){
      setTheme('dark');
    }else{
      setTheme('light');
    }
  }

  const handleChange=(e)=>{
    setState({...state,[e.target.name]:e.target.checked});
  };

  return(
    <div>
      <ThemeProvider theme={theme==='light' ? lightTheme:darkTheme}>
      <Switch
        defaultChecked
        color="default"
        inputProps={{'aria-label':'checkbox with default color'}}
        onclick={toggletheme}
        >
      </Switch>
      </ThemeProvider>
    </div>
  )
}

