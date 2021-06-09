import CiudadesContext from "./index";
import axios from "axios";

import { useState } from "react";

export default function CiudadesProvider({ children }){
  const [ciudads, setCiudads] = useState([]);
  const [ciudadsDetail, setCiudadsDetail] = useState({});
  const [historials, setHistorials] = useState([]);

  //console.log(searchText);

  const getNombCiudades = async (nombciudad) => {
    try{
      const ciudadsResult = await axios
      .get(`/SearchNombCiudades/${nombciudad}`);      
      setCiudads(ciudadsResult.data);
      //console.log(ciudadsResult.data);
    } catch (error){
      setCiudads([]);
    }
  }

  const getCiudadesID = async (id) => {
    try{
      const ciudadsDetail = await axios
      .get(`/SearchCiudades/${id}`);      
      setCiudadsDetail(ciudadsDetail.data);
      console.log(ciudadsDetail.data);
    } catch (error){
      setCiudadsDetail({});
    }
  }

  const getHistorial = async () => {
    try{
      const historialsl = await axios
      .get(`/Historialspruebas`);      
      setHistorials(historialsl.data);
      //console.log(historials.data);           
    } catch (error){
      setHistorials([]);
    }
  }

  return (
<CiudadesContext.Provider value={{ getNombCiudades, ciudads, getCiudadesID, ciudadsDetail, getHistorial, historials }}>
  {children}
</CiudadesContext.Provider>
  );
}