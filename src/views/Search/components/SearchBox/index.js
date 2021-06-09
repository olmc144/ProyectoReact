import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./style.css";

export default function SearchBox({ onSearch, onClose, isSearching }) {
  const [searchText, setSearchText] = useState("");
  const handelSearchClick = () => {
    setSearchText("");
    onClose();
  };

  return (
    <div className="search-box">              
        <Grid item xs={12}>
          <h1 style={{display: "flex", alignContent: "center"}}>Consulta noticias y estado del tiempo por ciudad</h1>          
            <div>
              <label>
                <TextField
                  id="standard-basic"
                  label="Ingrese la ciudad"
                  value={searchText}
                  style={{ width: "60ch"}}
                  onChange={({ target: { value } }) => setSearchText(value)}
                />
              </label>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onSearch(searchText)}
                disabled={!searchText.length}
              >
                Consultar
              </Button>
            </div>          
        </Grid>        
    </div>
  );
}
