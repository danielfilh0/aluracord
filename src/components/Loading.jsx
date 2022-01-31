import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props) => {
    if (props.type === "circular") {
        return (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="inherit" />
            </Stack>
        );
    }

    return (
        <Stack
            sx={{ width: "100%", color: "primary", display: "block" }}
            spacing={2}
        >
            <LinearProgress color="inherit" />
        </Stack>
    );
};

export default Loading;
