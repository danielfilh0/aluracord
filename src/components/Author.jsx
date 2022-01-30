import React from "react";
import appConfig from "../../config.json";

const Author = (props) => {
    const [openInfo, setOpenInfo] = React.useState(false);

    return (
        <>
            <strong
                onClick={(event) => {
                    setOpenInfo(!openInfo);
                }}
            >
                {props.children}
            </strong>

            <div
                onClick={(event) => {
                    if (openInfo && (event.currentTarget == event.target)) {
                        setOpenInfo(false);
                    }
                }}
            >
                <ul>
                    <li>Teste</li>
                </ul>
            </div>

            <style jsx>
                {`
                    strong {
                        font-size: 14px !important;
                        display: inline-block;
                        cursor: pointer;
                    }

                    strong + div {
                        display: ${openInfo ? "block" : "none"};
                        width: 20rem;
                        height: 25rem;
                        background-color: ${appConfig.theme.colors.neutrals[
                            "800"
                        ]};
                        position: absolute;
                        z-index: 1;
                        top: 0.5rem;
                        left: 7rem;
                    }
                `}
            </style>
        </>
    );
};

export default Author;
