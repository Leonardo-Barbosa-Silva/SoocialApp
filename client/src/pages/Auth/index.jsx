import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetMessage } from '../../features/users/slice';
import { Box, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import Form from '../../components/Form';


function AuthPage() {
    const [showSpinner, setShowSpinner] = useState(false)

    const theme = useTheme()

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const { isError, isLoading, message } = useSelector( state => state.users )

    const dispatch = useDispatch()

    useEffect( () => {
        let timer1;
        let timer2;

        if (isLoading) {
            setShowSpinner(true)
        } else {    
            timer1 = setTimeout( () => {
                setShowSpinner(false)

                if (isError && message) {
                    timer2 = setTimeout( () => {
                        dispatch(resetMessage())
                    }, 3000)
                }

            }, 3500);
        }

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }

    }, [isLoading, isError, message, dispatch] )

    return (
        <Box>
            {showSpinner ? (
                <Box
                    display="flex"
                    width="100vw"
                    height="100vh"
                    backgroundColor={theme.palette.background.alt}
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box
                        width="100%"
                        backgroundColor={theme.palette.background.alt}
                        p="1rem 6%"
                        textAlign="center"
                    >
                        <Typography
                            fontWeight="bold"
                            fontSize="32px"
                            color="primary"
                        >
                            SoocialApp
                        </Typography>
                    </Box>
                    <Box
                        width={isNonMobileScreen ? "53%" : "93%"}
                        p="2rem"
                        m="2rem auto"
                        borderRadius="1.5rem"
                        backgroundColor={theme.palette.background.alt}
                        textAlign="center"
                    >
                        <Typography
                            fontWeight="500"
                            variant="h5"
                            sx={{
                                mb: "1.5rem"
                            }}
                        >
                            Welcome to SoocialApp, the best app for enhance your networking.
                        </Typography>

                        <Form />

                        <Typography
                            sx={{
                                color: theme.palette.primary.error,
                                fontSize: "0.75rem",
                                mt: "30px"
                            }}
                        >
                            {isError && message && `${message}`}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    )
}


export default AuthPage;