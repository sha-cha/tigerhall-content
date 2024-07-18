import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: "'PP Neue Montreal', sans-serif",
        body: "'PP Neue Montreal', sans-serif",
    },
    colors: {
        tigerOrange: {
            50: "#FFF9F6",
            400: "#FFA97A",
            500: '#FF5900',
        },
        grey: {
            700: "#797670",
            800: "#4D4B46",
            900: "#383733"

        }
    },
    styles: {
        global: {
            '@font-face': [
                {
                    fontFamily: 'PP Neue Montreal',
                    src: "url('/fonts/ppneuemontreal-book.woff') format('woff')",
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                },
                {
                    fontFamily: 'PP Neue Montreal',
                    src: "url('/fonts/ppneuemontreal-bold.woff') format('woff')",
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                }
            ]
        }
    }
});

export default theme;
