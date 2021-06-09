import { Link, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";

import CiudadesContext from "../../context/ciudades";
import Menuc from "../home/components/Menuc";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 140,
  },
}));

export default function CiudadDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const { getCiudadesID, ciudadsDetail } = useContext(CiudadesContext);

  useEffect(() => {
    getCiudadesID(id).catch(null);
  }, []);

  //console.log(ciudadsDetail.news);

  return (
    <div>
      <Menuc />
      <Container fixed>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ marginBottom: "2rem", marginTop: "2rem" }}
          >
            {!ciudadsDetail.news?.length && (
              <p>No existen noticias para la ciudad seleccionada</p>
            )}
            {ciudadsDetail.news &&
              ciudadsDetail.news.map((value, i) => {
                return (
                  <Card
                    className={classes.root}
                    key={i}
                    style={{ marginBottom: "2rem" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={value.urlToImage}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {value.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {value.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Compartir
                      </Button>
                      <a href={value.url}>
                      <Button size="small" color="primary">
                        Leer más
                      </Button></a>
                    </CardActions>
                  </Card>
                );
              })}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "2rem" }}>
            {!ciudadsDetail.current_weather?.length && (
              <p>No existe estado del tiempo para la ciudad seleccionada</p>
            )}
            {ciudadsDetail.current_weather &&
              ciudadsDetail.current_weather.map((value, i) => {
                return (
                  <List className={classes.root} key={i}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Temperatura:"}
                        secondary={value.temperature + "°C"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                      <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Presion: "}
                        secondary={value.pressure}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                      <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Dirección del viento: "}
                        secondary={value.wind_dir}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                      <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Descripciones meteorológicas: "}
                        secondary={value.weather_descriptions[0].description}
                      />
                    </ListItem>
                  </List>
                );
              })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
