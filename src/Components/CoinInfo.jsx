import React, { useEffect, useState } from 'react'
import {HistoricalChart} from "../config/api";
import { useGlobalContext } from '../Context';
import axios from 'axios';
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import {Line} from "react-chartjs-2";
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
import Chart from 'chart.js/auto';

const CoinInfo = ({coin}) => {
  // console.log(coin)
  const {currency, symbol} = useGlobalContext()

  const[historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const[flag, setFlag] = useState(false);


  const fetchHistorialData = async() => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    console.log(data);
    setHistoricalData(data.prices)
    setFlag(true)
  }



  useEffect(() => {
    fetchHistorialData();
  },[currency, days])

  const darkTheme = createTheme({
    palette:{
      type: "dark",
      primary:{
        main: "#fff",
      }
    }
  })

  const useStyle = makeStyles((theme) => ({
    container:{
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,

      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0
      }
    }
    
  })) 

  const classes = useStyle();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {/* chart */}

          {
            (!historicalData || flag === false) ? (
              <CircularProgress 
                style={{color : "gold"}}
                size={250}
                thickness={1}
              />
            ):(
              <Line 
                data={{
                  labels: historicalData?.map((obj) => {

                    let date = new Date(obj[0]);

                    let time = date.getHours() > 12 ?
                    `${date.getHours() - 12} : ${date.getMinutes()} PM`:
                    `${date.getHours()} : ${date.getMinutes()} PM`

                    return days === 1 ? time : date.toDateString();
                    
                  }),

                  datasets:[{
                    data:historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  }]
                }}
              />
            )

          }

          {/* buttons */}

          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%"
            }}
          >
            {
              chartDays.map(day => (
                <SelectButton 
                  key={day.value}
                  onClick={() => {
                    setDays(day.value)
                    setFlag(false)
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))
            }
          </div>


        </div>
      </ThemeProvider>
    </>
  )
}

export default CoinInfo