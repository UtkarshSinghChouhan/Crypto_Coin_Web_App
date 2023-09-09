
import './style.css';
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import Header from "./Components/Header";
import {Routes, Route} from "react-router-dom"
import {makeStyles} from "@material-ui/core";

function App() {

  const useStyles = makeStyles({
    App:{
      backgroundColor:'#14161a',
      color:"white",
      minHeight:"100vh"
    }
  })

  const classes = useStyles();

  return (
    <>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={ <Home/> }></Route>
          <Route path="/coin/:value" element={ <Coin/> }></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
