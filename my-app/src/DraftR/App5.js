import './App.css';
import clsx from 'clsx';
import React, { Component, Fragment, useState } from "react";
import { 
  BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from "react-dom";
   import { BrowserRouter, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { AppBar, Card, CardContent,Toolbar, CssBaseline, 
  Container, Switch, Drawer, List, Divider, ListItem, ListItemIcon, 
  ListItemText,   TextField, ThemeProvider, Typography, Paper,
  createMuiTheme,  MenuItem, InputLabel, FormControl, FormControlLabel,
  IconButton, Grid, SvgIcon, Radio, RadioGroup, FormLabel, 
  Avatar, CardMedia, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LinkIcon from '@material-ui/icons/Link';
import SchoolIcon from '@material-ui/icons/School';
import BuildIcon from '@material-ui/icons/Build';
import MailIcon from '@material-ui/icons/Mail';
import Select from '@material-ui/core/Select';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tableau from './Tableau';
//import Chart from 'chart.js/auto';
//import Chart from './Chart';
import Input from '@material-ui/core/Input';

const Zone=(props)=>{
  return (
    <TextField
      type="text"
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      variant="outlined"
      size="small"
    />
  );
}
const SelectEqual=(props)=>{
  return(
    <FormControl size='small'>
    <InputLabel id="demo-simple-select-label"></InputLabel>
    <Select 
      labelId="demo-simple-select-label"
      id={props.id} 
      value={props.value} 
      onChange={props.onChange}> 
        <MenuItem value={1}>{'<='}</MenuItem>
            <MenuItem value={2}>{'='}</MenuItem>
            <MenuItem value={3}>{'>='}</MenuItem>
        </Select>
      </FormControl>
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

const sfi=['<=','=','>='];
const mfi=['ecart','exces','artificielle'];

const Next=(props)=>{
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
  );
}

const ZoneGroupe=(props)=>{
  const [tabX,setTabX]=useState([]);
  const [fi,setFi]=useState([]);
  const [res,setRes]=useState([]);
  const [minmax,setMinmax]=useState("Min");
  const [foncP,setFoncP]=useState([]);
  var v = [],w=[];
  var cl=0;
  var val='';
  const [coef,setCoef]=useState([]);
  const [tabm,setTabm]=useState([]);
  const [tabZ,setTabZ]=useState([]);
  var indPivotColonne=0;
  var indPivotLigne=0;
  var [tabBase,setTabBase]=useState([]);
  var tab=[];
  var tabCp=[];


  var handleSubmit=(event)=>{
    var div=document.getElementById("div");
    let s="<But/>"+"<br>";
    s=s+'<Next/>';
    div.innerHTML=s+affichageSimplexe();
    //this.iter();
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
  var maxim=()=>{
    var s='';
    for (let i = props.var; i < props.cont+2; i++) {
      s=s+"0X"+i;      
    }
    return s;
  }
  var x=()=>{
    var s='X0';
    for (let i = 1; i < props.var; i++) {
      s=s+",X"+i;      
    }
    s=s+">=0";
    return s;
  }
  var affichageSimplexe=()=>{
    let v='';
    v="F:"+tabtostr(foncP,props.var)+'<br>';
    if(props.sel=='simplexe'){
    v=v+simplexe();
    v=v+simplexe2();
    v=v+simplexe3();
    v=v+tableauS1();
    iter();
    v=v+tableauS1();
    }else{
      alert("graph");
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
  var tableauS1=()=>{
    var s='';
    var tabSizeL=parseInt(props.var)+parseInt(props.cont)+3;
    s=s+'<br><center><table border="1"><tr><td colspan=8>Tableau 1</td></tr><tr><td>/</td><td>/</td><td>/</td>';
    for (let i = 0; i < props.var; i++) {
      s=s+'<td>'+foncP[i]+'</td>';      
    }
    for (let i = 0; i < props.cont; i++) {
      s=s+'<td>'+0+'</td>';      
    }
    s=s+'</tr><tr><td>Base</td><td>Cb</td>';
    for (let i = 0; i < tabSizeL-2; i++) {
      s=s+'<td>P'+i+'</td>';
    }
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
    for(let i=0;i<parseInt(props.cont);i++){
      tabBase[i]='P'+(i+parseInt(props.var)+1);
    }
  }
  var fillCoef=()=>{
    for(let i=0;i<parseInt(props.cont);i++){
      coef[i]=0;
    }
  }
  var findMin=(t,s)=>{
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
  var iter=()=>{
    var tabSizeL=parseInt(props.cont)+parseInt(props.var)+3;
    indPivotColonne=findMin(tabZ,tabSizeL);
    if(props.cont==1) return;
    for (let i = 0; i < props.cont; i++) {
      tabCp[i]=tabX[(i*props.var)+indPivotColonne];      
    }
    indPivotLigne=findLp();
    coef[indPivotLigne]=tabX[(indPivotLigne*props.var)+indPivotColonne];
    tab[(indPivotLigne*tabSizeL)+1]=coef[indPivotLigne];
    if(coef[indPivotLigne]==0 || tabCp[indPivotLigne]==0) return;
    indPivotColonne++;
    tab[indPivotLigne*tabSizeL]='P'+indPivotColonne;
    indPivotColonne--;
    for(let i=2;i<tabSizeL*parseInt(props.cont);i++){
      if((i%tabSizeL)==0) i=i+2;
      if((parseInt(i/tabSizeL))!=indPivotLigne) tab[i]=parseFloat(tab[i]-parseFloat((tabCp[parseInt(i/tabSizeL)]/tabCp[indPivotLigne])*coef[indPivotLigne]));
    }
    for(let i=tabSizeL*indPivotLigne+2;i<(tabSizeL*indPivotLigne)+tabSizeL;i++){
      if(i!=indPivotLigne) tab[i]=tab[i]/coef[indPivotLigne];
    }
    for(let i=2;i<tabSizeL;i++){
      tabZ[i]=parseFloat(tabZ[i]-parseFloat((tabCp[parseInt(i/tabSizeL)]/tabCp[indPivotLigne])*coef[indPivotLigne]));
    }
  }
  var copieTable=()=>{
    var itab=0;
    for (let i = 0; i < parseInt(props.cont)+parseInt(props.var)+3; i++) {
      tab[itab++]=tabBase[i];
      tab[itab++]=coef[i];
      tab[itab++]=res[i];
      for (let j = 0; j < props.var; j++) {
        tab[itab++]=tabX[(i*props.var)+j];       
      }    
      for(let k=0;k<props.cont;k++){
        tab[itab++]=tabm[(i*props.cont)+k];
      }
    }
  }
  var findLp=()=>{
    for (let i = 0; i < props.cont; i++) {
      if(res[i]>0 && tabX[i+indPivotColonne]>0) res[i]=res[i]/tabX[i+indPivotColonne];      
    }
    return findMin(res,props.cont);
  }
  var h=()=>{
    let l=0,m=0;
    var pl='+';
    if(props.sel=='graphique') props.var='2';
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
      {/*<canvas id="mychart" width="400" height="400"></canvas>*/}
      <Next/>
    </div>
  );
}

const App=()=>{
  const [variable,setVarible]=useState(0);
  const [contrainte,setContrainte]=useState(0);
  const [sel,setSel]=useState("simplexe");


  const styles = {
    paperContainer: {
        height: 100,
        textAlign:'center',
    }
  };
  const drawerWidth = 240;
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark": "light",
    },
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
    menuButton: {
      backgroundColor: '#EFE8E7',
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#EAAA52',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: '#EFE8E7',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: '#EFE8E7',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    media: {
      height: 140,
    },
    drawer: {
      width: drawerWidth,
      backgroundColor: '#EFE8E7', 
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {
      display: 'flex',
      backgroundColor: '#EAAA52',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  
  const classes = useStyles();
  const rootElement = document.getElementById("root");
  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(
      <div style={{textAlign:'center'}}>
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Résolution graphique
          </Typography>
          <Switch name= 'Mode nuit' checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/cours" >
        <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Cours" />
        </ListItem>
        </Link>
        <Link href="/exemples" >
        <ListItem button>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Exemples" />
      </ListItem>
      </Link>
      <Link href="/autres" >
      <ListItem button>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Autres outils" />
      </ListItem>
      </Link>
        </List>
        <Divider />
        <List>
        <Link href="/apropos" >
        <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="A propos" />
      </ListItem>
      </Link>
      <Link href="/sources" >
      <ListItem button>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="Sources" />
      </ListItem>
      </Link>
        </List>
      </Drawer>

      <br></br><br></br><br></br><br></br><br></br><br></br>
        <ThemeProvider theme={theme}>
        <Paper>
      <React.Fragment style={{height: '200vh'}}>
      <CssBaseline/>
      <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="h6" color="primary" noWrapp>Entrez les variables ci dessous</Typography>
          </Grid>
        </Grid>
      </Paper>

      <header>
        <br></br>
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
              id="decis"
              //variant={"standard"} 
              value={variable} 
              onChange={event=>setVarible(event.target.value)}
              pattern="[0-9]"> 
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
      </Grid>
        </Grid>
      </Paper>


      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
      <div style={{textAlign:'center'}}>
      
        {variable && contrainte &&
          <Card className={classes.root}>
          <CardContent>
          <Paper className={classes.paper}>
        <Grid backgroundColor="#FA6135" container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography variant="h6" color="primary" noWrap>Entrez les contraintes pour obtenir un résultat</Typography>
          </Grid>
        </Grid>
      </Paper>
         <ZoneGroupe value={variable*contrainte} var={variable} cont={contrainte} sel={sel}/>
         </CardContent>
         </Card> }
      </div>
      </Grid>
      </Grid>
      </Paper>

      </React.Fragment>
      </Paper>
      </ThemeProvider>
      </div>
    );

}

export default App;