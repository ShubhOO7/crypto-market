/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    LinearProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import axios from 'axios';


const container = {
    textAlign: "center",
};
const title = {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#3f51b5",
    margin: 18,
};
const searcd = {
    width: "100%",
    marginBottom: 20,
};
const linearProgress = {
    backgroundColor: "#3f51b5",
};
const tableHead = {
    backgroundColor: "#f1f4f7",
};
const tableCell = {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#3f51b5"
};
const tableRowCoin = {
    backgroundColor: "#FFF",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#f1f5fe",
    },
    fontFamily: "Roboto",
};
const tableCellCoin = {
    display: "flex",
    gap: 15,
};
const tableCellCoinImg = {
    height: 50,
    marginBottom: 10,
}
const pagination = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 20,
};
const paginationUl = {
    "& .MuiPaginationItem-root": {
        color: "black",
    },
};

const CoinsTable = () => {
    // const { currency, symbol, coins, loading, fetchCoins } = useCryptoContext();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(1);
    const [coins, setCoins] = useState([]);
    const currency = "INR";

    const fetchCoins = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
            // console.log(data);
            setCoins(data);
        } catch (err) {
            console.log('Oops! Something went wrong!', err);
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    return (
        <Container style={container}>
            <Typography
                variant="h5"
                style={title}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField
                variant="outlined"
                style={searcd}
                label="Search For a Crypto Currency..."
                onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
                {loading ? (
                    <LinearProgress style={linearProgress} />
                ) : (
                    <Table aria-label="simple table">
                        <TableHead style={tableHead}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={tableCell}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow
                                            key={row.name}
                                            style={tableRowCoin}
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                        >
                                            <TableCell component='th' scope='row' style={tableCellCoin}>
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    style={tableCellCoinImg}
                                                />
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "black" }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                ₹{ }{" "}
                                                {(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: profit > 0 ? "#0ecb81" : "red",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {profit && "+"}
                                                {/* formats the result upto 2 decimal places */}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                ₹{ }{" "}
                                                {(row.market_cap.toString().slice(0, -6))}M
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                )
                }
            </TableContainer>
            <Pagination
                style={pagination}
                classes={{ ul: paginationUl }}

                //divides into 10 segment and formats the number as a string with 0 decimal places.
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    )
}

export default CoinsTable;