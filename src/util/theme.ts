import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        tigerOrange: {
            50: "#FFF9F6",
            500: '#FF5900',
        },
        grey: {
            700: "#797670",
            800: "#4D4B46",
            900: "#383733"

        }
    },
});

export default theme;
