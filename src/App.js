import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import axios from "axios";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function App() {
  const classes = useStyles();

  //Hooks
  const [ciudad, setCiudad] = React.useState("");
  const [ciudades, setCiudades] = React.useState(null);
  const [noticiasCiudad, setNoticiasCiudad] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [historial, setHistorial] = React.useState(null);  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeCiudad = (event) => {
    event.preventDefault();
    setCiudad(event.target.value);
    getNoticiasCiudadPorID(event.target.value);
  };

  async function getCiudades() {
    await axios
      .get(`/Ciudades`, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then((response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setCiudades(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getHistorial() {
    await axios
      .get(`/Historials`, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then((response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setHistorial(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getNoticiasCiudadPorID(ciudadID) {
    console.log("aquii:: " + ciudadID);
    await axios
      .get("/searchciudades/" + ciudadID, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then(async (response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setNoticiasCiudad(response.data);
        console.log(response.data);
        //insertamos la busqueda de la noticia
        await axios
          .post("/historials", {
            hstIDciudad: ciudadID,
            info: "info",
          })
          .then(async (response) => {
            console.log(response);
            getHistorial();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getCiudades();
    getHistorial();
  }, []);

  return (
    <div>
      <header>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <span>Noticias</span>
            </IconButton>
            <Typography variant="h6" color="inherit">
              Estado del tiempo
            </Typography>
          </Toolbar>
        </AppBar>
      </header>

      <Container style={{ marginTop: "1rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ciudad}
                onChange={handleChangeCiudad}
              >
                {ciudades &&
                  ciudades.map((city, i) => {
                    return (
                      <MenuItem key={i} value={city.CiudadID}>
                        {city.CiudadNombre}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {/* <h1>{ciudad}</h1> */}

            {noticiasCiudad &&
              noticiasCiudad.news.map((newsCity, j) => {
                return (
                  // <MenuItem key={i} value={newsCity.CiudadID}>{newsCity.CiudadNombre}</MenuItem>

                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          N
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={newsCity.author}
                      subheader={newsCity.publishedAt}
                    />
                    <CardMedia
                      className={classes.media}
                      image={newsCity.urlToImage}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {newsCity.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Contenido:</Typography>
                        <Typography paragraph>{newsCity.Content}</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </Grid>

          <Grid item xs={6} style={{height:"70vh",overflowY: "scroll"}}>
            <h2>Historial de Busqueda</h2>
            <div style={{height:"80vh !important",}}>
              <List className={classes.root}>          
                {historial &&
                  historial.data.map((itemHistorial) => {
                    return(
                    <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={itemHistorial.CiudadNombre} secondary={itemHistorial.PaisCodigo} />
                </ListItem>);                  
                  })}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
