import React from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Home = () => {
    const defaultTheme = createTheme();
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <PrimarySearchAppBar />
            <Container maxWidth='xl'>
            <header><Header title='Home'/> General</header>
            
            </Container>
        </ThemeProvider>
    );
}

export default Home;