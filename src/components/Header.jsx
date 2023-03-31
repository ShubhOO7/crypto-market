import React, { useState } from 'react'
import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const title = {
    flex: 1,
    color: "#3f51b5",
    fontFamily: "Roboto",
    fontWeight: "bold",
    cursor: "pointer",
}
const selectCurrency = {
    width: 100,
    height: 40,
    marginRight: 15,
}
function Header() {
    const [currency, setCurrency] = useState("INR");
    const navigate = useNavigate();
    return (
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography
                        variant="h6"
                        style={title}
                        onClick={() => navigate("/")}
                    >
                        Crypto Market
                    </Typography>
                    <Select
                        variant="outlined"
                        style={selectCurrency}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value="INR">INR</MenuItem>
                        {/* <MenuItem value="BRL">BRL</MenuItem> */}
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header