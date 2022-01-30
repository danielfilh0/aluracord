import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Loading = () => {
    return (
        <Stack sx={{ width: "100%", color: "primary", display: "block" }} spacing={2}>
            <LinearProgress color="inherit" />
        </Stack>
    );
};

export default Loading;
