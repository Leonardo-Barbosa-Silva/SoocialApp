import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material'
import Form from '../../components/Form'


function AuthPage() {
    const [showSpinner, setShowSpinner] = useState(false)

    const theme = useTheme()

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const { isSuccess, isError, isLoading, message } = useSelector( state => state.users )

    useEffect( () => {
        if (isLoading) {
            setShowSpinner(true);
        } else {
            const timer = setTimeout(() => {
                setShowSpinner(false);
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [isLoading] )

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
                    </Box>
                </>
            )}
        </Box>
    )
}


export default AuthPage;