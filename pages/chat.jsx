import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import appConfig from "../config.json";

const ChatPage = () => {
    const [message, setMessage] = React.useState("");
    const [messagesList, setMessagesList] = React.useState([]);

    function handleNewMessage(newMessage) {
        const message = {
            id: messagesList.length,
            from: "danielfilh0",
            text: newMessage,
        };
        setMessagesList([message, ...messagesList]);
        setMessage("");
    }

    function deleteMessage(id) {
        const updatedList = messagesList.filter((item) => item.id !== id);
        setMessagesList(updatedList);
    }

    return (
        <Box
            styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                color: appConfig.theme.colors.neutrals["000"],
            }}
        >
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                    borderRadius: "5px",
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: "100%",
                    maxWidth: "95%",
                    maxHeight: "95vh",
                    padding: "32px",
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: "relative",
                        display: "flex",
                        flex: 1,
                        height: "80%",
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: "column",
                        borderRadius: "5px",
                        padding: "16px",
                    }}
                >
                    <MessageList
                        messages={messagesList}
                        deleteMessage={deleteMessage}
                    />

                    <Box
                        as="form"
                        styleSheet={{
                            display: "flex",
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNewMessage(message);
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();

                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: "100%",
                                border: "0",
                                resize: "none",
                                borderRadius: "5px",
                                padding: "6px 8px",
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: "12px",
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            iconName="arrowRight"
                            type="submit"
                            styleSheet={{
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                hover: {
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[700],
                                },
                                focus: {
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[700],
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

const Header = () => {
    return (
        <>
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    );
};

const MessageList = (props) => {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        className="message"
                        styleSheet={{
                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[700],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                            }}
                        >
                            <Box>
                                <Image
                                    styleSheet={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        marginRight: "8px",
                                    }}
                                    src={`https://github.com/${message.from}.png`}
                                />

                                <Text tag="strong">{message.from}</Text>

                                <Text
                                    styleSheet={{
                                        fontSize: "10px",
                                        marginLeft: "8px",
                                        color: appConfig.theme.colors
                                            .neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {new Date().toLocaleDateString()}
                                </Text>
                            </Box>

                            <Box
                                className="delete"
                                onClick={() => {
                                    props.deleteMessage(message.id);
                                }}
                            >
                                <IconButton color="error" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {message.text}
                    </Text>
                );
            })}
        </Box>
    );
};

export default ChatPage;
