import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import {useNavigate} from "react-router-dom";
import { useGlobalContext } from '../Context';

const useStyle = makeStyles({
  title:{
    flex: 1,
    color:"gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
    
  }
})


const Header = () => {
  const classes = useStyle();

  const navigate = useNavigate();
  
  // useNavigate() hook returns a function, which accept a path as a string where we want to navigate
  console.log(navigate)

  const darkTheme = createTheme({
    palette:{
      type:"dark",
      primary: {
        main : "#fff"
      }
    }
  })

  const { currency, setCurrency } = useGlobalContext()

  return (

    <ThemeProvider theme={darkTheme}>

     <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.title} onClick={() => navigate("/")} variant='h6'>
            Crypto Hunter
          </Typography>

          <Select variant='outlined' style={{
            width: 100,
            height: 40,
            marginRight: 15
          }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
     </AppBar>
    </ThemeProvider>
  )
}

export default Header