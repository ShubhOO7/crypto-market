import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Button } from '@mui/material';

import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const selectB = {
    width: "22%",
    border: "2px solid #3f51b5",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 3,
    paddingRight: 10,
    fontFamily: "Roboto",
    fontWeight: 400,
    cursor: "pointer",
    backgroundColor: "#3f51b5",
    color: "white",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "#fff",
        color: "#3f51b5",
        opacity: 1,
    },
};
const chartDays = [
    {
        label: "24 Hours",
        value: 1,
    },
    {
        label: "30 Days",
        value: 30,
    },
    {
        label: "3 Months",
        value: 90,
    },
    {
        label: "1 Year",
        value: 365,
    },
];

const container = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
};
const circularProgress = {
    color: "#3f51b5",
};
const buttonContainer = {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    // marginTop: 20,
};
const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const currency = "INR";

    const fetchHistoricalData = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
            // console.log(data);
            setHistoricData(data.prices);
        } catch (err) {
            console.log('Oops! Something went wrong!', err);
        }
    };

    useEffect(() => {
        fetchHistoricalData();
    }, [currency, days]);

    console.count("Re-render");

    return (
        <div className="contain" style={container}>
            {!historicData ? (
                <CircularProgress
                    style={circularProgress}
                    size={250}
                    thickness={1}
                />
            ) : (
                <Line
                    data={{
                        labels: historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            // console.log(date);
                            let time = date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            // console.log(time);
                            return days === 1 ? time : date.toLocaleDateString()
                        }),
                        datasets: [{
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days) in ${currency}`,
                            fill: true,
                            backgroundColor: "#3f51b563",
                            borderColor: "#3f51b5",
                        }]
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 1,
                            },
                        },
                    }}
                />
            )}
            <Button style={buttonContainer} >
                {chartDays.map(day => (
                    <span
                        key={day.value}
                        onClick={() => setDays(day.value)}
                        selected={day.value === days}
                        style={selectB}
                    >
                        {day.label}
                    </span>
                ))}
            </Button>
        </div>
    )
}

export default CoinInfo;