import {
	Flex,
	Grid,
	GridItem,
	Box,
	Heading,
	useBreakpointValue,
	Spinner,
} from '@chakra-ui/react';
import ContentItemComponent from './ContentItemComponent';
import { Podcast } from '../dataAccess/types';
import { useEffect, useState } from 'react';
import { fetchPodcastData } from '../dataAccess/service';
import client from '../dataAccess/apolloClient';
import { convertImageURI } from '../dataAccess/util';

interface ContentProp {
	searchKey: string
}

const ContentComponent = ({ searchKey }: ContentProp) => {
	const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 5 });
	const [podcastData, setPodcastData] = useState<Podcast[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			setError(false);
			console.log(searchKey)
			try {
				const data = await fetchPodcastData(client, searchKey);
				const processedData: Podcast[] = _processPodcastData(data.contentCards.edges);
				setPodcastData(processedData);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, [searchKey]);

	const _processPodcastData = (data: Podcast[]): Podcast[] => {
		return data.map(podcast => {
			const modifiedImage = {
				...podcast.image,
				uri: convertImageURI(podcast.image.uri, 244, 120),
			};

			return {
				...podcast,
				image: modifiedImage,
			};
		});
	};

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
			<Box pb={30} mb={4} >
				<Heading
					as="h2"
					size="lg"
					color='#F4F3F0;'
					fontSize="24px"
					fontWeight="700"
					textAlign={{ base: 'center', md: 'left' }}>
					Tigerhall Library
				</Heading>
			</Box>

			{loading ?
				(
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						height="64px"
					>
						<Spinner
							size='xl'
							emptyColor='grey.900'
							color='tigerOrange.500'
							speed='0.65s'
						/>
					</Box>
				) : (
					<Grid
						templateColumns={`repeat(${columnCount}, 1fr)`}
						gap="24px"
						overflowY="auto"
						pb="60px"
						width="100%"
					>
						{podcastData.map((item, index) => (
							<GridItem key={index} colSpan={1}>
								<ContentItemComponent podcastItem={item}></ContentItemComponent>
							</GridItem>
						))}
					</Grid>

				)
			}
		</Flex>
	);
};

export default ContentComponent