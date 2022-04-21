import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#EAEFFA",
      100: "#C6D3F1",
      200: "#A1B6E8",
      300: "#7C9ADF",
      400: "#577DD6",
      500: "#3261CD",
      600: "#284DA4",
      700: "#1E3A7B",
      800: "#142752",
      900: "#0A1329",
    },
    secondary: {
      50: "#FDEBE7",
      100: "#F9C7BD",
      200: "#F6A393",
      300: "#F27F69",
      400: "#EF5B3E",
      500: "#EB3714",
      600: "#BC2C10",
      700: "#8D210C",
      800: "#5E1608",
      900: "#2F0B04",
    },
    tertiary: {
      50: "#EBFAF6",
      100: "#C6F0E5",
      200: "#A2E7D4",
      300: "#7DDEC3",
      400: "#58D4B2",
      500: "#34CBA1",
      600: "#2AA280",
      700: "#1F7A60",
      800: "#155140",
      900: "#0A2920",
    },
    quaternary: {
      50: "#E7EFFE",
      100: "#BBD3FC",
      200: "#8FB6FA",
      300: "#639AF8",
      400: "#377DF6",
      500: "#0B61F4",
      600: "#094EC3",
      700: "#063A93",
      800: "#042762",
      900: "#021331",
    },
  },
  fonts: {
    body: "Comfortaa, cursive",
    heading: "Nunito, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "0.5rem",
      },
      sizes: {
        // lg: {
        //   paddingY: 3,
        //   fontSize: "md",
        // },
      },
      // variants: {
      //   solid: (props: any) => ({
      //     backgroundColor: `${props.colorScheme}.500`,
      //     color: mode(undefined, "white")(props),
      //     fontWeight: "bold",
      //     _hover: {
      //       backgroundColor: `${props.colorScheme}.600`,
      //     },
      //   }),
      //   outline: (props: any) => ({
      //     borderColor: `${props.colorScheme}.500`,
      //     color: mode(undefined, `${props.colorScheme}.500`)(props),
      //     _hover: {
      //       borderColor: `${props.colorScheme}.600`,
      //     },
      //   }),
      // },
    },

    // Input: {
    //   _focus: { borderColor: "secondary.300" },
    // },
  },
});
