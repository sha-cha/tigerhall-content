import {
	Flex,
	Grid,
	GridItem,
	Box,
	Heading,
	useBreakpointValue,
} from '@chakra-ui/react';
import ContentItemComponent from './ContentItemComponent';

const ContentComponent = () => {
	const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 5 });
	
	return (
		<Flex
			direction="column"
			maxW="100%"
			h="calc(100vh - 64px)"
			mx="auto"
			pt="64px"
			pl="62px"
			pr="62px"
			bg="gray.900"
		>
			<Box pb={30} mb={4}>
				<Heading
					as="h2"
					size="lg"
					color='#F4F3F0;'
					fontSize="24px"
					fontWeight="700">
					Tigerhall Library
				</Heading>
			</Box>

			<Grid 
				templateColumns={`repeat(${columnCount}, 1fr)`} 
				gap="24px" 
				overflowY="auto"
				pb="60px"
			>
				{[...Array(18)].map((_, index) => (
					<GridItem key={index} colSpan={1}>
						<ContentItemComponent></ContentItemComponent>
					</GridItem>
				))}
			</Grid>
		</Flex>
	);
};

export default ContentComponent