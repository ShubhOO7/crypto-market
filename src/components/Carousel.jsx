import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// import { TrendingCoins } from '../../config/api';
// import { numberWithCommas } from '../../utils/numberWithCommas';

const carousel = {
    display: "flex",
    alignItems: "center",
    height: "50%",
};
const carouselItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#FFF",
};
const carouselImgItem = {
    height: 50,
    marginBottom: 10,
};
const carouselCoinPrice = {
    fontSize: 22,
    fontWeight: 400,
}

const Carousel = () => {
    const currency = "INR";
    const [trending, setTrending] = useState([]);

    const responsiveControlCarousel = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    const fetchTrandingCoins = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
            // console.log(data);
            setTrending(data);
        } catch (err) {
            console.log('Oops! Something went wrong!', err);
        }
    };

    useEffect(() => {
        fetchTrandingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                style={carouselItem}
                to={`/ coins / ${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    style={carouselImgItem}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "#0ecb81" : "red",
                            fontWeight: 700,
                        }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={carouselCoinPrice}>
                    ₹ {(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    return (
        <div style={carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={2000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsiveControlCarousel}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel;