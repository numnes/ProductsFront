import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    #root{
        width: 100%;
        min-height: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    body{
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;

        --hylight-color: #07A4FB;
        --round-border: 1rem;
        --box-shadow-paper: 0px 2px 8px rgba(0, 0, 0, 0.5);
        --background-color: #f6f6f7;
    }
`;
