import { useRouter } from "next/router";
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Author from "../src/components/Author";
import React from "react";
import appConfig from "../config.json";
import ButtonSendSticker from "../src/components/ButtonSendSticker";

import { createClient } from "@supabase/supabase-js";
import Loading from "../src/components/Loading";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function listenRealtimeMessages(addMessage) {
    return supabaseClient
        .from("messages")
        .on("INSERT", (response) => {
            addMessage(response.new);
        })
        .on("DELETE", (response) => {
            console.log(response.old);
        })
        .subscribe();
}

const ChatPage = () => {
    const [message, setMessage] = React.useState("");
    const [messagesList, setMessagesList] = React.useState([]);
    const router = useRouter();
    const user = router.query.username;
    const [openInfo, setOpenInfo] = React.useState(false);

    React.useEffect(() => {
        supabaseClient
            .from("messages")
            .select("*")
            .order("id", { ascending: false })
            .then(({ data }) => {
                setMessagesList(data);
            });

        listenRealtimeMessages((newMessage) => {
            setMessagesList((actualValue) => {
                return [newMessage, ...actualValue];
            });
        });
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            from: user,
            text: newMessage,
        };

        supabaseClient
            .from("messages")
            .insert([message])
            .then(({ data }) => {});

        setMessage("");
    }

    async function deleteMessage(id) {
        const updatedList = messagesList.filter((item) => item.id !== id);

        await supabaseClient.from("messages").delete().eq("id", id);

        listenRealtimeMessages((newMessage) => {
            console.log(newMessage);
        });

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

                {!messagesList.length && <Loading />}

                <Box
                    styleSheet={{
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

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNewMessage(`:sticker: ${sticker} `);
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
                width: "100%",
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
                        position="relative"
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
                                alignItems: "center",
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
                                        marginTop: "5px",
                                        marginRight: "8px",
                                    }}
                                    src={`https://github.com/${message.from}.png`}
                                />

                                <Author>{message.from}</Author>

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

                        {message.text.startsWith(":sticker: ") ? (
                            <Image
                                src={message.text.replace(":sticker: ", "")}
                            />
                        ) : (
                            message.text
                        )}
                    </Text>
                );
            })}
        </Box>
    );
};

export default ChatPage;
