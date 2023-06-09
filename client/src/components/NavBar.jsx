import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
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
    Close,
    Notifications,
    Logout,
    Person
} from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, logoutUser } from '../features/users/slice'
import FlexBetween from './FlexBetween';


function NavBar() {
    const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector( state => state.users.user)

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const renderIconSearch = useMediaQuery("(min-width: 1090px)")

    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.light

    const userFullName = `${user.firstName} ${user.lastName}`

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt} gap="1rem">
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.75rem)"
                    color="primary"
                    onClick={ () => navigate("/home") }
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        }
                    }}
                >
                    SoocialApp
                </Typography>
                {isNonMobileScreen && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="1rem"
                        padding="0.12rem 1.35rem"
                    >
                        <InputBase
                            placeholder="Search..."
                        />

                        {renderIconSearch && (
                            <IconButton
                            
                            >
                                <Search />
                            </IconButton>
                        )}

                    </FlexBetween>
                )}
            </FlexBetween>

            {isNonMobileScreen ? (
            <FlexBetween gap="2rem" marginRight="0">
                <IconButton onClick={ () => dispatch(setMode()) }>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard">
                    <Select
                        value={userFullName}
                        renderValue={ value => value }
                        sx={{
                            backgroundColor: neutralLight,
                            width: "220px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={userFullName} label={userFullName}>
                            <Typography>
                                {userFullName}
                            </Typography>
                            <Person sx={{
                                marginLeft: "15px"
                            }}/>
                        </MenuItem>
                        <MenuItem onClick={ () => dispatch(logoutUser())}>
                            Log Out
                            <Logout sx={{
                                marginLeft: "15px"
                            }}/>
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
            ) : (
                <>
                    <IconButton onClick={ () => setIsMobileMenuToggled(!isMobileMenuToggled) } >
                        <Menu />
                    </IconButton>

                    {!isNonMobileScreen && isMobileMenuToggled && (
                        <Box
                            position="fixed"
                            right="0"
                            bottom="0"
                            height="100%"
                            zIndex="10"
                            maxWidth="500px"
                            minWidth="150px"
                            backgroundColor={background}
                        >
                            <Box display="flex" justifyContent="flex-end">
                                <IconButton
                                    onClick={ () => setIsMobileMenuToggled(!isMobileMenuToggled) }
                                >
                                    <Close />
                                </IconButton>
                            </Box>

                            <FlexBetween 
                                display="flex" 
                                flexDirection="column"
                                justifyContent="center" 
                                alignItems="center" 
                                gap="3rem"
                            >
                                <IconButton 
                                    onClick={ () => dispatch(setMode()) }
                                    sx={{
                                        fontSize: "25px"
                                    }}
                                >
                                    {theme.palette.mode === "dark" ? (
                                        <DarkMode sx={{ fontSize: "25px" }} />
                                    ) : (
                                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                                    )}
                                </IconButton>
                                <Message sx={{ fontSize: "25px" }} />
                                <Notifications sx={{ fontSize: "25px" }} />
                                <Help sx={{ fontSize: "25px" }} />
                                <IconButton
                                    onClick={ () => dispatch(logoutUser())}
                                    sx={{
                                        fontSize: "25px"
                                    }}
                                >
                                    <Logout sx={{ color: dark, fontSize: "25px" }} />
                                </IconButton>
                            </FlexBetween>
                        </Box>
                    )}
                </>
            )}
        </FlexBetween>
    )
}


export default NavBar;