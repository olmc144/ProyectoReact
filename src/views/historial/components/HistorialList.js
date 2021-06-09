import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HistorialList({ historials }){
  const classes = useStyles();
  //console.log(historials);
  return(
    <div>
      <h1>HISTORIAL DE BUSQUEDAS</h1>
      {historials.map((value, index) => {
        return (
          <List
          component="nav"
          className={classes.root}
          aria-label="contacts"
          key={index}
        >
          <Link to={`/ciudad/${value.hstIDciudad}`}>
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={value.info} />
            </ListItem>
          </Link>
        </List>          
        );
        //console.log(value.IDHistorial);
      })} 
    </div>
  );
}