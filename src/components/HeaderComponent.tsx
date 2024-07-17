import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Image,
    Spacer,
    useBreakpointValue
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const HeaderComponent = () => {
    const logoSrc = useBreakpointValue({
        sm: "/tigerhall.svg", 
        md: "/tigerhall-horizontal-logo.svg", 
    });

    return (
        <Flex
            as="header"
            w="100%"
            h="64px"
            p={4}
            alignItems="center"
            justifyContent="space-between"
            bg="gray.900"
            borderBottomWidth="1px"
            borderBottomColor="gray.500"
        >
            <Flex alignItems="center" mr={4}>
                <Image
                    src={logoSrc}
                    alt="Logo"
                    boxSize="100%"
                    mr={2}
                />
            </Flex>
            <Spacer />
            <InputGroup
                w={{ base: "100%", sm: "auto" }}
                maxW={{ base: "100%", sm: "220px", md: "400px", lg: "600px" }}
                mt={{ base: 4, sm: 0 }}
            >
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="white" />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search..."
                    color="white"
                    bg="gray.700"
                    borderColor="gray.500"
                    width="600px"
                />
            </InputGroup>
            <Spacer />
        </Flex>
    );
};

export default HeaderComponent