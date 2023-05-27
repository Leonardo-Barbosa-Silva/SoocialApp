import { Box } from "@mui/material";
import { styled } from "@mui/system";


// REUSABLE COMPONENT WITH INITIAL STYLES
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;