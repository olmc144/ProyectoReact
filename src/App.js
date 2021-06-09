//import Search from "./views/Search";
import Routes from "./routes";
import CiudadesProvider from "./context/ciudades/Provider";

const App = () => {
  return (
    <CiudadesProvider>
      <Routes />
    </CiudadesProvider>
  );
}

export default App;