import React from 'react';
import { Container, Typography } from '@mui/material';
import Carousel from '../components/Carousel';

const banner = {
    backgroundImage: "url(./banner.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};
const bannerContent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 400,
    paddingTop: 25,
};
const tagline = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "40%",
};
const title = {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 15,
};
const description = {
    fontFamily: "Roboto",
    textTransform: "capitalize",
    color: "#fff",
};
const Banner = () => {
    return (
        <div style={banner}>
            <Container style={bannerContent}>
                <div style={tagline}>
                    <Typography style={title} variant="h2">
                        Crypto Market
                    </Typography>
                    <Typography style={description} variant="subtitle2">
                        All Crypto Currency Market in just one place!
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
};

export default Banner;