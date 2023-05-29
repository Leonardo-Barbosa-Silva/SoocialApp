import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from '../../components/Form'

function AuthPage() {
    // GET MUI THEME PREVIOUSLY CONFIGURED
    const theme = useTheme()

    // VERIFY MIN SCREENS WIDTH
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    return (
        <Box>
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
        </Box>
    )
}


export default AuthPage;