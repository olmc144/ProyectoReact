import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import data from "../../data/ciudades.json";
import axios from "axios";

import "./style.css";
import SearchResults from "./components/SearchResults";

export default function Search() {
  const [isAtTop, setIsAtTop] = useState(false);
  const [ciudData, setciudData] = useState(null);
  const [results, setResults] = useState([]);

  async function getCiudades(searchText) {
    await axios
      .get(`/SearchNombCiudades/` + searchText, {
        headers: {
          "Content-Type": "application/xml;charset=UTF-8",
        },
      })
      .then((response) => {
        // console.log(['Mostrando response de obtener avance del curso'], response.data.data);
        setciudData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const getNombCiudades = async () => {
      try {
        const { ciudData } = await axios.get(
          `/SearchNombCiudades/` + searchText,
          {
            headers: {
              "Content-Type": "application/xml;charset=UTF-8",
            },
          }
        );
        setciudData(ciudData);
      } catch(error) {
        console.log(error);
      }
    };
  });

  const handleCloseSearch = () => {
    setIsAtTop(false);
    setResults([]);
  };

  const handleSearchClick = (searchText) => {
    getCiudades(searchText);
    setIsAtTop(true);
    if (ciudData?.length) {
      const filterciudData = ciudData.filter((value) => {
        return (
          value.CiudadNombre.includes(searchText) ||
          value.PaisCodigo.includes(searchText)
        );
      });
      setResults(filterciudData);
    }
  };
  return (
    <div>
      <SearchBox
        onSearch={handleSearchClick}                
      />      
    </div>
  );
}
