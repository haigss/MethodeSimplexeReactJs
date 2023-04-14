import './App.css';
import React, { useEffect, useState } from "react";
import { 
  BrowserRouter as Router,
} from "react-router-dom";
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ZoneGroupe from './Component/ZoneGroupe';


const App=()=>{
  const [variable,setVarible]=useState(2); //Contient le nombre de variable a crée
  const [contrainte,setContrainte]=useState(2); //Contient le nombre de contrainte a crée
  const [sel,setSel]=useState("simplexe"); 

  useEffect(()=>{
    
  },[variable],[contrainte]);

  return(
      <Router>
      <div style={{textAlign:'center'}}>
        <header>
        <Typography variant="h4"><br></br>Résolution graphique</Typography><br></br>
          <p>
            Méthode: 
            <Select 
              style={{width:120}}
              onChange={event=>setSel(event.target.value)}
              options={[
                {value:"simplexe",label:"Simplexe",color:""},
                {value:"graphique",label:"Graphique",color:""}
              ]}>
              <option value="simplexe">Simplexe</option>
              <option value="graphique">Graphique</option>
            </Select>
          </p>
          <p>
            Nombre de variables de décision?
            <Input 
              //variant={"standard"} 
              value={variable} 
              onChange={event=>setVarible(event.target.value)}> 
            </Input>
          </p>
          <p>
            Nombre de contrainte?
            <Input 
              //variant={"standard"} 
              value={contrainte} 
              onChange={event=>setContrainte(event.target.value)}>
            </Input>
          </p><br></br>
         {/*JSON.stringify(this.state)*/}
      </header><br></br><br></br>
      </div>
      <div style={{textAlign:'center'}}>
        {variable && contrainte &&
          <ZoneGroupe value={variable*contrainte} var={variable} cont={contrainte} sel={sel}/>}
      </div>
      </Router>
    );
}

export default App;