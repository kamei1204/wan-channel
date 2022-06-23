import { ComponentStyleConfig } from "@chakra-ui/theme"

const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "60px",
        fontsize: "2px",
        fontWeight: "500",
        _focus: {
            boxShadow: "none"
        },
    },
    sizes: {
        sm: {
            fontsize: "8px"
        },
        md: {
            fontsize: "10px"
            // height: "28px"
        },
    },
    variants: {
        solid: {
            color: "white",
            bg: "orange.400",
            _hover: {
                bg: "orange.300"
            },
        },
        outline: {
            color: "orange.400",
            border: "1px solid",
            borderColor: "orange.400",
        },
        oauth: {
            height: "34px",
            border: "1px solid",
            borderColor: "gray.300",
            _hover: {
                bg: "gray.50"
            },
        },
        submit: {
            height: "34px",
            border: "1px solid",
            borderColor: "gray.300",
            _hover: {
                bg: "gray.50"
            },
        },
    },
};

export default Button