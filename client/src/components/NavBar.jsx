import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    UseTheme,
    UseMediaQuery,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Search,
    LightMode,
    DarkMode,
    Message,
    Help,
    Menu,
    Close
} from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from './FlexBetween';


function NavBar() {
    // STATE THAT REPRESENTS TOGGLED MOBILE MENU
    const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false)

    // REDUX AND ROUTER METHODS
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // USER REDUX STATE
    const user = useSelector( state => state.user )

    // VERIFY MIN SCREEN WIDTH
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    // THEME AND COLORS CONFIGS
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.light

    // GET USER FULL NAME
    //const userFullName = `${user.firstName} ${user.lastName}`

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.75rem)"
                    color="primary"
                    onClick={ () => navigate("/home") }
                    sx={{
                        ":hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        }
                    }}
                >
                    SocialApp
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
        </FlexBetween>
    )
}


export default NavBar;