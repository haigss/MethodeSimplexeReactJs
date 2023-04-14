import React, { useState } from "react";
import Zone from './Object/Zone';

const Fonction=(props)=>{
  var w=[];

  var renderFonction=(i)=>{
    const name='X'+{i};
    const setFoncP=(v,i)=>{
      props.foncP[i]=parseInt(v);
    }
    return <Zone 
            id={i} 
            //value={props.foncP[i]} 
            onChange={(event)=>setFoncP(event.target.value,i)}
          />
  }
  var renderLabel=(i, pl)=>{
    return <label >X<sub>{i}</sub>{pl} </label>
  }
  var h2=(v)=>{ //Affichage des render pour la fonction principale
    var pl='+';
    for (let i = 0,j=0; i < v; i++) {
      pl=((i+1)%v==0)?'':'+';
      w[j++]=renderFonction(i);
      w[j++]=renderLabel(i,pl);
    }
  }
  return(
    <div>
      <br></br>
      <a>Fonction:</a>
      {h2(props.var)}
      {w.map(inp=>([inp]))}
    </div>
  );
}

export default Fonction;