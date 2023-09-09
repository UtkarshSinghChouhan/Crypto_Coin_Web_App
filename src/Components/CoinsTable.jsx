import React, { useEffect, useState } from 'react'
import {CoinList} from "../config/api";
import { useGlobalContext } from '../Context';
import axios from 'axios';
import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousal';
import {Pagination} from "@material-ui/lab";

const CoinsTable = () => {

    const navigate = useNavigate();

    const {currency, symbol} = useGlobalContext();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const[search, setSearch] = useState("");
    const[page, setPage] = useState(1);


    const fetchCoins = async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setLoading(false);
        setCoins(data)
        // console.log(data);
    }

    // console.log(coins)

    useEffect(() => {
        fetchCoins();
    },[currency])


    const darkTheme = createTheme({
        palette: {
          type: 'dark',
          primary:{
              main: "#fff"
          }
        }
    });

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    console.log(handleSearch())

    const useStyles = makeStyles({
        row:{
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#131111",
            }
        },
        pagination : {
            "& .MuiPaginationItem-root" : {
                color: "gold",
            },
        },


    })

    const classes = useStyles();
      

  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Typography 
                    variant='h4'
                    style={{margin: 18, fontFamily: "Montserrat"}}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField 
                    label="Search For a Crypto Currency..."
                    variant='outlined'
                    style={{marginBottom: 20, width: "100%"}}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />


                <TableContainer component={Paper}>
                    {loading ? 
                       <LinearProgress style={{backgroundColor: "gold"}} /> : 
                        <Table>
                            <TableHead style={{backgroundColor: "#EEBC1D"}}>
                                <TableRow>
                                    {
                                        ["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                                            return(
                                                <TableCell
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat"
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((obj) => {

                                    // console.log(obj)
                                    const profit = obj.price_change_percentage_24h > 0;

                                    return(
                                        <TableRow
                                            key={obj.id}
                                            className={classes.row}
                                            onClick={() => navigate(`/coin/${obj.id}`)}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display:"flex",
                                                    gap:15
                                                }}
                                            >
                                                <img 
                                                    src={obj.image}
                                                    alt={obj.name}
                                                    height="50"
                                                    style={{marginBottom: 10}}
                                                />

                                                <div
                                                    style={{display: "flex", flexDirection: "column"}}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22
                                                        }}
                                                    >
                                                        {obj.symbol}
                                                    </span>
                                                    <span style={{color: "darkgray"}}>{ obj.name }</span>
                                                </div>
                                            </TableCell>

                                            <TableCell
                                                align='right'
                                            >
                                                {symbol}
                                                {numberWithCommas(obj.current_price.toFixed(2))}

                                            </TableCell>

                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: obj.price_change_percentage_24h > 0 ? "rgb(14, 203, 129" : "red",
                                                    fontWeight: 500
                                                }}
                                            >
                                                {profit && "+"}
                                                {obj.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>

                                            <TableCell align='right'>
                                                {symbol}
                                                {numberWithCommas(obj.market_cap.toString().slice(0, -6))}  M

                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    }
                    
                </TableContainer>

                <Pagination
                    style={{
                       display: "flex",
                       justifyContent: "center",
                       padding: 20,
                       width: "100%",
                    }}
                    className={classes.pagination}
                    count={(handleSearch()?.length/10).toFixed(0)}

                    onChange={(_, val) => {
                        setPage(val)
                        window.scroll(0, 450)
                    }}
                />

            </Container>
        </ThemeProvider>
    </>
  )
}

export default CoinsTable