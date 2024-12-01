
import { Box } from "@mui/material";

function Footer() {

    return (
        <>
            <Box
                component="footer"
                sx={{
                    width: "100%",
                    height: 'calc(100px + 3vh)',
                    backgroundColor: '#333333',
                    zIndex:'-11'
                }}>
            </Box>
        </>
    );
}

export default Footer;