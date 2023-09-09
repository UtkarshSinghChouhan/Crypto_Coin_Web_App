import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { TrendingCoins } from '../../config/api';
import {useGlobalContext} from "../../Context"
import AliceCarousel from "react-alice-carousel"
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    carousal:{
        height: "50%",
        display: "flex",
        alignItems: "center"
    }, 
    carousalItems: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white"
    }
})



function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousal = () => {

    const classes = useStyles();

    const [trending, setTrending] = useState([]);

    const { currency, symbol } = useGlobalContext()

    const fetchTrendingCoins = async() => {
      const {data} = await axios.get(TrendingCoins(currency));
      // console.log(data);
      setTrending(data)
    }

    // console.log(trending)

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency])

    const responsive = {
      0:{
        items : 2
      },
      512: {
        items : 4        
      }
    }

    const items = trending.map((coin) => {

      let profit = coin.price_change_percentage_24h >= 0;

      return (
        <Link
          className={classes.carousalItems}
          to={`/coin/${coin.id}`}
        >
          <img
            src={coin.image}
            alt={coin.name}
            height="80"
            style={{marginBottom: 10}}
          />

          <span>
            {coin.symbol} 
            &nbsp;
            <span
              style={{
                color: (profit >= 0) ? "rgb(14, 203, 129" : "red",
                fontWeight:500
              }}
            >
              {profit >= 0 && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </span>

          <span style={{fontSize: 22, fontWeight: 500}}>
            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
          </span>

        </Link>
      )
    });

  return (
    <div className={classes.carousal}>
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousal
export {numberWithCommas};