import React from "react";

const GlobalStyle = () => {
    return (
        <style global jsx>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                }

                body {
                    font-family: "Open Sans", sans-serif;
                }

                a {
                    text-decoration: none;
                    color: unset;
                }

                /* App fit Height */
                html,
                body,
                #__next {
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                }

                #__next {
                    flex: 1;
                }

                #__next > * {
                    flex: 1;
                }
                /* ./App fit Height */

                @keyframes fade {
                    from {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(initial);
                        opacity: 1;
                    }
                }
            `}
        </style>
    );
};

const Message = () => {
    return (
        <style global jsx>
            {`
                .message .delete {
                    opacity: 0;
                    visibility: hidden;
                }

                .message:hover .delete {
                    opacity: 1;
                    visibility: visible;
                }
            `}
        </style>
    );
}

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyle />
            <Message />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
