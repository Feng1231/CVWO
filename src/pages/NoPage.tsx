import Header from '../components/Miscellaneous/Header';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ErrorIcon from '@mui/icons-material/Error';
import { NoPageProps } from '../App.types';
import { FC } from 'react';

const NoPage: FC<NoPageProps> = ({ statusCode }) => {
    const errorMessage = 
        statusCode === 401
            ? "You are unauthorized!"
            : "PAGE NOT FOUND!"

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                
                <Header title={statusCode + 'error'} />
                <ErrorIcon sx={{ fontSize: 80}} color='error'/> 
                <h1>{errorMessage} </h1>
                {statusCode === 404 && <Link href="/" variant="body2">Back to Home</Link>}
                {statusCode === 401 && <Link href="/SignIn" variant="body2">SignIn</Link>}
            </Box>
        </Container>
    );
}

export default NoPage;