import React from "react";
import Table from '@material-ui/core/Table';
import { makeStyles, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const useStyle=makeStyles({
  root:{
    width:'20%',
    textAlign:'center',
  },
  color:{
    backgroundColor:'red',
  }
})

const TableauIter=(props)=>{
  const classes=useStyle();
  var tabSizeL=parseInt(props.var)+parseInt(props.cont)+3+parseInt(props.c);
  var indPivotColonne=0;
  var indPivotLigne=0;
  var tabCp=[];
  var tabIt=([[]]);
  var tl=0;
  var z=0;
  var tabHeader=[];


  var findLp=()=>{ //Trouve la ligne pivot du tableau de resolution
    for (let i = 0; i < props.cont; i++) {
      if(tabCp[i]!=0) props.res[i]=parseInt(props.res[i]/tabCp[i]); 
      else props.res[i]=0;
    }
    return findMin(props.res,props.cont,0);
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

  var iter=()=>{ //fonction de calcul sur le tableau de resolution
    var itab=0;
    tabSizeL=parseInt(props.cont)+parseInt(props.var)+3+parseInt(props.c);
    indPivotColonne=findMin(props.tabZ,tabSizeL,3);
    
    //if(props.cont==1) return Array(tabSizeL-0).fill().map((_,idx)=>0);
    for (let i = 0; i < props.cont; i++) {
      tabCp[i]=props.tab[parseInt((i*tabSizeL))+indPivotColonne];
    }
    indPivotLigne=findLp();
    props.coef[indPivotLigne]=props.foncP[parseInt(indPivotColonne)-3];
    props.tab[(indPivotLigne*tabSizeL)+1]=props.coef[indPivotLigne];
    if(props.coef[indPivotLigne]==0 || tabCp[indPivotLigne]==0) return Array(props.cont-0).fill().map((_,idx)=>'');
    indPivotColonne=indPivotColonne-2;
    props.tab[indPivotLigne*tabSizeL]='P'+indPivotColonne;
    indPivotColonne=indPivotColonne+2;
    let ep=props.tab[parseInt(indPivotLigne*tabSizeL)+parseInt(indPivotColonne)];
    for(let i=parseInt(tabSizeL*indPivotLigne+2);i<(tabSizeL*(indPivotLigne+1));i++){
      if(ep!=0) props.tab[i]=props.tab[i]/ep;
      else props.tab[i]=0;
    }
    for(let i=2, j=2;i<tabSizeL*parseInt(props.cont);i++,j++){
      if((i%tabSizeL)==0) {
        j=2;
        i=i+2;
        if(i>=tabSizeL*parseInt(props.cont)) break;
      }
      if((parseInt(i/tabSizeL))!=indPivotLigne) {
        props.tab[i]=parseFloat(props.tab[i]-(tabCp[parseInt(i/tabSizeL)]*props.tab[parseInt(indPivotLigne*tabSizeL)+j]));
      }
    }
    const zid=props.tabZ[indPivotColonne];
    for(let i=2,j=2;i<tabSizeL;i++,j++){
      props.tabZ[i]=props.tabZ[i]-(zid*props.tab[parseInt(indPivotLigne*tabSizeL)+j]);
    }
    for(let i=0;i<props.cont;i++){
      props.res[i]=props.tab[(i*tabSizeL)+2];
    }
    itab=0;
    for (let i = 0; i < parseInt(props.cont); i++) {
      for(let j=2;j<parseInt(props.var)+parseInt(2)+props.c;j++){
        props.tabX[itab++]=props.tab[(i*props.var)+j];
      }
    }
    return [...props.tab.slice(0,tabSizeL*parseInt(props.cont)),...props.tabZ];
  }

  var resolvTab=()=>{
    tabIt[tl++]=[...props.tab.slice(0,tabSizeL*parseInt(props.cont)),...props.tabZ];
    const a=props.copieTab;
    for(let i=0;i<10;i++){
      const tabZn=(props.minmax==='Max')?props.tabZ.filter((x)=>x<0):props.tabZ.filter((x)=>x>0);
      if(tabZn && tabZn.length) {
        tabIt[tl++]=[...iter()];
      }
      else break;
    }
  }

  
  var copieMatrice=(tab,mat)=>{ //Copie de matrice
    var tai=parseInt(props.cont)+parseInt(props.var)+3+props.c;
    for (let i = 0; i <= props.cont; i++) {
      mat[i]=tab.slice(parseInt(i*tai),parseInt(tai*i)+parseInt(tai));
    }
  }

  var affichageMatrices=()=>{
    var t=[];
    var matriceMat=([[]]);
    var j=0
    resolvTab();
    for(let i=0;i<tl;i++){
      copieMatrice(tabIt[i],matriceMat);
      j=genTagMat(t,j,matriceMat);
    }
    props.tabZ[0]=props.tabZ[1]=0;
    const zindex=indexMax(props.tabZ);
    z=props.tabZ[zindex];
    t[j++]=<p>Z={z}</p>;
    const tabSizeL=parseInt(props.cont)+parseInt(props.var)+3+parseInt(props.c);
    const tabSortie=props.tab.filter((num,j,t)=>(j%tabSizeL)===zindex);
    const tabTitre=props.tab.filter((num,j,t)=>(j%tabSizeL)===0);
    for(let k=0;k<props.cont;k++){
      if(tabTitre[k]<('P'+parseInt(props.var))){
        t[j++]=<p>X<sub>{k}</sub>={tabSortie[k]}</p>;
      }else{
        t[j++]=<p>X<sub>{k}</sub>=0</p>;
      }
    }
    tabSortie[tabSortie.length]=z;
    return t;
  }

  var l3=(t, i)=> {
    const t0 = Object.values(t.filter ((num,ind) => parseInt(ind)==i)[0]);
    return t0.map((e)=><TableCell key={e}>{e}</TableCell>);
    //return t0.map((e)=><TableCell key={e.toString()}>{e}</TableCell>);
  }

  var genTagMat=(t,j,matriceMat)=>{
    const l=j+parseInt(props.cont);
    for(let k=0;j<=l;k++,j++){
      t[j]=<TableRow key={j}>{l3(matriceMat,k)}</TableRow>
    }
    t[j++]=<TableRow key={j}><TableCell></TableCell></TableRow>;
    return j;
  }

  var indexMax=(t)=>{ //Trouve la valeur max
    return t.indexOf(Math.max(...t));
  }

  var fillTabHeader=()=>{
    tabHeader=[<TableCell>Base</TableCell>,<TableCell>Cb</TableCell>];
    tabHeader=[...tabHeader,...Array((tabSizeL-2)-0).fill().map((_,idx)=><TableCell>P<sub>{idx}</sub></TableCell>)];
    return tabHeader;
  }

  return(
    <><center>
    <Table className={classes.root}>
        <TableHead>Tableau s</TableHead>
        <TableRow>
          <TableCell>/</TableCell>
          <TableCell>/</TableCell>
          <TableCell>/</TableCell>
          {Array(props.var-0).fill().map((_,idx)=><TableCell>{props.foncP[idx]}</TableCell>)}
          {Array(props.cont-0).fill().map((_,idx)=><TableCell>{0}</TableCell>)}
          {Array(props.c-0).fill().map((_,idx)=><TableCell>{-1}</TableCell>)}
        </TableRow>
        <TableRow>
          {fillTabHeader()}
        </TableRow>
        <TableBody>
          {affichageMatrices()}
          <TableRow>
          </TableRow>
        </TableBody>
      </Table>
    </center></>
  );
}

export default TableauIter;
