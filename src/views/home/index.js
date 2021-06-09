import { Container } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CiudadesContext from "../../context/ciudades";
import SearchBox from "../Search/components/SearchBox";
import CiudadList from "./components/CiudadList";
import Menuc from "./components/Menuc";
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const { getNombCiudades, ciudads } = useContext(CiudadesContext);
  const [ciudData, setCiudData] = useState([]);  


  const handleSearchClick = (searchText) => {
    const busquedaCiudad = getNombCiudades(searchText).catch(null);
    setCiudData(busquedaCiudad);

    if (busquedaCiudad?.length) {
      const filterdData = ciudData.filter((value) => {
        return (
          value.CiudadNombre.includes(searchText) ||
          value.PaisCodigo.includes(searchText)
        );
      });
      //console.log(filterdData);
    }
  };

  useEffect(() => {
    getNombCiudades().catch(null);
  }, []);

  return (
    <div>
      <Menuc /> 
      <Container fixed>
        <SearchBox onSearch={handleSearchClick} ></SearchBox>
        <CiudadList ciudads={ciudads}></CiudadList>
        </Container>     
    </div>
  );
}
