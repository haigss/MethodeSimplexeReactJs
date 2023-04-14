import clsx from 'clsx';
import React, { Component, Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { AppBar, Card, CardContent,Toolbar, CssBaseline, 
  Container, Switch, Drawer, List, Divider, ListItem, ListItemIcon, 
  ListItemText,   TextField, ThemeProvider, Typography, Paper,
  createMuiTheme,  MenuItem, InputLabel, FormControl, FormControlLabel,
  IconButton, Grid, SvgIcon, Radio, RadioGroup, FormLabel, 
  Avatar, CardMedia, Modal, Backdrop, Fade, CardActionArea} from '@material-ui/core';
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
import GroupIcon from '@material-ui/icons/Group';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
//import Chart from 'chart.js/auto';
//import Chart from './Chart';
import Input from '@material-ui/core/Input';
import Exemple from '../images/exemple1.jpg'
import Imgex1 from './exemple1';
import Imgsimp from './simplexe';
import Imgtab from './tableau';



const Apropos=()=>{
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
          backgroundColor: '#101010',
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
        appBar: {
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#101010',
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
          backgroundColor: '#939290',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerClose: {
          backgroundColor: '#939290',
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
          backgroundColor: '#939290', 
          flexShrink: 0,
          whiteSpace: 'nowrap',
        },
        drawerPaper: {
          width: drawerWidth,
        },
        toolbar: {
          display: 'flex',
          backgroundColor: '#101010',
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
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      
      const classes = useStyles();
      const rootElement = document.getElementById("root");
      const bull = <span className={classes.bullet}>•</span>;
      const [open, setOpen] = React.useState(false);
      const [ouvrir, setOuvrir] = React.useState(false);
    
      const [spacing, setSpacing] = React.useState(2);
    
      const handleChange = (event) => {
        setSpacing(Number(event.target.value));
      };
    
      const handleDrawerOpen = () => {
        setOuvrir(true);
      };
    
      const handleDrawerClose = () => {
        setOuvrir(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return(
        <div style={{textAlign:'center', backgroundImage:'fond.jpg'}}>

        <Router>
         
       <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: ouvrir,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: ouvrir,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Résolution graphique
          </Typography>
          <Switch name= 'Mode nuit' checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
          >
            <GroupIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleOpen}
          >
            <HelpOutlineIcon />
          </IconButton>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Aide</h2>
            <p id="transition-modal-description">Ce site est un outils permettant la résolution graphique à travers la méthode graphique ou celle du simplexe. <br/> Il suffit de remplir les champs pour afficher le graphique.</p>
          </div>
        </Fade>
      </Modal>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: ouvrir,
          [classes.drawerClose]: !ouvrir,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: ouvrir,
            [classes.drawerClose]: !ouvrir,
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
          <Link to="/cours" >
        <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Cours" />
        </ListItem>
        </Link>
        <Link to="/exemples" >
        <ListItem button>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Exemples" />
      </ListItem>
      </Link>
      <Link to="/autres" >
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
        <Link to="/apropos" >
        <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="A propos" />
      </ListItem>
      </Link>
      <Link to="/sources" >
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
      <br></br><br></br>
      <Grid container >
      
      <Grid item xs={12}>
      <Card className={classes.root}>
            <CardActionArea>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            Résoudre un problème tel que :
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Maximiser	Z = f(x,y) = 3x + 2y <br/>
          sous les contraintes:	2x + y ≤ 18<br/>
 	        2x + 3y ≤ 42<br/>
        	3x + y ≤ 24<br/>
 	        x ≥ 0 , y ≥ 0 
          </Typography>
        </CardContent>
            </CardActionArea>

         
      </Card>
      </Grid>

      <Grid item xs={12}>
      <Card className={classes.root}>
            <CardActionArea>
            <Imgex1/>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            Méthode graphique :
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          1. D'abord, on trace le système de coordonnées. On représente la variable "x" en abscisse et "y" en ordonnée, qu'on montre dans cette figure. <br/><br/>
        2. On divise numériquement les axes selon les valeurs que les variables peuvent avoir par rapport aux contraintes du problème. Pour ce faire, dans chaque contrainte <br/>
        il faut faire nuls toutes les variables hormis la correspondante à un axe en particulier, établissant la valeur correcte pour cet axe. <br/>
        On répète ce processus dans chacun des axes. <br/><br/>
        3. Ensuite, on représente les contraintes. On commence par la première, on trace la droite qu'on obtient si on considère la contrainte comme égale. Elle apparaît comme le segment <br/>
        qui met en relation A et B, cette région délimité c'est en couleur JAUNE. 
        On reproduit le processus avec les autres contraintes, donnant pour résultat la région <br/>
        en couleur BLEU et ROUGE pour la deuxième et troisième contrainte respectivement.<br/><br/>
        4. La région réalisable est l'intersection des régions délimitées aussi par l'ensemble des contraintes, que par les conditions de non-négativé des variables, <br/>
        c'est-à-dire, par les deux axes de coordonnés. Cette région est représentée par le polygone O-F-H-G-C, en couleur VIOLET.<br/><br/>
        5. Puisqu'il y a une région réalisable, on détermine les points dans l'extrémité, ou les sommets du polygone qui représente. <br/>
        Ces sommets sont les points candidats à solutions optimales. Dans cet exemple ils sont les points O-F-H-G-C de la figure. <br/><br/>
        6. Finalement, on évalue la fonction objectif (3x + 2y) dans chacun des points (résultat qu'on recueilli dans le tableau suivant).
        Comme le point G fournit la plus grande valeur à la fonction Z <br/>
        et l'objectif c'est de maximiser, ce point représente la solution optimale: Z = 33 avec x = 3 et y = 12.

           </Typography>
        </CardContent>
            </CardActionArea>

         
      </Card>
      </Grid>
      <Grid item xs={12}>
      <Card className={classes.root}>
            <CardActionArea>
            <Imgtab/> <Imgsimp/> 
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            Méthode du simplexe
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            A la 4e itération, on a la valeur maximale de la fonction objectif c'est 33, correspondante aux valeurs x = 3 et y = 12 (coordonnées du sommet G).
          </Typography>
        </CardContent>
            </CardActionArea>

    
      </Card>
      </Grid>
      </Grid>
      </React.Fragment>
      </Paper>
      </ThemeProvider>
        </Router>
        </div>
    )
}

export default Apropos;