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

export default function CiudadList({ ciudads }) {
  const classes = useStyles();

  return (
    <div>
      {!ciudads?.length && <p></p>}
      {ciudads?.map((value, index) => (
        <List
          component="nav"
          className={classes.root}
          aria-label="contacts"
          key={value.CiudadID}
        >
          <Link to={`/ciudad/${value.CiudadID}`}>
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={value.CiudadNombre} />
            </ListItem>
          </Link>
        </List>
      ))}
    </div>
  );
}
