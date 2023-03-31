import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LinearProgress, Typography, Button } from '@mui/material';

import CoinInfo from '../components/CoinInfo';

const container = {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
};
const sidebar = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
};
const imgCoin = {
    height: 200,
    marginBottom: 20,
};
const heading = {
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3f51b5",
};
const description = {
    width: "100%",
    fontFamily: "Roboto",
    textAlign: "justify",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    color: "#212121",
};
const marketData = {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    color: "#212121",
    // Responsive
    // [theme.breakpoints.down("sm")]: {
    //     flexDirection: "column",
    //     alignItems: "center",
    // },
    // [theme.breakpoints.down("md")]: {
    //     display: "flex",
    //     justifyContent: "column",
    //     alignItems: "center",
    // },
    // [theme.breakpoints.down("xs")]: {
    //     alignItems: "start",
    // },
};
const linearProgress = {
    backgroundColor: "#3f51b5",
};
const watchlistAddButton = {
    width: "100%",
    height: 40,
}

const CoinPage = () => {

    const currency = "INR";
    // const { currency, symbol, user, watchlist, setAlert } = useCryptoContext();
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const fetchCoin = async () => {
        console.log(id);

        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            // console.log(data);
            setCoin(data);
        } catch (err) {
            console.log('Oops! Something went wrong!', err);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, []);





    if (!coin) return <LinearProgress style={linearProgress} />

    return (
        <div style={container}>
            <div className="sidebar" style={sidebar} >
                <img src={coin?.image.large} alt={coin?.name} style={imgCoin} />
                <Typography variant="h3" style={heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" style={description}>
                    {(coin?.description.en.split(". ")[0])}.
                </Typography>
                <div style={marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
                            ₹{ }{" "}
                            {(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={heading}>
                            Market Cap: {" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
                            ₹{ }{" "}
                            {(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                            )}
                        </Typography>
                    </span>
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )


}

export default CoinPage;