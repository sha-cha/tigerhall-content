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
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPodcastData } from '../dataAccess/service';
import client from '../dataAccess/apolloClient';
import { convertImageURI } from '../dataAccess/util';

interface ContentProp {
	searchKey: string;
}

const ContentComponent = ({ searchKey }: ContentProp) => {
	const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 5 });
	const [podcastData, setPodcastData] = useState<Podcast[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [offset, setOffset] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const observer = useRef<IntersectionObserver | null>(null);

	const lastPodcastElementRef = useCallback((node: HTMLDivElement | null) => {
		if (loading || !hasMore || !node) return;

		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setOffset((prevOffset) => prevOffset + 5);
			}
		});

		observer.current.observe(node);
	}, [loading, hasMore]);

	useEffect(() => {
		setOffset(0);
	}, [searchKey]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(false);

			try {
				const limit = 5;
				const data = await fetchPodcastData(client, searchKey, limit, offset);
				const processedData: Podcast[] = _processPodcastData(data.contentCards.edges);

				if (offset === 0) {
					setPodcastData(processedData); 
				} else {
					setPodcastData((prevData) => [...prevData, ...processedData]); 
				}

				setHasMore(processedData.length === limit);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [offset, searchKey]);

	const _processPodcastData = (data: Podcast[]): Podcast[] => {
		return data.map((podcast) => ({
			...podcast,
			image: {
				...podcast.image,
				uri: convertImageURI(podcast.image.uri, 244, 120),
			},
		}));
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
			<Box pb={30} mb={4}>
				<Heading
					as="h2"
					size="lg"
					color="#F4F3F0;"
					fontSize="24px"
					fontWeight="700"
					textAlign={{ base: 'center', md: 'left' }}
				>
					Tigerhall Library
				</Heading>
			</Box>

			{podcastData.length > 0 && (
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
							{index === podcastData.length - 1 && (
								<div ref={lastPodcastElementRef} />
							)}
						</GridItem>
					))}
				</Grid>
			)}

			{loading && (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					height="64px"
				>
					<Spinner
						size="xl"
						emptyColor="grey.900"
						color="tigerOrange.500"
						speed="0.65s"
					/>
				</Box>
			)}

			{error && (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					height="64px"
				>
					<Heading
						as="h2"
						size="lg"
						color="#F4F3F0;"
						fontSize="24px"
						fontWeight="700"
						textAlign={{ base: 'center', md: 'left' }}
					>
						There was an error while loading the content.
					</Heading>
				</Box>
			)}
		</Flex>
	);
};

export default ContentComponent;

