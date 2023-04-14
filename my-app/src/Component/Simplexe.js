import React from "react";

const sfi=['<=','=','>='];
const mfi=['ecart','exces','artificielle'];

const Simplexe=(props)=>{
  const mm = (props.minmax=='Min')? 'Minimiser':'Maximiser';
  var cl=0;

  var simplexe=(cl,ft)=>{
    const s=[];
    let is=0;
    s[is++]=<a>{props.tabX[0]}X<sub>0</sub></a>;
    var pl='+';
    for (let i = 1,m=0,l=1; i < props.var*props.cont; i++) {
      pl=(i==props.var)?'':'+';
      s[is++]=<a>{pl}{props.tabX[i]}X<sub>{l++}</sub></a>;
      if((i+1)%props.var==0){
        if(ft){
          s[is++]=<a>{pl}X<sub>{parseInt(props.var)+parseInt(cl++)}</sub></a>;
        }
        l=0;
        s[is++]=<a>{(ft)?'=':props.sfi[props.fi[m]-1]}{props.res[m]}<br></br></a>;
        m++;
      }
    }
    return s;
  }
  var tabtostr=(t,size,ft)=>{
    var s=[];
    let is=0;
    var pl='+';
    for (let i = 0; i < size; i++) {
      pl=(i==(size-1))?'':'+';
      s[is++]=<a>{t[i]}X<sub>{i}</sub>{pl}</a>;
    }
    if(ft==true){
      size=parseInt(props.var)+parseInt(props.cont);
      for (let i = props.var; i < size; i++) {
        pl=((i)==size)?'':'+';
        s[is++]=<a>{pl}0X<sub>{i}</sub></a>;    
      }
    }
    return s;
  }

  return(
    <>
      <p>F: {tabtostr(props.foncP,props.var)}<br></br></p>
      {simplexe(cl,false)}
      {}
      <br></br><p>On transforme le probleme canonique en ajoutant des variable d'excès, d'ecart et artificielle.</p><br></br>
      {Array(props.cont-0).fill().map((_,idx)=><li>Comme la contrainte {idx+1} est de type {sfi[props.fi[idx]-1]}, il est necessaire d'ajouter la variable d'{mfi[props.fi[idx]-1]}.</li>)}
      <br></br>
      <strong>{mm}: </strong>{tabtostr(props.foncP,props.var,false)}<br></br><p>sous les contraintes:</p>{simplexe(cl,false)}<br></br>{props.x}<br></br>&darr;<br></br>
      <strong>Maximiser</strong>: {tabtostr(props.foncP,props.var,true)}<br></br><p>sous les contraintes:</p>{simplexe(cl,true)}<br></br>{props.x2}<br></br>
    </>
  );
}

export default Simplexe;