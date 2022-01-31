import React from "react";
import appConfig from "../../config.json";
import { Box, Text, Image } from "@skynexui/components";
import Loading from "./Loading";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";

const Author = (props) => {
    const [openInfo, setOpenInfo] = React.useState(false);
    const [data, setData] = React.useState(null);

    async function getData() {
        const response = await fetch(
            `https://api.github.com/users/${props.children}`
        );
        const data = await response.json();
        setData(data);
        console.log(data);
    }

    return (
        <>
            <strong
                onMouseEnter={() => {
                    setOpenInfo(true);
                    getData();
                }}
            >
                {props.children}
            </strong>

            {openInfo && (
                <Box
                    onMouseLeave={() => {
                        setOpenInfo(false);
                    }}
                    styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "5px",
                        position: "absolute",
                        zIndex: "2",
                        top: "12%",
                        left: "2rem",
                        height: "80%",
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        width: {
                            xs: "82%",
                            md: "65%",
                            xl: "30%",
                        },
                        padding: "16px",
                        boxShadow:
                            "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
                        animation: "fade .3s ease-in-out",
                    }}
                >
                    {data === null ? (
                        <Box
                            styleSheet={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Loading type="circular" />
                        </Box>
                    ) : (
                        <Box
                            styleSheet={{
                                display: "flex",
                                alignItems: "center",
                                borderBottom: `1px solid ${appConfig.theme.colors.neutrals["600"]}`,
                                paddingBottom: "1rem",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "8rem",
                                    height: "8rem",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginTop: "5px",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/${props.children}.png`}
                            />

                            <Box
                                styleSheet={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: {
                                        xs: "0.2rem",
                                        md: "1rem",
                                    },
                                }}
                            >
                                <Text
                                    styleSheet={{
                                        fontSize: {
                                            xs: "1.2rem",
                                            md: "2rem",
                                        },
                                        color: appConfig.theme.colors.neutrals[
                                            "000"
                                        ],
                                        fontWeight: "bold",
                                        hover: {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    <Link href={data.html_url}>
                                        <a target="_blank">{data.name}</a>
                                    </Link>
                                </Text>

                                <Text
                                    styleSheet={{
                                        fontSize: {
                                            xs: "0.875rem",
                                            md: "1rem",
                                        },
                                        color: appConfig.theme.colors.neutrals[
                                            "000"
                                        ],
                                    }}
                                >
                                    {data.bio}
                                </Text>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            <style jsx>{`
                strong {
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default Author;
