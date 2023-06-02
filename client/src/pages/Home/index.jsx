import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import UserWidget from '../../widgets/UserWidget';

function HomePage() {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const { _id, picturePath } = useSelector( state => state.users.user )

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserWidget />
                </Box>
            </Box>
        </Box>
    )
}


export default HomePage;