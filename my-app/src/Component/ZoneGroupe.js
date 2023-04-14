import Button from "@material-ui/core/Button";
import LineChart from './LineChart';
import React, { useState } from "react";
import Fonction from './Fonction';
import Equation from './Equation';
import TableauGraph from './Tableau/TableauGraph';
import Tableau from './Tableau/Tableau';
import Simplexe from "./Simplexe";
import TableauIter from "./Tableau/TableauIter";
import { Route } from "react-router";

const sfi=['<=','=','>='];

const ZoneGroupe=(props)=>{
    var [tabX,setTabX]=useState([]); //Variable de type tableau qui contiendra toutes les données avant l'inegalité.
    var [fi,setFi]=useState([]);  //Variable de type tableau qui contiendra l'inegalité choisis.
    var [res,setRes]=useState([]); //Variable de type tableau qui contiendra le resultat après l'inegalité.
    var [minmax,setMinmax]=useState(""); //Varaible pour le but de la resolution.
    var [foncP,setFoncP]=useState([]); //Contient la fonction principale.
    var coef=[],tabm=[],tabZ=[],tabBase=[],tab=[];
    var xvalue=[],yvalue=[];
    var indPivotColonne=0;
    var indPivotLigne=0;
    var tabCp=[];
    var tabIt=([[]]);
    var tl=0;
    const c=(arr,val)=>arr.reduce((a,v)=>(v===val?a+1:a),0);
    var tabSizeL=parseInt(props.var)+parseInt(props.cont)+3+c(fi,3);
    var z=0;

    
    const matrice=[[],[]];
    var matD=([[]]);
  
    var handleSubmit=(event)=>{
      event.target.reset();
      //window.location.reload();
      event.preventDefault();
    }
    
    var x=(ft)=>{
      var is=0;
      var s=[];
      s[is++]=<a>X<sub>0</sub></a>;
      if(ft){
        s[is++]=Array((parseInt(props.var)+parseInt(props.cont)+parseInt(c(fi,3)))-1).fill().map((_,idx)=><a>,X{<sub>{parseInt(idx+1)}</sub>}</a>);
      } 
      else s[is++]=Array(props.var-1).fill().map((_,idx)=><a>,X{<sub>{parseInt(idx+1)}</sub>}</a>);
      s[is++]=<a>&ge;0</a>;
      return s;
    }
  
    var fillZ=()=>{ //Creation de la ligne Z du tableau
      tabZ=['Z','/',0];
      for(let i=3;i<3+parseInt(props.var)+parseInt(props.cont)+parseInt(c(fi,3));i++){
        tabZ[i]=0;
      }
      for(let i=0;i<props.var;i++){
        if(fi[i]==3) tabZ[2]=tabZ[2]+(res[i]*(-1));
      }
      for (let i = 3; i < 3+parseInt(props.var); i++) {
        for(let j=(i-3);j<parseInt(props.var)*parseInt(props.cont);j+=parseInt(props.var)){
          if(c(fi,3)>0 && fi[i-3]==3) tabZ[i]=tabZ[i]+(tabX[j]*(-1));
          else tabZ[i]=foncP[i-3]*(-1); 
        }
      }
      for (let i = parseInt(props.var)+3; i < parseInt(props.var)+parseInt(props.cont)+3+c(fi,3); i++) {
        for(let j=(i-3-props.var);j<parseInt(props.var)*(parseInt(props.cont)+c(fi,3));j+=parseInt(props.cont)+c(fi,3)){
          if(c(fi,3)>0){
            if(fi[i-3-parseInt(props.var)]==3) tabZ[i]=0;
            else tabZ[i]=tabZ[i]+(tabm[j]*(-1));
          }
          else tabZ[i]=0;
        }
      }
    }
    var fillMat=()=>{ //Creation matrice identité pour le tableau de resolution en fonction du nombre de variable et de contrainte
      let j=0;
      let colSize=parseInt(props.cont)+c(fi,3);
      for (let i = 0; i < parseInt(props.cont); i++) {
        for (j = 0; j < parseInt(props.cont); j++) {
          tabm[(colSize*i)+j]=((i==j)?1:0);     
        }      
        for (; j < parseInt(props.cont)+c(fi,3); j++) {
          tabm[(colSize*i)+j]=((fi[i]==3 && i==(j-parseInt(props.cont)))?-1:0);        
        }
      }
    }
    var fillTabBase=()=>{ //Creation des noms de chaque colonne de la matrice identité
      tabBase=Array((parseInt(props.cont)+parseInt(c(fi,3)))-0).fill().map((_,idx)=>'P'+(idx+parseInt(props.var)+1));
    }
  
    var fillCoef=()=>{ //Creation du tableau des coefficient pour le calcul du tableau de resolution
      for(let i=0;i<props.cont;i++){
        if(fi[i]==3) coef=Array(props.cont-0).fill().map((_,idx)=>-1);
        else coef=Array(props.cont-0).fill().map((_,idx)=>0);
      }
    }
    var copieTable=()=>{
      var itab=0;
      var tai=parseInt(props.cont)+parseInt(props.var)+3+c(fi,3);
      for (let i = 0; i < parseInt(props.cont); i++) {
        tab[itab++]=tabBase[i];
        tab[itab++]=coef[i];
        tab[itab++]=res[i];
        for (let j = 0; j < parseInt(props.var); j++) {
          tab[itab++]=tabX[(i*parseInt(props.var))+j];       
        }    
        for(let k=0;k<parseInt(props.cont)+parseInt(c(fi,3));k++){
          tab[itab++]=tabm[(i*(parseInt(props.cont)+parseInt(c(fi,3))))+k];
        }
      }
    }

    var findLp=()=>{ //Trouve la ligne pivot du tableau de resolution
      for (let i = 0; i < props.cont; i++) {
        if(tabCp[i]!=0) res[i]=res[i]/tabCp[i]; 
        else res[i]=0;
      }
      return findMin(res,props.cont,0);
    }

    var iter=()=>{ //fonction de calcul sur le tableau de resolution
      var itab=0;
      tabSizeL=parseInt(props.cont)+parseInt(props.var)+3+parseInt(c(fi,3));
      indPivotColonne=findMin(tabZ,tabSizeL,3);
  
      //if(props.cont==1) return Array(tabSizeL-0).fill().map((_,idx)=>0);
      for (let i = 0; i < props.cont; i++) {
        tabCp[i]=tab[parseInt((i*tabSizeL))+indPivotColonne];
      }
      indPivotLigne=findLp();
      coef[indPivotLigne]=foncP[parseInt(indPivotColonne)-3];
      tab[(indPivotLigne*tabSizeL)+1]=coef[indPivotLigne];
      if(coef[indPivotLigne]==0 || tabCp[indPivotLigne]==0) return Array(tabSizeL-0).fill().map((_,idx)=>'');
      indPivotColonne=indPivotColonne-2;
      tab[indPivotLigne*tabSizeL]='P'+indPivotColonne;
      indPivotColonne=indPivotColonne+2;
      let ep=tab[parseInt(indPivotLigne*tabSizeL)+parseInt(indPivotColonne)];
      for(let i=parseInt(tabSizeL*indPivotLigne+2);i<(tabSizeL*(indPivotLigne+1));i++){
        if(ep!=0) tab[i]=tab[i]/ep;
      }
      for(let i=2, j=2;i<tabSizeL*parseInt(props.cont);i++,j++){
        if((i%tabSizeL)==0) {
          j=2;
          i=i+2;
          if(i>=tabSizeL*parseInt(props.cont)) break;
        }
        if((parseInt(i/tabSizeL))!=indPivotLigne) {
          tab[i]=parseFloat(tab[i]-(tabCp[parseInt(i/tabSizeL)]*tab[parseInt(indPivotLigne*tabSizeL)+j]));
        }
      }
      const zid=tabZ[indPivotColonne];
      for(let i=2,j=2;i<tabSizeL;i++,j++){
        tabZ[i]=tabZ[i]-(zid*tab[parseInt(indPivotLigne*tabSizeL)+j]);
      }
      for(let i=0;i<props.cont;i++){
        res[i]=tab[(i*tabSizeL)+2];
      }
      itab=0;
      for (let i = 0; i < parseInt(props.cont); i++) {
        for(let j=2;j<parseInt(props.var)+parseInt(2)+c(fi,3);j++){
          tabX[itab++]=tab[(i*props.var)+j];
        }
      }
      return [...tab.slice(0,tabSizeL*parseInt(props.cont)),...tabZ];
    }
  
    var findMin=(t,s,iDeb)=>{ //fonction pour trouver le minimum dans le tableau de resolution dans la ligne Z
      var m=t[iDeb];
      var index=iDeb;
      for (let i = iDeb; i < s; i++) {
        if(t[i]<m){
          m=t[i];
          index=i;
        }
      }
      return index;
    }

    var resolvTab=()=>{
      tabIt[tl++]=[...tab.slice(0,tabSizeL*parseInt(props.cont)),...tabZ];
      for(let i=0;i<10;i++){
        const tabZn=tabZ.filter((x)=>x<0);
        if(tabZn && tabZn.length) {
          tabIt[tl++]=[...iter()];
        }
        else {
          tabZ[0]=tabZ[1]=0;
          const zindex=indexMax(tabZ);
          z=tabZ[zindex];
          break
        };
      }
    }

    var copieMatrice=()=>{ //Copie de matrice
      var tai=parseInt(props.cont)+parseInt(props.var)+3;
      for (let i = 0; i < tai; i++) {
        matrice[i]=tab.slice(parseInt(i*tai),parseInt(tai*i)+parseInt(tai));
      }
    }
  
    var calculDroite=(i,lm)=>{ //Calcul des droite pour le graphique
      var matDL=([[]]);
      if(matrice[lm][3]!=0){
        xvalue[i]=(matrice[lm][2]/matrice[lm][3]).toFixed(1); //Calcul pour trouver le x des points
        yvalue[i]=(0).toFixed(1);//y egal a 0
      }
      else{
        xvalue[i]=(0).toFixed(1);
        yvalue[i]=(0).toFixed(1);
      }
      i++;
      if(matrice[lm][4]!=0){
        yvalue[i]=(matrice[lm][2]/matrice[lm][4]).toFixed(1); //Calcul pour trouver le y des points
        xvalue[i]=(0).toFixed(1);//x egal a 0
      }
      else{
        yvalue[i]=(0).toFixed(1);
        xvalue[i]=(0).toFixed(1);
      }
      matD[lm]=["D"+parseInt(lm+1),xvalue[i-1],yvalue[i-1],xvalue[i],yvalue[i]];
      matDL[0]=[xvalue[i-1],yvalue[i-1]];
      matDL[1]=[xvalue[i],yvalue[i]];
      return matDL;
    }

    var calculDroiteOptimal=()=>{
      var matDO=([[]]);
      resolvTab();
      matDO[0]=(minmax==='Max')?[(foncP[0]===0)?0:(z/foncP[0]).toFixed(1),(0).toFixed(1)]:[(0).toFixed(1),(0).toFixed(1)];
      matDO[1]=(minmax==='Max')?[(0).toFixed(1),(foncP[1]===0)?0:(z/foncP[1]).toFixed(1)]:[(0).toFixed(1),(0).toFixed(1)];
      matD[2]=(minmax==='Max')?["DO",(foncP[0]===0)?0:(z/foncP[0]).toFixed(1),(0).toFixed(1),(0).toFixed(1),(foncP[1]===0)?0:(z/foncP[1]).toFixed(1)]:
      ["DO",(0).toFixed(1),(0).toFixed(1),(0).toFixed(1),(0).toFixed(1)];
      return matDO;
    }
  
    var foncLabel=()=>{ //Calcul taille absisses du graphique
      if(tabX=='') return '';
      const max=Math.max(...tabX);
      var t=Array(10*max-0+10).fill().map((_,idx)=>((idx/10)).toFixed(1));
      return t;
    }
  
    var indexMax=(t)=>{ //Trouve la valeur max
      return t.indexOf(Math.max(...t));
    }

    var copieTab=()=>{
      for(let j=0;j<props.cont;j++){
        tab=[...tab,...tabBase.slice(j,j),...coef.slice(j,j),...tabX.slice(j*props.var,(j+1)*props.var),...tabm.slice(j*(parseInt(props.cont)+
          parseInt(c(fi,3))),(j+1)*(parseInt(props.cont)+parseInt(c(fi,3))))];
      }
    }
   
    return(  
      <div>
        <Route>
        <form onSubmit={handleSubmit}>
          <br></br>
            <Fonction 
              var={props.var} 
              foncP={foncP}
              setFoncP={setFoncP}
              minmax={minmax}
              setMinmax={setMinmax}
              x={x()}
            />
            <br></br><br></br>
            <Equation 
              var={props.var} 
              cont={props.cont} 
              tabX={tabX} 
              setTabX={setTabX}
              fi={fi}
              setFi={setFi}
              res={res} 
              setRes={setRes}
              foncP={foncP} 
              setFoncP={setFoncP}
              fillMat={fillMat()}
              fillTabBase={fillTabBase()}
              fillZ={fillZ()}
              fillCoef={fillCoef()}
              copieTable={copieTable()}
              x={x()}
              tabm={tabm}
              minmax={minmax}
              setMinmax={setMinmax}
            />
            <br></br><br></br>
            <Button 
              type="submit"
              value="envoyer"
              variant={"contained"}
              color={"primary"}
              >
                Actualiser
            </Button>
            
          </form>
        </Route>
          <br></br><br></br><br></br>
          <div>
          {props.sel==='simplexe' && minmax &&<Simplexe 
            var={props.var}
            cont={props.cont}
            tabX={tabX}
            sfi={sfi}
            fi={fi}
            res={res}
            minmax={minmax}
            foncP={foncP}
            x={x()}
            x2={x(true)}
            />}
          <br></br>
          {props.sel==='graphique' && minmax &&
          <Tableau 
            var={props.var} 
            cont={props.cont} 
            foncP={foncP}
            copieMatrice={copieMatrice()}
            tab={tab}
            tabZ={tabZ}
            matrice={matrice}
            c={c(fi,3)}
          /> }<br></br>
          </div>
          {props.sel==='simplexe' && minmax &&
          <TableauIter
            copieMatrice={copieMatrice()}
            matrice={matrice}
            tabZ={tabZ}
            tab={tab}
            tabX={tabX}
            coef={coef}
            res={res}
            foncP={foncP}
            var={props.var}
            cont={props.cont}
            minmax={minmax}
            c={c(fi,3)}
            tabm={tabm}
            tabBase={tabBase}
            copieTab={copieTab()}

          />}
          <center>
            <div>
            {props.sel==="graphique" && minmax &&
            <LineChart 
              yvalue={yvalue} 
              l={foncLabel()} 
              d1={calculDroite(0,0)} 
              d2={calculDroite(2,1)}
              dO={calculDroiteOptimal()}
            />}<br></br>
            {props.sel==='graphique' && minmax &&
            <TableauGraph
              copieMatrice={copieMatrice()}
              matrice={matD}
            />}
            </div>
          <br></br>
        </center>
      </div>
    );
  }

  export default ZoneGroupe;