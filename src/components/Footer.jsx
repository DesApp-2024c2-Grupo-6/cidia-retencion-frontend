
import { Box } from "@mui/material";

function Footer() {

    return (
        <>
            <Box
                component="Footer"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: "100%",
                    left: 0,
                    height: '20vh',
                    backgroundColor: '#333333'
                }}>
            </Box>
        </>
    );
}

export default Footer;