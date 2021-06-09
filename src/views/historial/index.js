import { useContext, useEffect } from "react";
import CiudadesContext from "../../context/ciudades";
import Menuc from "../home/components/Menuc";
import HistorialList from "./components/HistorialList";



export default function Historial(){
  const { getHistorial, historials } = useContext(CiudadesContext);  
  

  useEffect(() => {
    getHistorial().catch(null);    
  }, []);

  return (
    <div> 
      <Menuc/>
      <HistorialList historials={historials} />
    </div>
  );
}