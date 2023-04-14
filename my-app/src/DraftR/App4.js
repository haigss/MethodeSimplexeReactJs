import './App.css';
import React, { Component, Fragment, useEffect, useState } from "react";
import { 
  BrowserRouter as Router, Switch,
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles, TableBody, TableCell, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
//import Chart from 'chart.js/auto';
import Chart from './Chart';
import Input from '@material-ui/core/Input';
import  {Line} from 'react-chartjs-2';
import Table from '@material-ui/core/Table';
import Zone from './Component/Zone';
import SelectEqual from './Component/SelectEqual';
import But from './Component/But';
import { render } from '@testing-library/react';

const useStyle=makeStyles({
  root:{
    width:'20%',
    textAlign:'center',
  },
  back:{
    backgroundColor:'black',
    textAlign:'center',
    color:'white',
  },
  g:{
    width:'500px',
    height:'400px',
  }
})

const sfi=['<=','=','>='];
const mfi=['ecart','exces','artificielle'];

const ZoneGroupe=(props)=>{
  const [tabX,setTabX]=useState([]);
  const [fi,setFi]=useState([]);
  const [res,setRes]=useState([]);
  const [minmax,setMinmax]=useState("Min");
  const [foncP,setFoncP]=useState([]);
  var v = [],w=[],a=[];
  var cl=0;
  var val='';
  var [coef,setCoef]=useState([]);
  var [tabm,setTabm]=useState([]);
  var [tabZ,setTabZ]=useState([]);
  var indPivotColonne=0;
  var indPivotLigne=0;
  var [tabBase,setTabBase]=useState([]);
  const [tab,setTab]=useState([]);
  var tabCp=[];
  var xvalue=[],yvalue=[];

  useEffect(()=>{
    //alert('biou'+tabX);
    //tabX=props.var*props.cont;
  },[...tabX]);

  const matrice=([[]]);

  var handleSubmit=(event)=>{
    var div=document.getElementById("div");
    let s="<But/>"+"<br>";
    div.innerHTML=s+affichageSimplexe();
    event.preventDefault();
  }

  var simplexe=(cl,ft)=>{
    var s=tabX[0]+'X0';
    var pl='+';
    //s=s+tabX.map(el=()=>{pl+el});
    for (let i = 1,m=0,l=1; i < props.var*props.cont; i++) {
      s=s+pl+tabX[i]+'X'+l++;
      pl='+';
      if((i+1)%props.var==0){
        if(ft){
          s=s+pl+'X'+cl++;
        }
        l=0;
        s=s+sfi[fi[m]-1];
        s=s+res[m];
        s=s+'<br>';
        pl='';
        m++;
      }
    }
    return s;
  }
  var simplexe2=()=>{
    var s='';
    s=s+"<br><p>On transforme le problème canonique en ajoutant des variables d'exces, d'ecart et artificielle</p>";
    for (let i = 0; i < props.cont; i++) {
      s=s+"<li>Comme la contraint "+(i+1)+" est de type '"+sfi[fi[i]-1]+"', il est nécessaire d'ajouter la variable d'"+mfi[fi[i]-1]+"</li><br>";
    }
    return s;
  }
  var simplexe3=()=>{
    var s='';
    const mm = (minmax=='Min')? 'Minimiser':'Maximiser';
    s=s+"<Strong>"+mm+"</Strong>: "+tabtostr(foncP,props.var,false)+"<br><p>sous les constraintes:</p>"+simplexe(cl,false);
    s=s+"<br><=><br><Strong>Maximiser</Strong>: "+tabtostr(foncP,props.var,true)+"<br><p>sous les contraintes</p>"+simplexe(cl,true);
    s=s+x()+"<br>";
    return s;
  }
  var x=()=>{
    var s='X0';
    s=s+Array(props.var-1).fill().map((_,idx)=>',X'+parseInt(idx+1));
    s=s+">=0";
    return s;
  }
  var affichageSimplexe=()=>{
    let v='';
    v="F:"+tabtostr(foncP,props.var)+'<br>';
    alert(props.sel);
    if(props.sel=='simplexe'){
      v=v+simplexe();
      v=v+simplexe2();
      v=v+simplexe3();
      v=v+tableauS1();   
      for(let i=0;i<10;i++){
        const tabZn=tabZ.filter((x)=>x<0);
        if(tabZn && tabZn.length) {
          iter();
          v=v+tableauS1();
        }
        else{
          tabZ[0]=tabZ[1]=0;
          var tabVar=[];
          var ind;
          const zindex=indexMax(tabZ);
          const tabSizeL=parseInt(props.cont)+parseInt(props.var)+3;
          const tabSortie=tab.filter((num,j,t)=>(j%tabSizeL)===zindex);
          tabVar=Array(props.var-0+1).fill().map((_,idx)=>'P'+idx);
          for(let k=1;k<props.var;k++){
            ind=tab.indexOf(tabVar[k])/tabSizeL;
            if(ind>=0){
              v=v+'X'+k;
              v=v+'='+tabSortie[ind];
            }
          }
          tabSortie[tabSortie.length]=tabZ[zindex];
          v=v+',Z='+tabZ[zindex];
          break;
        }
      }
      v=v+renderGraph();
    }
    if(props.sel=='graphique'){
      v=v+renderGraph(true);
    }
    return v;
  }
  var affichageGraphique=()=>{
    let v='';
    if(props.sel=='graphique'){
      alert(renderLabel(2),'j');
      v=v+renderGraph(true);
    }
    return v;
  }

  var renderZone=(i)=>{
    const name='X'+{i};
    return <Zone id={i} value={tabX[i]} name={name} onChange={(event)=>setTabX([...tabX,event.target.value])}></Zone>;
  }
  var renderSelect=(i)=>{
    const name="fi"+{i};
    return <SelectEqual id={i} value={fi[i]} name={name} onChange={(event)=>setFi([...fi,event.target.value])}/>
  }
  var renderZoneSimp=(i)=>{
    return <Zone id={i} value={res[i]} onChange={(event)=>setRes([...res,event.target.value])}/>
  }
  var renderMinMax=(i)=>{
    return <But id={i} value={minmax} onChange={(event)=>setMinmax(event.target.value)}></But>
  }
  var renderFonction=(i)=>{
    const name='X'+{i};
    return <Zone id={i} value={foncP[i]} onChange={(event)=>setFoncP([...foncP,event.target.value])}></Zone>
  }
  var renderLabel=(i, pl)=>{
    return <label >X{i}{pl} </label>
  }
  var renderLineRet=(i)=>{
    return <br></br>
  }
  var renderGraph=(t)=>{
    //return (t)?<LineChart yvalue={yvalue} l={foncLabel()} d1={calculDroite(0,0)} d2={calculDroite(2,1)}/>:'';
    return <LineChart yvalue={yvalue} l={foncLabel()} d1={calculDroite(0,0)} d2={calculDroite(2,1)} ></LineChart>
    //return Object.keys().map((_,idx)=>{return <LineChart yvalue={yvalue} l={foncLabel()} d1={calculDroite(0,0)} d2={calculDroite(2,1)} ></LineChart>});
  }
  var renderTableau=()=>{
    return <Tableau/>
  }
  var tableauS1=()=>{
    var s='';
    var tabSizeL=parseInt(props.var)+parseInt(props.cont)+3;
    s=s+'<br><center><Table border="1"><tr><td colspan=8>Tableau '+'&'+'</td></tr><tr><td>/</td><td>/</td><td>/</td>';
    s=s+Array(props.var-0).fill().map((_,idx)=>'<td>'+foncP[idx]+'</td>');
    s=s+Array(props.cont-0).fill().map((_,idx)=>'<td>'+0+'</td>');
    s=s+'</tr><tr><td>Base</td><td>Cb</td>';
    s=s+Array((tabSizeL-2)-0).fill().map((_,idx)=>'<td>P'+idx+'</td>');
    for (let j = 0; j < parseInt(tabSizeL)*parseInt(props.cont); j++) {
      if(j%tabSizeL==0) s=s+'</tr><tr>';
      s=s+'<td>'+tab[j]+'</td>';
    }
    s=s+'</tr><tr>';
    s=s+tabZ.map(ez=>('<td>'+ez+'</td>'));
    s=s+'</tr>';
    s=s+'</Table></center>';
    return s;
  }
  var fillZ=()=>{
    tabZ[0]='Z';
    tabZ[1]='/';
    tabZ[2]='0';
    for (let i = 3; i < 3+parseInt(props.var); i++) {
      tabZ[i]=foncP[i-3]*(-1);      
    }
    //tabZ=Array((3+props.var)-3).fill().map((_,idx)=>foncP[idx-3]*(-1));
    for (let i = parseInt(props.var)+3; i < parseInt(props.var)+parseInt(props.cont)+3; i++) {
      tabZ[i]=0;      
    }
  }
  var fillMat=()=>{
    for (let i = 0; i < parseInt(props.cont); i++) {
      for (let j = 0; j < parseInt(props.cont); j++) {
        tabm[(parseInt(props.cont)*i)+j]=((i==j)?1:0);        
      }      
    }
  }
  var fillTabBase=()=>{
    tabBase=Array(props.cont-0).fill().map((_,idx)=>'P'+(idx+parseInt(props.var)+1));
  }
  var fillCoef=()=>{
    coef=Array(props.cont-0).fill().map((_,idx)=>0);
  }
  var findMin=(t,s,iDeb)=>{
    var m=t[iDeb];
    var index=0;
    for (let i = iDeb; i < s; i++) {
      if(t[i]<m){
        m=t[i];
        index=i;
      }
    }
    return index;
  }
  var iter=()=>{
    var itab=0;
    var tabSizeL=parseInt(props.cont)+parseInt(props.var)+3;
    indPivotColonne=findMin(tabZ,tabSizeL,2);
    if(props.cont==1) return false;
    for (let i = 0; i < props.cont; i++) {
      tabCp[i]=tabX[(i*props.var)+indPivotColonne];      
    }
    //tabCp=tabX.filter((x,index)=>(index*props.var)+indPivotColonne).map((tabX)=>{parseInt(tabX)});
    indPivotLigne=findLp();
    //coef[indPivotLigne]=tabX[(indPivotLigne*props.var)+indPivotColonne];
    coef[indPivotLigne]=tabZ[parseInt(indPivotColonne)]*(-1);
    tab[(indPivotLigne*tabSizeL)+1]=coef[indPivotLigne];
    if(coef[indPivotLigne]==0 || tabCp[indPivotLigne]==0) return false;
    indPivotColonne=indPivotColonne-2;
    tab[indPivotLigne*tabSizeL]='P'+indPivotColonne;
    indPivotColonne=indPivotColonne+2;
    let ep=tab[parseInt(indPivotLigne*tabSizeL)+parseInt(indPivotColonne)];
    for(let i=parseInt(tabSizeL*indPivotLigne+2);i<(tabSizeL);i++){
      if(ep!=0) tab[i]=tab[i]/ep;
    }
    for(let i=2, j=2;i<tabSizeL*parseInt(props.cont);i++,j++){
      if((i%tabSizeL)==0) {
        j=2;
        i=i+2;
        if(i>=tabSizeL*parseInt(props.cont)) break;
      }
      if((parseInt(i/tabSizeL))!=indPivotLigne) {
        //alert(tab[i]+'-('+coef[indPivotLigne]+'*'+tab[(indPivotLigne*tabSizeL)+j]+').');
        tab[i]=parseFloat(tab[i]-parseFloat((coef[indPivotLigne]*tab[(indPivotLigne*tabSizeL)+j])));
        //alert(tab[i]);
      }
    }
    for(let i=2,j=2;i<tabSizeL;i++,j++){
      tabZ[i]=parseFloat(tabZ[i]-((-1)*coef[indPivotLigne]*tab[(indPivotLigne*tabSizeL)+j]));
    }
    itab=0;
    for (let i = 0; i < parseInt(props.cont); i++) {
      for(let j=2;j<parseInt(props.var)+parseInt(2);j++){
        tabX[itab++]=tab[(i*props.var)+j];
      }
    }
    
  }
  var copieTable=()=>{
    var itab=0;
    var tai=parseInt(props.cont)+parseInt(props.var)+3;
    for (let i = 0; i < tai; i++) {
      tab[itab++]=tabBase[i];
      tab[itab++]=coef[i];
      tab[itab++]=res[i];
      for (let j = 0; j < props.var; j++) {
        tab[itab++]=tabX[(i*props.var)+j];       
      }    
      for(let k=0;k<props.cont;k++){
        tab[itab++]=tabm[(i*props.cont)+k];
      }
      matrice[i]=tab.slice(parseInt(i*tai),parseInt(tai*i)+parseInt(tai));
    }
   
  }

  var copieMatrice=()=>{
    var tai=parseInt(props.cont)+parseInt(props.var)+3;
    for (let i = 0; i < tai; i++) {
      matrice[i]=tab.slice(parseInt(i*tai),parseInt(tai*i)+parseInt(tai));
    }
  }

  var calculDroite=(i,lm)=>{
    var matD=([[]]);
    if(matrice[lm][3]!=0){
      xvalue[i]=(matrice[lm][2]/matrice[lm][3]).toFixed(1);
      yvalue[i]=(0).toFixed(1);
    }
    else{
      xvalue[i]=(0).toFixed(1);
      yvalue[i]=(0).toFixed(1);
    }
    i++;
    if(matrice[lm][4]!=0){
      yvalue[i]=(matrice[lm][2]/matrice[lm][4]).toFixed(1);
      xvalue[i]=(0).toFixed(1);
    }
    else{
      yvalue[i]=(0).toFixed(1);
      xvalue[i]=(0).toFixed(1);
    }
    matD[0]=[xvalue[i-1],yvalue[i-1]];
    matD[1]=[xvalue[i],yvalue[i]];
    return matD;
  }

  var foncLabel=()=>{
    const max=Math.max(...tabX);
    var t=Array(10*max-0+10).fill().map((_,idx)=>((idx/10)).toFixed(1));
    return t;
  }

  var l3=(t, i)=> {
    const t0 = Object.values(t.filter ((num,ind, t) => parseInt(ind)==i)[0]);
    return t0.map((e)=><td key={e.toString()}>{e}</td>);
  }
  var loop=()=> {
    var s=[];
    for (var i=0; i<props.cont; i++) {
      s[i]=<tr key={i.toString()}>{l3(matrice,i)}</tr>
    }
   
    return s;
  }
  var findLp=()=>{
    for (let i = 0; i < props.cont; i++) {
      if(tabCp[i]!=0) res[i]=res[i]/tabCp[i]; 
      else res[i]=0;
    }
    return findMin(res,props.cont,0);
  }
  var indexMax=(t)=>{
    return t.indexOf(Math.max(...t));
  }
  var h=()=>{
    let l=0,m=0;
    var pl='+';
    //if(props.sel=='graphique') return;
    for (let k=0,j = 0,c=0; c < props.var*props.cont;) {
      pl=((c+1)%props.var==0)?'':'+';
      v[j++]=renderZone(k++); 
      v[j++]=renderLabel(l++,pl);
      c++;
      if(c%props.var==0) {
        cl=l;
        l=0;
        v[j++]=renderSelect(m);
        v[j++]=renderZoneSimp(m);
        v[j++]=renderLineRet(m);
        m++;
      }
    }
    /*for(let i=0,j=0,k=0;i<props.var*props.cont;){
      v[j++]=renderMatrice(k++);
    }*/
    fillMat();
    fillTabBase();
    fillZ();
    fillCoef();
    copieTable();
  }
  var h2=()=>{
    var pl='+';
    for (let i = 0,j=0; i < props.var; i++) {
      pl=((i+1)%props.var==0)?'':'+';
      w[j++]=renderFonction(i);
      w[j++]=renderLabel(i,pl);
    }
  }

  var tabtostr=(t,size,ft)=>{
    var s='';
    var pl='+';
    for (let i = 0; i < size; i++) {
      pl=(i==size)?'':'+';
      s=s+t[i]+'X'+i+pl;
    }
    if(ft==true){
      size=parseInt(props.var)+parseInt(props.cont);
      for (let i = props.var; i < size; i++) {
        pl=((i+1)==size)?'':'+';
        s=s+'0X'+i+pl;    
      }
    }
    return s;
  }

  const rows=[
    copieMatrice(),
    //alert(matrice[0]),
    matrice[0].map(b=><TableCell>{b}</TableCell>),
    matrice[1].map(b=><TableCell>{b}</TableCell>),
  ]
  
  const Tableau=(props)=>{
    const classes=useStyle();
    return(
      <div>
        <center>
        <Table className={classes.root}>
          <TableHead>Tableau</TableHead>  
            <TableRow>
              <TableCell>Base</TableCell> 

            </TableRow>
            <TableBody>
                {rows.map(row=>(<TableRow>{row}</TableRow>))}
            </TableBody>
        </Table>
        </center>
      </div>
    );
  }

 
  return(  
    <div>
      <form onSubmit={handleSubmit}>
        <br></br>
        {renderMinMax()}
        <br></br><a>Fonction:</a>
        {h2()}
        {w.map(inp=>([inp]))}
        <br></br><br></br>
        {h()}
        {v.map(inp=>([inp]))}
        <br></br><br></br>
        <Button 
          type="submit"
          value="envoyer"
          variant={"contained"}
          color={"primary"}>
            Continuer
        </Button>
      </form><br></br><br></br><br></br>
      <div id="div">

      </div>
      <center>
      <div id="div2">
      {/*loop()*/}<br></br>
        {affichageGraphique(true)}
        {<Tableau/>}
        {/*renderGraph(props.sel=='graphique')*/}
        {/*<LineChart yvalue={yvalue} l={foncLabel()} d1={calculDroite(0,0)} d2={calculDroite(2,1)}/>*/}
        <br></br>
      </div>
      </center>
    </div>
  );
}

const LineChart=(props)=>{
  const classes=useStyle();
  return (
    <div className={classes.g}>
      <Line
        var data= {{
         labels:props.l,
          datasets: [{
            label: 'd1',
            data:props.d1,
            borderColor:'hsla(0,100%,50%,0.6)',
            backgroundColor:'hsla(0,100%,50%,0.6)',
            fill:'origin',
          },
          {
            label: 'd2',
            data:props.d2,
            borderColor:'hsla(100,50%,35%,0.6)',
            backgroundColor:'hsla(100,50%,35%,0.6)',
            fill:'origin',
          }],
        }}
        options={{      
          maintainAspectRatio: false,
        }}
      />
    </div>  
  ); 
}



const App=()=>{
  const [variable,setVarible]=useState(0);
  const [contrainte,setContrainte]=useState(0);
  const [sel,setSel]=useState("simplexe");
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