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
import { useEffect, useState } from "react";

interface HeaderProp {
    onSearch: (key: string) => void
}

const HeaderComponent = ({ onSearch }: HeaderProp) => {
    const [searchTerm, setSearchTerm] = useState('');
    const logoSrc = useBreakpointValue({
        base: "/tigerhall.svg",
        sm: "/tigerhall.svg",
        md: "/tigerhall-horizontal-logo.svg",
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Flex
            as="header"
            w="100%"
            h="64px"
            p={4}
            bg="gray.900"
            borderBottomWidth="1px"
            borderBottomColor="gray.500"
        >
            <Flex alignItems="center">
                <Image
                    src={logoSrc}
                    alt="Logo"
                    boxSize="100%"
                    mr={2}
                />
            </Flex>
            <Flex 
                margin="0 auto"
                display="flex"
                justifyContent="center"
                alignItems="center">
                <InputGroup
                    w={{ base: "100%", sm: "auto" }}
                    maxW={{ base: "200px", sm: "300px", md: "400px", lg: "600px" }}
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
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Flex>
        </Flex>
    );
};

export default HeaderComponent