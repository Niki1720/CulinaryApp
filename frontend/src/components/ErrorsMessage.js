import React from "react";
import {Box, Typography} from "@mui/material";

const ErrorsMessage = ({message}) => {
    return (
        <Box
            display="block"
            position="fixed"
            fontSize="20px"
            color="#b01e3a"
            bottom="20px"
            right="50px"
            backgroundColor="#fff"
            padding="10px"
            borderRadius="4px"
            border="1px solid #ccc"
            box-shadow="0 4px 6px rgba(0, 0, 0, 0.3)"
            zIndex="1000"
        >
            <Typography variant="body1">{message}</Typography>
        </Box>
    );
};

export default ErrorsMessage;