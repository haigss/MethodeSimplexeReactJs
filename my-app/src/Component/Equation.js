import React from "react";
import Zone from './Object/Zone';
import SelectEqual from './Object/SelectEqual';
import But from './Object/But';

const Equation=(props)=>{
  var v=[];
  var cl=0;

  var renderZone=(i)=>{
    const name='X'+{i};
    const setTabX=(v,i)=>{
      props.tabX[i]=parseInt(v);
    }
    return <Zone 
            id={i} 
            //value={props.tabX[i]} 
            name={name} 
            onChange={(event)=>setTabX(event.target.value,i)}
            />
  }
  var renderSelect=(i)=>{
    const name="fi"+{i};
    const setFi=(v,i)=>{
      props.fi[i]=parseInt(v);
    }
    return <SelectEqual 
            id={i} 
            //value={props.fi[i]} 
            name={name} 
            onChange={(event)=>setFi(event.target.value,i)}
          />
  }
  var renderZoneSimp=(i)=>{
    const setRes=(v,i)=>{
      props.res[i]=parseInt(v);
    }
    return <Zone 
            id={i} 
            //value={props.res[i]} 
            onChange={(event)=>setRes(event.target.value,i)}
          />
  }
  var renderLabel=(i, pl)=>{
    return <label >X<sub>{i}</sub>{pl} </label>
  }
  var renderLineRet=(i)=>{
    return <br></br>
  }

  var renderMinMax=(i)=>{
    return <But 
            id={i} 
            value={props.minmax} 
            onChange={(event)=>props.setMinmax(event.target.value)}
          />
  }

  var h=()=>{
    let l=0,m=0;
    var pl='+';
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
    const a=props.fillMat;
    const b=props.fillTabBase;
    const c=props.fillZ;
    const d=props.fillCoef;
    const e=props.copieTable;
  }

  return(
    <div>
      {h()}
      {v.map(inp=>([inp]))}<br></br>
      {props.x}
      <br></br><br></br><br></br>
      {renderMinMax()}
    </div>
  );
}

export default Equation;