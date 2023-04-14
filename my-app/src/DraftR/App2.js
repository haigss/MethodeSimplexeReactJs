import './App.css';
import React, { Component, Fragment, useState } from "react";
import { 
  BrowserRouter as Router,
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import { TextField, ThemeProvider, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Tableau from '../Tableau';
//import Chart from 'chart.js/auto';
import Chart from '../Chart';
import Input from '@material-ui/core/Input';

/*class Zone extends React.Component {
  render() {
    return (
      <Input
        type="text"
        name={this.props.name}
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}*/

const Zone=(props)=>{
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
const SelectEqual=(props)=>{
  return(
    <select 
      id={props.id} 
      value={props.value} 
      onChange={props.onChange}> 
        <option value='1' label="<="></option>
        <option value='2' label="="></option>
        <option value='3' label=">="></option>
    </select>
  );
}

const But=(props)=>{
  return(
    <div>
      <a>But:</a>
      <select
        id={props.id} 
        value={props.value} 
        onChange={props.onChange}>
          <option value='Min' label='Minimiser'></option>
          <option value='Max' label='Maximiser'></option>
      </select>
    </div>
  );
}


/*class SelectEqual extends React.Component{
  render(){
    return(
      <select 
        id={this.props.id} 
        value={this.props.value} 
        onChange={this.props.onChange}> 
          <option value='1' label="<="></option>
          <option value='2' label="="></option>
          <option value='3' label=">="></option>
      </select>
    );
  }
}*/

/*class But extends React.Component{
  render(){
    return(
      <div>
        <a>But:</a>
        <select
          id={this.props.id} 
          value={this.props.value} 
          onChange={this.props.onChange}>
            <option value='Min' label='Minimiser'></option>
            <option value='Max' label='Maximiser'></option>
        </select>
      </div>
    );
  }
}*/
const sfi=['<=','=','>='];
const mfi=['ecart','exces','artificielle'];

class Next extends React.Component{
  render(){
    return(
      <div>
        <Button
          type="submit"
          value="envoyer"
          variant={"contained"}
          color={"primary"}>
           Next
          </Button>
      </div>
    )
  }
}

class ZoneGroupe extends React.Component{
  constructor(props){
    super(props);
      this.state={
        zoneArr:Array(this.props.value).fill(0),
        fi:Array(this.props.cont).fill(1),
        res:Array(this.props.cont).fill(0),
        minmax:'Min',
        foncP:Array(this.props.var).fill(0),
        v:[],
        w:[],
        val:'',
        cl:0,
        coef:Array(this.props.cont).fill(0),
        tabm:Array(this.props.cont*this.props.cont).fill(0),
        tabZ:Array(this.props.cont+this.props.var).fill(0),
        tabCp:Array(this.props.cont),
        tabLp:Array(this.props.var+2),
        indPivotColonne:0,
        indPivotLigne:0,
        tabBase:[],
       // sLigne:3+parseInt(this.props.var)+parseInt(this.props.cont),
        //tab:Array((this.sLigne*parseInt(this.props.cont))+this.sLigne),
      };
    this.handleChange=this.handleChange.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleChange4=this.handleChange4.bind(this);
    this.handleChange5=this.handleChange5.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ val: event.target.value + " ID = " + event.target.id });
    this.state.zoneArr[event.target.id] = event.target.value;
  };
  handleChange2(event){
    this.setState({ val: event.target.value + " ID = " + event.target.id });
    this.state.fi[event.target.id] = event.target.value;
  }
  handleChange3(event){
    this.setState({ val: event.target.value + " ID = " + event.target.id });
    this.state.res[event.target.id] = event.target.value;
  }
  handleChange4(event){
    this.setState({ val: event.target.value + " ID = " + event.target.id });
    this.state.minmax = event.target.value;
  }
  handleChange5(event){
    this.setState({ val: event.target.value + " ID = " + event.target.id });
    this.state.foncP[event.target.id] = event.target.value;
  }
  simplexe(cl,ft){
    var s=this.state.zoneArr[0]+'X0';
    var pl='+';
    for (let i = 1,m=0,l=1; i < this.props.var*this.props.cont; i++) {
      s=s+pl+this.state.zoneArr[i]+'X'+l++;
      pl='+';
      if((i+1)%this.props.var==0){
        if(ft){
          s=s+pl+'X'+cl++;
        }
        l=0;
        s=s+sfi[this.state.fi[m]-1];
        s=s+this.state.res[m];
        s=s+'<br>';
        pl='';
        m++;
      }
    }
    return s;
  }
  simplexe2(){
    var s='';
    s=s+"<br><p>On transforme le problème canonique en ajoutant des variables d'exces, d'ecart et artificielle</p>";
    for (let i = 0; i < this.props.cont; i++) {
      s=s+"<li>Comme la contraint "+(i+1)+" est de type '"+sfi[this.state.fi[i]-1]+"', il est nécessaire d'ajouter la variable d'"+mfi[this.state.fi[i]-1]+"</li><br>";
    }
    return s;
  }
  simplexe3(){
    var s='';
    const mm = (this.state.minmax=='Min')? 'Minimiser':'Maximiser';
    s=s+"<Strong>"+mm+"</Strong>: "+this.tabtostr(this.state.foncP,this.props.var,false)+"<br><p>sous les constraintes:</p>"+this.simplexe(this.state.cl,false);
    s=s+"<br><=><br><Strong>Maximiser</Strong>: "+this.tabtostr(this.state.foncP,this.props.var,true)+"<br><p>sous les contraintes</p>"+this.simplexe(this.state.cl,true);
    s=s+this.x()+"<br>";
    return s;
  }
  maxim(){
    var s='';
    for (let i = this.props.var; i < this.props.cont+2; i++) {
      s=s+"0X"+i;      
    }
    return s;
  }
  x(){
    var s='X0';
    for (let i = 1; i < this.props.var; i++) {
      s=s+",X"+i;      
    }
    s=s+">=0";
    return s;
  }
  handleSubmit(event){
    var div=document.getElementById("div");
    let v="<But/>"+"<br>";
    v=v+'<Next/>';
    div.innerHTML=v+this.affichageSimplexe();
    this.iter();
    event.preventDefault();
  }
  affichageSimplexe(){
    let v='';
    v="F:"+this.tabtostr(this.state.foncP,this.props.var)+'<br>';
    if(this.props.sel=='simplexe'){
    v=v+this.simplexe();
    v=v+this.simplexe2();
    v=v+this.simplexe3();
    v=v+this.tableauS1();
    
    }else{
      alert("graph");
    }
    return v;
  }
  renderZone(i){
    const name='X'+{i};
    return <Zone id={i} value={this.state.value} name={name} onChange={this.handleChange}></Zone>
  }
  renderSelect(i){
    return <SelectEqual id={i} value={this.state.value} onChange={this.handleChange2}/>
  }
  renderZoneSimp(i){
    return <Zone id={i} value={this.state.value} onChange={this.handleChange3}/>
  }
  renderMinMax(i){
    return <But id={i} value={this.state.value} onChange={this.handleChange4}></But>
  }
  renderFonction(i){
    const name='X'+{i};
    return <Zone id={i} value={this.state.value} name={name} onChange={this.handleChange5}></Zone>
  }
  renderLabel(i, pl){
    return <label >X{i}{pl} </label>
  }
  renderLineRet(i){
    return <br></br>
  }
  tableauS1(){
    var s='';
    var ms=parseInt(this.props.var)+parseInt(this.props.cont);
    s=s+'<br><table border="1"><tr><td colspan=8>Tableau 1</td></tr><tr><td>/</td><td>/</td><td>/</td>';
    for (let i = 0; i < this.props.var; i++) {
      s=s+'<td>'+this.state.foncP[i]+'</td>';      
    }
    for (let i = 0; i < this.props.cont; i++) {
      s=s+'<td>'+0+'</td>';      
    }
    s=s+'</tr><tr><td>Base</td><td>Cb</td>';
    for (let i = 0; i < ms+1; i++) {
      s=s+'<td>P'+i+'</td>';
    }
    for (let j = 0; j < parseInt(this.props.cont); j++) {
      s=s+'<tr><td>P'+(j+parseInt(this.props.var)+1)+'</td>';
      s=s+'<td>'+this.state.coef[j]+'</td><td>'+this.state.res[j]+'</td>';
      for (let k = (parseInt(this.props.var)*j); k < parseInt(this.props.var)*(j+1); k++) {
        s=s+'<td>'+this.state.zoneArr[k]+'</td>';
      }
      for (let k = (parseInt(this.props.cont)*j); k < parseInt(this.props.cont)*(j+1); k++) {
        s=s+'<td>'+this.state.tabm[k]+'</td>';      
      }
    }
    /*for(let i=0;i<this.state.tab;i++){
      s=s+'<td>'+this.state.tab[i]+'</td>';
    }*/
    
    s=s+'</tr><tr><td>Z</td><td>/</td><td>/</td>';
    for (let i = 0; i < ms; i++) {
      s=s+'<td>'+this.state.tabZ[i]+'</td>';      
    }
    s=s+'</tr>';
    s=s+'</Table>';
    return s;
  }
  fillZ(){
    for (let i = 0; i < this.props.var; i++) {
      this.state.tabZ[i]=this.state.foncP[i]*(-1);      
    }
    for (let i = parseInt(this.props.var); i < parseInt(this.props.var)+parseInt(this.props.cont); i++) {
      this.state.tabZ[i]=0;      
    }
  }
  fillMat(){
    for (let i = 0; i < this.props.cont; i++) {
      for (let j = 0; j < this.props.cont; j++) {
        this.state.tabm[(this.props.cont*i)+j]=((i==j)?1:0);        
      }      
    }
  }
  fillTabBase(){
    for(let i=0;i<parseInt(this.props.cont);i++){
      this.state.tabBase[i]='P'+(i+parseInt(this.props.var)+1);
    }
  }
  fillCoef(){
    for(let i=0;i<parseInt(this.props.cont);i++){
      this.state.coef[i]=0;
    }
  }
  findMin(t,s){
    var m=t[0];
    var index=0;
    for (let i = 1; i < s; i++) {
      if(t[i]<m){
        m=t[i];
        index=i;
      }
    }
    return index;
  }
  iter(){
    this.state.indPivotColonne=this.findMin(this.state.tabZ,this.props.var);
    for (let i = 0; i < this.props.cont; i++) {
      this.state.tabCp[i]=this.state.zoneArr[(i*this.props.var)+this.state.indPivotColonne];      
    }
    this.indPivotLigne=this.findMin(this.state.res,this.props.cont);
    this.state.coef[this.state.indPivotLigne]=this.state.zoneArr[(this.state.indPivotLigne*this.props.var)+this.state.indPivotColonne];

  }
  iter(){
    var itab=0;
    var tabSizeL=parseInt(this.props.cont)+parseInt(this.props.var)+3;
    this.state.indPivotColonne=this.findMin(this.state.tabZ,tabSizeL,2);
    if(this.props.cont==1) return false;
    for (let i = 0; i < this.props.cont; i++) {
      this.state.tabCp[i]=this.state.tabX[(i*this.props.var)+this.state.indPivotColonne];      
    }
    //tabCp=tabX.filter((x,index)=>(index*props.var)+indPivotColonne).map((tabX)=>{parseInt(tabX)});
    this.state.indPivotLigne=this.findLp();
    //coef[indPivotLigne]=tabX[(indPivotLigne*props.var)+indPivotColonne];
    this.state.coef[this.state.indPivotLigne]=this.state.tabZ[parseInt(this.state.indPivotColonne)]*(-1);
    this.state.tab[(this.state.indPivotLigne*tabSizeL)+1]=this.state.coef[this.state.indPivotLigne];
    if(this.state.coef[this.state.indPivotLigne]==0 || this.state.tabCp[this.state.indPivotLigne]==0) return false;
    this.state.indPivotColonne=this.state.indPivotColonne-2;
    this.state.tab[this.stateindPivotLigne*tabSizeL]='P'+this.state.indPivotColonne;
    this.state.indPivotColonne=this.state.indPivotColonne+2;
    let ep=this.state.tab[parseInt(this.state.indPivotLigne*tabSizeL)+parseInt(this.state.indPivotColonne)];
    for(let i=parseInt(tabSizeL*this.state.indPivotLigne+2);i<(tabSizeL);i++){
      if(ep!=0) this.state.tab[i]=this.state.tab[i]/ep;
    }
    for(let i=2, j=2;i<tabSizeL*parseInt(this.props.cont);i++,j++){
      if((i%tabSizeL)==0) {
        j=2;
        i=i+2;
        if(i>=tabSizeL*parseInt(this.props.cont)) break;
      }
      if((parseInt(i/tabSizeL))!=this.state.indPivotLigne) {
        //alert(tab[i]+'-('+coef[indPivotLigne]+'*'+tab[(indPivotLigne*tabSizeL)+j]+').');
        this.state.tab[i]=parseFloat(this.state.tab[i]-parseFloat((this.state.coef[this.state.indPivotLigne]*this.state.tab[(this.state.indPivotLigne*tabSizeL)+j])));
        //alert(tab[i]);
      }
    }
    for(let i=2,j=2;i<tabSizeL;i++,j++){
      this.state.tabZ[i]=parseFloat(this.state.tabZ[i]-((-1)*this.state.coef[this.state.indPivotLigne]*this.state.tab[(this.state.indPivotLigne*tabSizeL)+j]));
    }
    itab=0;
    for (let i = 0; i < parseInt(this.props.cont); i++) {
      for(let j=2;j<parseInt(this.props.var)+parseInt(2);j++){
        this.state.tabX[itab++]=this.state.tab[(i*this.props.var)+j];
      }
    }
    
  }
  copieTable(){
    var itab=0;
    for (let i = 0; i < this.props.cont; i++) {
      this.state.tab[itab++]='P'+(i+parseInt(this.props.var)+1);
      this.state.tab[itab++]=this.state.coef[i];
      this.state.tab[itab++]=this.state.res[i];
      for (let j = 0; j < this.props.var; j++) {
        this.state.tab[itab++]=this.state.zoneArr[(i*this.props.var)+j];
        for(let k=0;k<this.props.cont;k++){
          this.state.tab[itab++]=this.state.tabm[(i*this.props.cont)+k];
        }        
      }    
    }
  }
  findLp(){
    for (let i = 0; i < this.props.cont; i++) {
      if(this.state.res[i]>0 && this.state.zoneArr[i+this.state.indPivotColonne]>0) this.state.res[i]=this.state.res[i]/this.state.zoneArr[i+this.state.indPivotColonne];      
    }
    return this.findMin(this.state.res,this.props.cont);
  }
  tabtostr(t,size,ft){
    var s='';
    var pl='+';
    for (let i = 0; i < size; i++) {
      pl=(i==size)?'':'+';
      s=s+t[i]+'X'+i+pl;
    }
    if(ft==true){
      size=parseInt(this.props.var)+parseInt(this.props.cont);
    for (let i = this.props.var; i < size; i++) {
      pl=((i+1)==size)?'':'+';
      s=s+'0X'+i+pl;    
    }
    }
    return s;
  }
  h(){
    let l=0,m=0;
    var pl='+';
    if(this.props.sel=='graphique') this.props.var='2';
    for (let k=0,j = 0,c=0; c < this.props.var*this.props.cont;) {
      pl=((c+1)%this.props.var==0)?'':'+';
      this.state.v[j++]=this.renderZone(k++); 
      this.state.v[j++]=this.renderLabel(l++,pl);
      c++;
      if(c%this.props.var==0) {
        this.state.cl=l;
        l=0;
        this.state.v[j++]=this.renderSelect(m);
        this.state.v[j++]=this.renderZoneSimp(m);
        this.state.v[j++]=this.renderLineRet(m);
        m++;
      }
    }
    this.fillMat();
    this.fillZ();
  }
  h2(){
    var pl='+';
    for (let i = 0,j=0; i < this.props.var; i++) {
      pl=((i+1)%this.props.var==0)?'':'+';
      this.state.w[j++]=this.renderFonction(i);
      this.state.w[j++]=this.renderLabel(i,pl);
    }
  }
  render(){    
    const header = <a>p: {this.state.val}</a>;
    return(  
      <div>
        {header}
        <form onSubmit={this.handleSubmit}>
        <br></br>
        {this.renderMinMax()}
        <br></br><a>Fonction:</a>
        {this.h2()}
        {this.state.w}
        <br></br><br></br>
        {this.h()}
        {this.state.v}
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
        {/*<canvas id="mychart" width="400" height="400"></canvas>*/}
        <Next/>
      </div>
    );
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      variable:'',
      contrainte:'',
      sel:'simplexe',
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({variable: event.target.value});
  }
  handleChange2(event){
    this.setState({contrainte:event.target.value});
  }
  handleChange3(event){
    this.setState({sel:event.target.value});
    if(this.state.sel=='graphique'){
      document.getElementById("decis").innerHTML="<TextField value=2 readonly=''/>";
    }
  }
  handleSubmit(event) { 
    event.preventDefault();
  }
  render(){
    function mode() {
      var elem=document.body;
      elem.classList.toggle("dark-mode");
    }
    return(
      <Router>
      <Button 
        variant={"contained"} 
        color={""} 
        onClick={()=>mode()}>
          Mode
      </Button>
      <div style={{textAlign:'center'}}>
        <header>
        <Typography variant="h4">Résolution graphique</Typography><br></br>
          <p>
            Méthode: 
            <Select 
              style={{width:120}}
              onChange={this.handleChange3}
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
              id="decis"
              //variant={"standard"} 
              value={this.state.variable} 
              onChange={this.handleChange}
              pattern="[0-9]"> 
            </Input>
          </p>
          <p>
            Nombre de contrainte?
            <Input 
              //variant={"standard"} 
              value={this.state.contrainte} 
              onChange={this.handleChange2}>
            </Input>
          </p><br></br>
         {JSON.stringify(this.state)}
      </header><br></br><br></br>
      </div>
      <div style={{textAlign:'center'}}>
        {this.state.variable && this.state.contrainte &&
          <ZoneGroupe value={this.state.variable*this.state.contrainte} var={this.state.variable} cont={this.state.contrainte} sel={this.state.sel}/>}
      </div>
      </Router>
    );
  }
}

export default App;